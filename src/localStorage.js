const showAllLocalStorage = async (tabs) => {
    let tab = tabs.pop();
    var localStorageList = document.getElementById('local-storage-list');
    var localStorageCount = document.getElementById('local-storage-count');
    let localStorageLen = 0;
  
    const response = await browser.tabs.sendMessage(tab.id, { 
      method: "localStorageData"
    });
  
    var localStorageStatus = document.getElementById('local-storage-status');
  
    if (response.data.length > 0) {
      for (let localStorageItem of response.data) {
        if (localStorageItem != undefined) {
            let li = document.createElement("li");
            let content = document.createTextNode(localStorageItem);
            li.appendChild(content);
            localStorageList.appendChild(li);
            localStorageLen++;
        }
      }
      let countText = document.createTextNode("Local Storage Count: " + localStorageLen);
      localStorageCount.appendChild(countText);
      localStorageCount.setAttribute("value", (100*localStorageLen)/42);
      
      if(localStorageLen > 50){
        localStorageStatus.style.color = "red";
      } else if (localStorageLen > 25 && localStorageLen < 50){
        localStorageStatus.style.color = "orange";
      } 
  
    } else {
      let noLocalStorageTag = document.createElement("h4");
      let noLocalStorageData = document.createTextNode("No local storage were found.");
  
      noLocalStorageTag.appendChild(noLocalStorageData);
      localStorageList.appendChild(noLocalStorageTag);
    }
  }
    
  function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }
  
  getActiveTab().then(showAllLocalStorage);