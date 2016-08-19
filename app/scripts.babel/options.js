'use strict';

// Saves options to chrome.storage.sync.
function save_options() {
  var order = document.getElementById('order').value;
  chrome.storage.sync.set({
    order: order
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    order: 1
  }, function(items) {
    document.getElementById('order').value = items.order;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
