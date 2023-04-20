server_ip = '127.0.0.1'


function get_guide(domain_name, guide_name) {
    const url = `http://c/guide/${domain_name}/${guide_name}`;
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