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
    console.log(dropdown)
}

add_guides_to_drop_down(domains);




