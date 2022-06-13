function showCookiesForTab(tabs) {
    let tab = tabs.pop();
    let cookiesCount = 0;
    var gettingAllCookies = browser.cookies.getAll({url: tab.url});

    gettingAllCookies.then((cookies) => {
  
      var activeTabUrl = document.getElementById('header-title');
      var text = document.createTextNode(": "+tab.title);
      activeTabUrl.appendChild(text);
      // var cookieList = document.getElementById('cookie-list');
  
      if (cookies.length > 0) {
        for (let cookie of cookies) {
          cookiesCount += 1;
        }
        var cookieElement = document.getElementById("cookie-count");
        var cookieText = document.createTextNode("Cookie Count: " + cookiesCount);
        cookieElement.appendChild(cookieText);
        cookieElement.setAttribute("value", (10*cookiesCount)/11);
        

        if (cookiesCount >= 100) {
          cookieElement.style.color = "red"
        } else if (cookiesCount >= 50 && cookiesCount < 100){
          cookieElement.style.color = "orange"
        }

      } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = cookieList.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }
    });

    
  }

  function getActiveTab() {
    return browser.tabs.query({currentWindow: true, active: true});
  }
  getActiveTab().then(showCookiesForTab);