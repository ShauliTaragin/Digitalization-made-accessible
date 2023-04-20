const d = new Date();
let time = d.getTime()/1000;



domains_demo=["www.maccabi4u.co.il"]
let domain=window.location.hostname;
last_visit=localStorage.getItem("last_visit")
console.log(last_visit)
if(last_visit === null || time-last_visit>8){
    if(domains_demo.includes(domain)){
        alert("שלום, ישנם מדריכים קיימים לאתר זה בתוסף")
    }
}
localStorage.setItem("last_visit",time)
last_visit=localStorage.getItem("last_visit")
console.log(last_visit)







