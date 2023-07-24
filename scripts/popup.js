
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
      const option = document.createElement("option")
      option.value = element.guide_name
      option.text = element.guide_name
      
      dropdown.appendChild(option)
    }
}


async function update_popup_tab_data()
{
      
    const domain_name = await get_current_domain()
    const available_guides = await getGuidesByDomain(domain_name);
    add_guides_to_drop_down(JSON.parse(available_guides));
}

update_popup_tab_data()


let btn = document.querySelector(".Go-to-chosen-option-button");
btn.addEventListener("click", async function () {
  const dropdown = document.getElementById("guide-list");
  let domain = await get_current_domain();
  let guide = await get_guide(domain,dropdown.value)
  guide = JSON.parse(guide)['actions']

  guide.forEach(obj => {
    obj.found = false;
  });
  chrome.storage.local.set({ 'active_guide': guide }, function() {});
})

