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
    
    for(let i = 0; i <guides.length ; ++i)
    {
        const option = document.createElement("option")
        option.value = guides[i]
        option.text = guides[i]
        
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
    const available_guides = get_domain_guides(domain_name);

    add_guides_to_drop_down(available_guides);
}


update_popup_tab_data()


let btn = document.querySelector(".Go-to-chosen-option-button");
btn.addEventListener("click", async function () {
  chrome.runtime.sendMessage({ greeting: "Hello from the popup script!" });
})


