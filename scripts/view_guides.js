async function get_guide(domain_name, guide_name) {
  const url = `https://flask-server-deplohy.herokuapp.com/guide/${domain_name}/${guide_name}`;
  const http = new XMLHttpRequest();
  
  return new Promise((resolve, reject) => {
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          const response = JSON.parse(http.responseText);
          resolve(response);
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
          const response = JSON.parse(http.responseText);
          resolve(response);
        } else {
          reject(new Error('Request failed'));
        }
      }
    };

    http.open('GET', url);
    http.send();
  });
}

function getAllDomains() {
  const url = 'https://flask-server-deplohy.herokuapp.com/domains';
  const http = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          const response = JSON.parse(http.responseText);
          resolve(response);
        } else {
          reject(new Error('Request failed'));
        }
      }
    };

    http.open('GET', url);
    http.send();
  });
}

add_domains_to_drop_down(await getAllDomains());

function add_domains_to_drop_down(domains) {
  var dropdown = document.getElementById("domain-list");
  for (const element of domains) {
    const option = document.createElement("option");
    option.value = element;
    option.text = element;

    dropdown.appendChild(option);
  }
}
const domainSelect = document.getElementById("domain-list");

domainSelect.addEventListener("change", async () => {
  const guidesDropdown = document.getElementById("guide-list");
  guidesDropdown.innerHTML = "";
  const selectedDomain = domainSelect.value;
  const matchingGuides = await getGuidesByDomain(selectedDomain);

  for (const guide of matchingGuides) {
    const option = document.createElement("option");
    option.value = guide.guide_name;
    option.text = guide.guide_name;
    guidesDropdown.appendChild(option);
  }
});

const button = document.getElementById("Go-to-chosen-option-button");

button.addEventListener("click", async () => {
  const domainDropdown = document.getElementById("domain-list");
  const domainDropdownValue = domainDropdown.value;
  const guidesDropdown = document.getElementById("guide-list");
  const guidesDropdownValue = guidesDropdown.value;

  if (domainDropdownValue != "" && guidesDropdownValue != "") {
    let guide = await get_guide(domainDropdownValue, guidesDropdownValue)
    const url = "https://".concat("", domainDropdownValue);
    guide = guide['actions']

    guide.forEach(obj => {
      obj.found = false;
    });
    chrome.storage.local.set({ 'active_guide': guide }, function() {});

    chrome.tabs.create({ url });
  } else {
    alert("Please select a website and a guide");
  }
});