function securityScore(tabs) {
    let tab = tabs.pop();
    let securityStatus = document.getElementById("security-status");
    let cookiesCount = parseInt(document.getElementById("cookie-count").getAttribute("value"))
    let localStorageCount = parseInt(document.getElementById("local-storage-count").getAttribute("value"))
    let thirdPartyCount = parseInt(document.getElementById("third-party-count").getAttribute("value"))

    var websiteScore = parseInt((cookiesCount + localStorageCount + thirdPartyCount)/3);

    if (websiteScore <= 42){
        securityStatus.innerHTML = "Website is Secure. Score: " + websiteScore + "/100";
        securityStatus.style.color = "green";
    } else if (websiteScore > 42 && websiteScore < 70){
        securityStatus.innerHTML = "Website is Suspect. Score: " + websiteScore + "/100";
        securityStatus.style.color = "orange";
    } else{
        securityStatus.innerHTML = "Website is not Secure. Score: " + websiteScore + "/100";
        securityStatus.style.color = "red";
    }

    
  }

  function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }
  
  setTimeout(() => {
    getActiveTab().then(securityScore);
  }, 100);