chrome.runtime.onInstalled.addListener(createContextMenu);// will be call on install and on "updates" - is this needed
// confrim this - should i just call createContextMenu() in global scope or should i only do so in these listeniers?
chrome.runtime.onStartup.addListener(createContextMenu);



chrome.contextMenus.onClicked.addListener(function (info, tab) {
  // if (info && info.pageUrl && tab.title) {
  //   openMailApp(tab.title, info.pageUrl);
  // }

  if (info.menuItemId === "emailThisPage" && info.pageUrl && tab.title) {
    openMailApp(info.pageUrl, tab.title);
  } else if (info.menuItemId === "emailThisLink" && info.linkUrl ) {
    openMailApp(info.linkUrl)
  }




});

chrome.browserAction.onClicked.addListener(function (tab) { // for now - can create popup
  console.log("here", tab);
  if (tab && tab.url && tab.url) {
    openMailApp(tab.url, tab.title);
  }
})

function openMailApp(url, title) {

  let encodedURL = encodeURIComponent(url);
  let mailtoURL = '';
  if (title) {
    mailtoURL = "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodedURL;
  } else {
    mailtoURL = "mailto:?body=" + encodedURL;
  }
  // mailtoURL = "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url);
  
  // chrome.tab.create()??
  window.open(mailtoURL, "_blank");
}

function createContextMenu() {
  chrome.contextMenus.create({
    id: "emailThisPage",
    title: "Email this page",
    type: "normal",
  }); // should i just call this outside of the listeners

  chrome.contextMenus.create({
    id: "emailThisLink",
    title: "Email this Link",
    type: "normal",
    contexts: ["link"]
  });

}