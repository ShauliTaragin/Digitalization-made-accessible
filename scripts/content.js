
async function waitForClick(btn, guide) {
  return new Promise((resolve, reject) => {
    btn.addEventListener("click", function() {
      guide.shift()
      console.log(guide)
      chrome.storage.local.set({ 'active_guide': guide }, function() {});
      btn.style.backgroundColor = "";
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

  function color_element(element)
  {
    element.style.backgroundColor = "yellow";
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function step_found(guide){
    guide[0].found=true
    chrome.storage.local.set({ 'active_guide': guide }, function() {});
  }

  async function execute_step(guide_step,guide)
  {
    console.log(guide_step)
    let element = await get_element(guide_step['key'], guide_step['value'])
    step_found(guide)
    console.log(element)
    color_element(element)
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
  
  setInterval(wait_for_guide, 1000);
