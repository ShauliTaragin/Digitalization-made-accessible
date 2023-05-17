
async function waitForClick(btn) {
  return new Promise((resolve, reject) => {
    btn.addEventListener("click", function() {
      // This code will run when the button is clicked
      resolve();
    });
  });
}

async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      await chrome.tabs.sendMessage(tabs[0].id, { greeting: message }, async function (response) {
        if (response) {
          resolve(response);
        } else {
          reject(chrome.runtime.lastError);
        }
      });
    });
  });
}

chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    const element =request.greeting;
    sendResponse({farewell: "hey"})
    let btn = await highlight_element(element[0],element[1],element[2]);
    await waitForClick(btn);
    chrome.runtime.sendMessage({ greeting: "Hello from the content script!" });
  });

  async function highlight_element(element_class, element_name, operation) {

    return new Promise((resolve) => {
      console.log(element_name);

      const elements=document.getElementsByClassName(element_class);
            // console.log(elements);
      let element;
    // loop through the elements and highlight or perform the specified operation on them
    for (let i = 0; i < elements.length; i++) {
      element = elements[i];
      console.log(element);
      console.log(element.textContent);
      console.log(element.textContent.trim() === element_name);


      if(element.textContent.trim() === element_name){
        element.style.backgroundColor = "yellow";
        // switch (operation) {
        //   case Operation.highlight:
        //     console.log(element);
        //     element.style.backgroundColor = "yellow";
        //     break;
        //   default:
        //     console.log('the operation does not exist');
        //     console.log(element);
        //     element.style.backgroundColor = "yellow";
        //     break;
        // }
        
        break;
      }  
    }
    resolve(element);
    });
    
    
  }