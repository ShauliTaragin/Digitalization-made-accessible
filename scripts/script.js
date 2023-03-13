const d = new Date();
let time = d.getTime()/1000;



domains_demo=["www.maccabi4u.co.il"]
let domain=window.location.hostname;
last_visit=localStorage.getItem("last_visit")
console.log(last_visit)
if(last_visit === null || time-last_visit>5){
    if(domains_demo.includes(domain)){
        if(confirm("היי ישנה בקשה פתוחה")){
            // chrome.action.openPopup()
            chrome.runtime.sendMessage({ message: "open_popup" });
            console.log("you are in")
            chrome.browserAction.openPopup();
        }
    }
}
localStorage.setItem("last_visit",time)
last_visit=localStorage.getItem("last_visit")
console.log(last_visit)

// document.getElementById("open-popup-button").addEventListener("click", function() {
//     chrome.runtime.sendMessage({ message: "open_popup" });
//   });
  
