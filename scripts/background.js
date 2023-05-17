
// server api functions
server_ip = '127.0.0.1'


function get_guide(domain_name, guide_name) {
    const url = `http://${server_ip}:5000/guide/${domain_name}/${guide_name}`;
    const http = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            resolve(http.responseText);
          } else {
            reject(new Error('Request failed'));
          }
        }
      };
    
      http.open('GET', url);
      http.send();
    });
  }
  
  function post_guide(guide)
  {

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `http://${server_ip}:5000/guide`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }};
    


    xhr.send(guide);
  }
  /////////////////////////////////////////////////////////////////////////////////
let current_tab;

// chrome.tabs.onActivated.addListener(function(activeInfo) {
//     // This function will be called when a tab is activated
//     current_tab=activeInfo;
//   });
  

  
async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      await chrome.tabs.sendMessage(current_tab.id, { greeting: message }, async function (response) {
        if (response) {
          resolve(response);
        } else {
          reject(chrome.runtime.lastError);
        }
      });
    }
    );
  });
}


function waitForResponse() {
return new Promise((resolve, reject) => {
  chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
      const element =request.greeting;
      sendResponse({farewell: "hey"})
      resolve();
    });
});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getDomainFromActiveTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          const url = tabs[0].url;
          const domain = (new URL(url)).hostname;
          resolve(tabs[0]);
        } else {
          reject(new Error('No active tab found'));
        }
      });
    });
  }
  

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  current_tab = await getDomainFromActiveTab();
  console.log(current_tab.id);
  console.log(new URL(current_tab.url).hostname);
  let guide=message.greeting


  for (let i = 0; i < guide.length; i++) {
    let element = [guide[i].key,guide[i].value,guide[i].number];
    let a = await sendMessage(element);
    await waitForResponse();
    await sleep(5000);

  }
});
