chrome.runtime.onInstalled.addListener(function () {
    console.log('Screen Recorder extension installed');
  });
  
  chrome.runtime.onStartup.addListener(function () {
    console.log('Screen Recorder extension started');
  });
  
  chrome.runtime.onSuspend.addListener(function () {
    console.log('Screen Recorder extension suspended');
  });
  