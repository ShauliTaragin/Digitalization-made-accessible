
// const elements = document.getElementsByClassName("blue-item-link");

// // loop through the elements and do something
// for (let i = 0; i < elements.length; i++) {
//   // do something with each element
//   console.log(elements[i]);
//   console.log("dfdfg")
// }

// const element = document.querySelector("body > div.homepage-wrapper > div.topCarousel > div.carousel-bluePart-wrapper > div > div > div:nth-child(1) > div > a")
// const element = document.querySelector('.blue-item-link[name="זימון תור חדש"]');
// const element = document.querySelector('.blue-item-link[textContent ="זימון תור חדש"]');

// const paragraph = document.querySelector("#navbarDropdown4")


// // get all elements with class "blue-item-link"
// const elements = document.getElementsByClassName("blue-item-link");

// // loop through the elements and find the one with the text "זימון תור חדש"
// for (let i = 0; i < elements.length; i++) {
//   const element = elements[i];
//   if (element.textContent === "זימון תור חדש") {
//     console.log(element);
//     element.style.backgroundColor = "yellow";
//     break;
//   }
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "getHtml") {
//     var html = document.documentElement.outerHTML;
//     sendResponse({ html: html });
//   }
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   (async () => {
//         const src = chrome.runtime.getURL("scripts/Runner.js");
//         const contentMain = await import(src);
//         const guide = [["blue-item-link","זימון תור חדש",contentMain.Operation.highlight],["submit details","המשך",contentMain.Operation.highlight]];
//         const runner = new contentMain.Runner();
//         runner.run_guide(guide);
//       })();

//     if (request.greeting == "hello")
//       sendResponse({farewell: "goodbye"});
//   });


// async function sendMessage(){

// }

async function waitForClick(btn) {
  console.log(btn);
  return new Promise(resolve => {
    btn.addEventListener('click', () => {
      resolve();
    });
  });
}


chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    const element =request.greeting;
    sendResponse({farewell: await highlight_element(element[0],element[1],element[2])});
  });

  async function highlight_element(element_class, element_name, operation) {

    return new Promise((resolve) => {
      console.log(element_class);
    console.log(element_name);
    console.log(operation);
  
      const elements=document.getElementsByClassName(element_class);
      let element;
    // loop through the elements and highlight or perform the specified operation on them
    for (let i = 0; i < elements.length; i++) {
      element = elements[i];
      console.log(element);
      console.log(operation);
  
      if(element.textContent == element_name){
        console.log(element);
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
    console.log(element);
    waitForClick(element);
    resolve(element);
    });
    
    
  }