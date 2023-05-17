const supported_domains = {
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
  };

  server_ip = '127.0.0.1'


  async function get_guide(domain_name, guide_name) {
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

  function add_guides_to_drop_down(supported_domains) {
    const dropdown = document.getElementById("guide-list");
  
    // Loop through each domain
    for (const domain of supported_domains.domains) {
      // Loop through the guides for this domain and add them as options to the dropdown
      for (const guide of domain.guides) {
        const option = document.createElement("option");
        option.value = guide;
        option.text = guide;
        dropdown.appendChild(option);
      }
    }
  }
  
  add_guides_to_drop_down(supported_domains);
//Sleeping function
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getURLFromGuideName(guideName) {
    for (const domain of supported_domains.domains) {
      const guideIndex = domain.guides.indexOf(guideName);
      if (guideIndex !== -1) {
        return domain.name;
      }
    }
    return null; // Guide name not found
  }
  const button = document.getElementById("Go-to-chosen-option-button");

  // Add a click event listener to the button
  button.addEventListener("click", go_to_guide_after_click);

  // button.addEventListener("click", async function () {
  async function go_to_guide_after_click(){
    console.log("here");
    const dropdown = document.getElementById("guide-list");
    const domain = "www.maccabi4u.co.il";
    
    let guide = await get_guide(domain,dropdown.value)

    guide = JSON.parse(guide)['actions']
    console.log(guide);
 
  //   //get URL from dropdown
  //   const url = getURLFromGuideName(dropdown.value);
    // Navigate to the URL
    
    // chrome.tabs.create({ url });
    // sleep(5000); 
    chrome.runtime.sendMessage({ greeting: [true,domain,guide] });
  // })
}
