'use strict';

// QUICKSORT
// https://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
//takes an object returns the value over weight
function value(item){
  return item.dateAdded;
}

function swap(items, firstIndex, secondIndex){
	var temp = items[firstIndex];
	items[firstIndex] = items[secondIndex];
	items[secondIndex] = temp;
}

function partition(items, left, right) {
  var pivot   = value(items[Math.floor((right + left) / 2)]),
      i       = left,
      j       = right;


  while (i <= j) {

    while (value(items[i]) > pivot) {
      i++;
    }

    while (value(items[j]) < pivot) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function quickSort(items, left, right) {

  var index;

  if (items.length > 1) {

    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);
    }

  }

  return items;
}

// MAIN FUNCTION
chrome.bookmarks.search('ReadNowBookmarks',
	function(BookmarksArray){
		if(BookmarksArray.length > 0){
			var nodeId = BookmarksArray[0].id;
			chrome.bookmarks.getChildren(nodeId, function(children){
				if(children.length > 0){
          
          var URLs = [];
          for (var i = 0; i < children.length; i++) {
            URLs.push(children[i]);
          }
          var sortedURLs = quickSort(URLs, 0, URLs.length - 1);

          chrome.storage.sync.get({
            order: 1
          }, function(items) {
            var index = 0;
            if(items.order == 1) {
                index = 0;
            } else if(items.order == 2){
                index = URLs.length - 1;
            } else {
              index = Math.floor(Math.random() * URLs.length);
            }

            //open the page in a new tab
            chrome.tabs.create({ url: sortedURLs[index].url });
            // remove it from bookmarks
            chrome.bookmarks.remove(sortedURLs[index].id);
          });
				} else {
					console.log('No pages to read');
				}
			});
		} else {
			console.log('Bookmark folder does not exist');
		}
	}
);
