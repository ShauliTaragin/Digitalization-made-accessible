async function getAllDomains() {
    const url = 'https://flask-server-deplohy.herokuapp.com/domains';
    const http = new XMLHttpRequest();
  
    return new Promise((resolve, reject) => {
      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            resolve(JSON.parse(http.responseText));
          } else {
            reject(new Error('Request failed'));
          }
        }
      };
  
      http.open('GET', url);
      http.send();
    });
  }

async function main (){
    const d = new Date();
    let time = d.getTime()/1000;


    domains = await getAllDomains();
    let domain=window.location.hostname;
    last_visit=localStorage.getItem("last_visit")
    chrome.storage.local.get(['notification'], (result) =>
    { 
        const notification = result['notification']
        if((last_visit === null || time-last_visit>8) && notification){
            if(domains.includes(domain)){
                alert("שלום, ישנם מדריכים קיימים לאתר זה בתוסף")
            }
        }
        localStorage.setItem("last_visit",time)
        last_visit=localStorage.getItem("last_visit")
    })

}

main()








