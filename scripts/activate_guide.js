// // 'use strict';
// // // const Runner = require("Runner");
// // // import {default as Runner} from 'Runner.js';
// // import Runner from "./Runner.js";

// // let btn = document.querySelector(".Go-to-chosen-option-button");

// // btn.addEventListener("click", async function () {
// //     console.log("sdfsdf");
// //     const myObject = new Runner("John");
// //     myObject.run_guide(); // logs "Hello, my name is John."
// // })

// // import {sayHi, sayBye} from './Runner';

// // sayHi('John'); // Hello, John!
// // sayBye('John');

// let btn = document.querySelector(".Go-to-chosen-option-button");
// btn.addEventListener("click", async function () {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//             console.log(response.farewell);
//         });
//       });
//     // (async () => {
//     //     const src = chrome.runtime.getURL("scripts/Runner.js");
//     //     const contentMain = await import(src);
//     //     const guide = [["blue-item-link","זימון תור חדש",contentMain.Operation.highlight],["submit details","המשך",contentMain.Operation.highlight]];
//     //     // console.log("sdfsdf");
//     //     const runner = new contentMain.Runner();
//     //     runner.run_guide(guide);
//     //   })();

// })


