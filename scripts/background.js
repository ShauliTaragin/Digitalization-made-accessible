
  
let tab;

chrome.tabs.onActivated.addListener(function(activeInfo) {
    // This function will be called when a tab is activated
    tab=activeInfo;
  });
  

  
async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      await chrome.tabs.sendMessage(tab.tabId, { greeting: message }, async function (response) {
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


chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  const guide = [["blue-item-link","זימון תור חדש",1],["submit details","המשך",1]];
  for (let i = 0; i < guide.length; i++) {
    let element = guide[i];
    let a = await sendMessage(element);
    await waitForResponse();
    await sleep(5000);

  }
});
