const getAllExternalLinks = () => {
    var allExternalLinks = Array.prototype.map.call(
      document.querySelectorAll(
        "link, img, video, audio,script, iframe, source, embed"
      ),
      (HTMLtag) => { 
        return HTMLtag.href || HTMLtag.src; 
      }
    )
  
    const data = {
      links: allExternalLinks,
      numberOfLinks: allExternalLinks.length
    }
  
    return data;
  } 
  
  
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.method) {
      case "localStorageData":
        sendResponse({ 
          data: Object.entries(localStorage) 
        });
        break;
      case "thirdPartyDomains":
        sendResponse({ 
          data: getAllExternalLinks() 
        });
        break;
        break;
      default:
        sendResponse({ 
          data: null 
        });
    }
  });