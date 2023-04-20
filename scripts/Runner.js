
// export const Operation = {
//   highlight: 'highlight',
//   GREEN: 'green',
//   BLUE: 'blue'
// };

// function waitForClick(btn) {
//   console.log(btn);
//   return new Promise(resolve => {
//     btn.addEventListener('click', () => {
//       resolve();
//     });
//   });
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function highlight_element(element_class, element_name, operation) {

//   return new Promise((resolve) => {
//     console.log(element_class);
//   console.log(element_name);
//   console.log(operation);

//     const elements=document.getElementsByClassName(element_class);
//     let element;
//   // loop through the elements and highlight or perform the specified operation on them
//   for (let i = 0; i < elements.length; i++) {
//     element = elements[i];
//     console.log(element);
//     console.log(operation);

//     if(element.textContent == element_name){
//       switch (operation) {
//         case Operation.highlight:
//           console.log(element);
//           element.style.backgroundColor = "yellow";
//           break;
//         default:
//           console.log('the operation does not exist');
//           break;
//       }
//       console.log(element);
//       break;
//     }  
//   }
//   resolve(element);
//   });
  
  
// }

// export class Runner {
//   constructor() {
//   }

//   async run_guide(guide) {
//     for (let i = 0; i < guide.length; i++) {
//       let element = guide[i];
//       element = await highlight_element(element[0], element[1], element[2])
//       console.log(element);
//       await waitForClick(element);
//     }
//   }
// }



// // async function get_current_domain()
// // {

// //   return new Promise((resolve) => {
// //     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// //       const elements = tabs[0].document.getElementsByClassName("blue-item-link");
// //       console.log(elements);
// //       const url = tabs[0].url;
// //       const domainName = new URL(url).hostname;

// //       resolve(domainName);
// //     });
// //   });
// // }