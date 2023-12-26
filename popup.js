document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addUrl').addEventListener('click', function () {
      addUrl();
    });
  
    document.getElementById('openTabs').addEventListener('click', function () {
      openTabs();
    });
  
    // Load saved URLs from storage
    loadUrls();
  });
  
  function addUrl() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
  
    if (url !== '') {
      chrome.storage.sync.get(['urls'], function (result) {
        const urls = result.urls || [];
        urls.push(url);
  
        // Save updated URLs to storage
        chrome.storage.sync.set({ 'urls': urls }, function () {
          // Clear input field and reload URL list
          urlInput.value = '';
          loadUrls();
        });
      });
    }
  }
  
  function openTabs() {
    chrome.storage.sync.get(['urls'], function (result) {
      const urls = result.urls || [];
  
      // Open tabs for each saved URL
      urls.forEach(url => {
        chrome.tabs.create({ url: url, active: false });
      });
    });
  }
  
  function removeUrl(urlToRemove) {
    chrome.storage.sync.get(['urls'], function (result) {
      let urls = result.urls || [];
  
      // Remove the specified URL
      urls = urls.filter(url => url !== urlToRemove);
  
      // Save updated URLs to storage
      chrome.storage.sync.set({ 'urls': urls }, function () {
        // Reload URL list
        loadUrls();
      });
    });
  }
  
  function loadUrls() {
    const urlList = document.getElementById('urlList');
    urlList.innerHTML = '';
  
    chrome.storage.sync.get(['urls'], function (result) {
      const urls = result.urls || [];
  
      // Display saved URLs in a list with remove buttons
      urls.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
          removeUrl(url);
        });
  
        listItem.appendChild(removeButton);
        urlList.appendChild(listItem);
      });
    });
  }
  