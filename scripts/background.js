
let current_tab;
  

  
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

  let guide=[];
  if (message.greeting[0]){
    await sleep(5000);

    guide=message.greeting[1]
  }
  else{
    guide=message.greeting[1]
  }

  current_tab = await getDomainFromActiveTab();

  for (let i = 0; i < guide.length; i++) {
    let element = [guide[i].key,guide[i].value,guide[i].number];
    let a = await sendMessage(element);
    await waitForResponse();
    await sleep(5000);

  }
});
