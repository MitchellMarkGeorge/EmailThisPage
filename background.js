chrome.runtime.onInstalled.addListener(function ({ reason }) {
  if (reason === "install") {
    // in this case, we know that there are no context menu items hanging around
    createContextMenu();
  } else {
  // like extension update or chrome update
  // basically remove all the curreent context menu items and add them again
  // this prevents the extension from trying to add the same context menu again, which causes an error
    chrome.contextMenus.removeAll(() => {
      createContextMenu();
    });
  }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log(tab?.title)
  if (info.menuItemId === "emailThisPage" && info.pageUrl && tab?.title) {
    openMailApp(info.pageUrl, tab?.title);
  } else if (info.menuItemId === "emailThisLink" && info.linkUrl) {
    openMailApp(info.linkUrl);
  }
});

chrome.action.onClicked.addListener(function (tab) {
  if (tab && tab.title) {
    // use pendingUrl if the normal url is not avalible (like the page is loading)
    if (tab.url) {
      openMailApp(tab.url, tab.title);
    } else if (tab.pendingUrl) {
      console.log(url);
      openMailApp(tab.pendingUrl, tab.title);
    }
  }
});

function openMailApp(url, title) {
  let mailtoURL = new URL("mailto:");
  if (title) {
    
    mailtoURL.searchParams.set("subject", title);
    mailtoURL.searchParams.set("body", url);
  } else {
    mailtoURL.searchParams.set("body", url);
  }
  chrome.tabs.create({ url: mailtoURL.toString() });
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
