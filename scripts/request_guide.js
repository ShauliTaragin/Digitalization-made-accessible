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

const button = document.getElementById("SubmitButton");
button.addEventListener("click", async () => {

    const email = document.getElementById('email').value;
    const requestType = document.getElementById('Requesttype').value;
    const additionalNotes = document.getElementById('subject').value;
    const currentURL = await get_current_domain();
    const request_guide = {
        email: email,
        request_type: requestType,
        additional_notes: additionalNotes,
        current_url: currentURL
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://flask-server-deplohy.herokuapp.com/request_guide`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(request_guide));
})
