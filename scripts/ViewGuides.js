import { getAllDomains } from "./popup.js";
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
  add_domains_to_drop_down(await getAllDomains());

  function add_domains_to_drop_down(domains)
{
    var dropdown = document.getElementById("domain-list")
    
    for(const element of domains)
    {
      const option = document.createElement("option")
      option.value = element
      option.text = element
      
      dropdown.appendChild(option)
    }
}
  function add_guides_to_drop_down(supported_domains) {
    console.log(supported_domains);
    const dropdown = document.getElementById("domain-list");
  
    // Loop through each domain
    for (const domain of supported_domains) {
      // Loop through the guides for this domain and add them as options to the dropdown
      for (const guide of domain.guides) {
        const option = document.createElement("option");
        option.value = guide;
        option.text = guide;
        dropdown.appendChild(option);
      }
    }
  }
  
  // add_guides_to_drop_down(supported_domains);

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

  async function go_to_guide_after_click(){
    console.log("here");
    const dropdown = document.getElementById("guide-list");
    let domain = "www.maccabi4u.co.il";
    let guide = await get_guide(domain,dropdown.value)
    domain = "https://".concat("", domain);
    guide = JSON.parse(guide)['actions']

    const url = domain

    chrome.runtime.sendMessage({ greeting: [true,guide] });
    chrome.tabs.create({ url });
}
