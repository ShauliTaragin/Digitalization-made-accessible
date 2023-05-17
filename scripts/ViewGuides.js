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
  function go_to_guide_after_click(){
    console.log("here");
    
    const dropdown = document.getElementById("guide-list");
    const a = dropdown.value
  //   //get URL from dropdown
  //   const url = getURLFromGuideName(dropdown.value);
    console.log("a is " + a);
    // Navigate to the URL
    const url = "https://www.maccabi4u.co.il";
    chrome.tabs.create({ url });
    sleep(5000); 
    chrome.runtime.sendMessage({ greeting: a });
  // })
}
