'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

function updateBadge() {
  chrome.browserAction.setBadgeText({text: '#0'});
  chrome.bookmarks.search('ReadNowBookmarks',
  	function(BookmarksArray){
  		if(BookmarksArray.length > 0){
  			var nodeId = BookmarksArray[0].id;
  			chrome.bookmarks.getChildren(nodeId, function(children){
          chrome.browserAction.setBadgeText({text: '#' + children.length });
        });
      }
    });
}

chrome.bookmarks.onCreated.addListener(updateBadge);
chrome.bookmarks.onRemoved.addListener(updateBadge);
updateBadge();
