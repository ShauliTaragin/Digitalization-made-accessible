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