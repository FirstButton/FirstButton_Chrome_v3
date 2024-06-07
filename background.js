// © 2010-2014, 2020, 2024 Copyright Liquidity Lighthouse, LLC.  All Rights Reserved.
chrome.action.onClicked.addListener(function (tab) {
    chrome.windows.getAll({ populate: true }, function (windows) {
        var isTabPresent = false;

        // Iterate through all windows and tabs
        for (var i = 0; i < windows.length; i++) {
            var window = windows[i];
            for (var j = 0; j < window.tabs.length; j++) {
                var currentTab = window.tabs[j];
                if (currentTab.url.includes("https://example.com/")) {
                    isTabPresent = true;
                    chrome.windows.update(window.id, { focused: true }, function () {
                        chrome.tabs.update(currentTab.id, { active: true });
                    });
                    break;
                }
            }
            if (isTabPresent) break;
        }

        // If no tab with the URL is found, create a new one
        if (!isTabPresent) {
            chrome.tabs.create({ url: 'https://example.com/', active: true });
        }
    });
});