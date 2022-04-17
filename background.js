chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(createContextMenu);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "emailThisPage" && info.pageUrl && tab.title) {
    openMailApp(info.pageUrl, tab.title);
  } else if (info.menuItemId === "emailThisLink" && info.linkUrl) {
    openMailApp(info.linkUrl);
  }
});

chrome.action.onClicked.addListener(function (tab) {
  if (tab && tab.title) {
    let url;
    // use pendingUrl if the normal url is not avalible (like the page is loading)
    if (tab.url) {
      url = tab.url;
    } else {
      url = tab.pendingUrl;
    }
    openMailApp(url, tab.title);
  }
});

function openMailApp(url, title) {
  let encodedURL = encodeURIComponent(url);
  let mailtoURL = "";
  if (title) {
    mailtoURL =
      "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodedURL;
  } else {
    mailtoURL = "mailto:?body=" + encodedURL;
  }
  // mailtoURL = "mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(url);

  chrome.tabs.create({ url: mailtoURL });
  // window.open(mailtoURL, "_blank");
}

function createContextMenu() {
  chrome.contextMenus.create({
    id: "emailThisPage",
    title: "Email this Page",
    type: "normal",
  });

  chrome.contextMenus.create({
    id: "emailThisLink",
    title: "Email this Link",
    type: "normal",
    contexts: ["link"],
  });
}
