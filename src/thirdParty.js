const setThirdPartyDomains = async (tabs) => {
    let tab = tabs.pop();
    var thirdPartyDomainsList = document.getElementById('third-party-list');
    var thirdPartyStatus = document.getElementById('third-party-status');

    const response = await browser.tabs.sendMessage(tab.id, {
        method: "thirdPartyDomains"
    });
    
    var thirdPartyDomains = response.data.links;
    var thirdPartyLen = 0;
    
    var thirdPartyCount = document.getElementById("third-party-count");
    
    if (thirdPartyDomains.length > 0) {
        for (let thirdPartyItem of thirdPartyDomains) {
            if (thirdPartyItem) {
                let li = document.createElement("li");
                let content = document.createTextNode(thirdPartyItem);
                li.appendChild(content);
                thirdPartyDomainsList.appendChild(li);
                thirdPartyLen++;
            }
        }
        var thirdPartyCountText = document.createTextNode("External Links Count: "+ thirdPartyLen);
        thirdPartyCount.appendChild(thirdPartyCountText);
        thirdPartyCount.setAttribute("value", (100*thirdPartyLen)/200);

        if(thirdPartyLen >= 200){
        thirdPartyStatus.style.color = "red";
        } else if (thirdPartyLen > 100 && thirdPartyLen < 200){
        thirdPartyStatus.style.color = "orange";
        } 

    } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No local storage were found.");

        p.appendChild(content);
        thirdPartyDomainsList.appendChild(p);
    }
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(setThirdPartyDomains);