// server api functions
server_ip = '127.0.0.1'


async function get_guide(domain_name, guide_name) {
    const url = `http://${server_ip}:5000/guide/${domain_name}/${guide_name}`;
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
  //////////////////////////////////////////////////////


supported_domains = {
    "domains": [
      {
        "name": "www.btl.gov.il",
        "guides": [
          "טופס 3010",
          "קצבת נכות"
        ]
      },
      {
        "name": "www.maccabi4u.co.il",
        "guides": [
          "קביעת תור לרופא",
          "הזמנת רופא לבית"
        ]
      }
    ]
  }

  server_ip = '127.0.0.1'


  function get_guide(domain_name, guide_name) {
      const url = `https://flask-server-deplohy.herokuapp.com/guide/${domain_name}/${guide_name}`;
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

    function getGuidesByDomain(domain) {
      const url = `https://flask-server-deplohy.herokuapp.com/guides/${domain}`;
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


async function get_current_domain()
{

  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

      const url = tabs[0].url;
      const domainName = new URL(url).hostname;

      resolve(domainName);
    });
  });
}

function add_guides_to_drop_down(guides)
{
    var dropdown = document.getElementById("guide-list")
    
    for(const element of guides)
    {
      console.log(element)
      const option = document.createElement("option")
      option.value = element.guide_name
      option.text = element.guide_name
      
      dropdown.appendChild(option)
    }
}

function get_domain_guides(domain_name)
{
    for(let i = 0; i < supported_domains.domains.length; ++i)
    {
        const current_domain = supported_domains.domains[i]
        if(current_domain.name == domain_name)
        {
            return current_domain.guides;
        }
    }

    return []
}


async function update_popup_tab_data()
{
      
    const domain_name = await get_current_domain()
    const available_guides = await getGuidesByDomain(domain_name);
    console.log(available_guides)
    add_guides_to_drop_down(JSON.parse(available_guides));
}


update_popup_tab_data()


let btn = document.querySelector(".Go-to-chosen-option-button");
btn.addEventListener("click", async function () {
  const dropdown = document.getElementById("guide-list");
  let domain = await get_current_domain();
  let guide = await get_guide(domain,dropdown.value)
  console.log(guide)
  guide = JSON.parse(guide)['actions']
  console.log(guide)
  chrome.runtime.sendMessage({ greeting: guide });
})


