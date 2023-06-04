
async function waitForClick(element, guide) {
  return new Promise((resolve, reject) => {
    element.addEventListener("click", function() {
      guide.shift()
      console.log(guide)
      chrome.storage.local.set({ 'active_guide': guide }, function() {});
      remove_pulse(element)
      resolve();
    });
  });
}


  async function get_element(class_name, content)
  {
    return new Promise((resolve, reject) =>
    {

      const class_members = document.getElementsByClassName(class_name);

      for (var i = 0; i < class_members.length; i++) 
      {
        var element = class_members[i];
        if(element.textContent.trim() === content)
        {
          resolve(element)
        }
      }
      reject('element not found in class members')
    })
  }

  function add_pulse(element)
  {
    element.classList.add('pulsing-element');
  }
  function step_found(guide){
    guide[0].found=true
    chrome.storage.local.set({ 'active_guide': guide }, function() {});
  }

  function remove_pulse(element)
  {
    element.classList.remove('pulsing-element')
  }

  async function execute_step(guide_step,guide)
  {
    console.log(guide_step)
    let element = await get_element(guide_step['key'], guide_step['value'])
    step_found(guide)
    console.log(element)
    add_pulse(element)
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await waitForClick(element,guide)
    
  }
  async function wait_for_guide()
  {
    chrome.storage.local.get(['active_guide'], (result) =>
    { 
      const steps = result['active_guide']
      if(steps.length>0 && !steps[0].found)
      {
        console.log(steps)
        execute_step(steps[0], steps)  
      }

    }

  )}
  

  var pulse_effect = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 223, 0, 0.8);
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 10px 5px rgba(255, 223, 0, 0.8);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 223, 0, 0.8);
    }
  }

  .pulsing-element {
    animation: pulse 1s infinite;
  }
`;

var styleElement = document.createElement('style');
styleElement.textContent = pulse_effect;

document.head.appendChild(styleElement);

  setInterval(wait_for_guide, 1000);
