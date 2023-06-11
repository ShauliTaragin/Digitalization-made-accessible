  const button = document.getElementById("toggleButton");
  button.addEventListener("click", () => {
    if (button.innerHTML === "Off") {
        button.innerHTML = "On";
        button.classList.add("on");
        localStorage.setItem("isButtonOn", "true");
        chrome.storage.local.set({ 'notification':true}, function() {});
      } else {
        button.innerHTML = "Off";
        button.classList.remove("on");
        localStorage.setItem("isButtonOn", "false");
        chrome.storage.local.set({ 'notification':false}, function() {});

      }
  })

  document.addEventListener('DOMContentLoaded', function() {
    var isButtonOn = localStorage.getItem("isButtonOn");
    if (isButtonOn === "true") {
        button.innerHTML = "On";
        button.classList.add("on");
    } else {
        button.innerHTML = "Off";
        button.classList.remove("on");
    }
});