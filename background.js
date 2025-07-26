// タブが更新された時
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    url_match(tab);
});

// タブがアクティブになった時
chrome.tabs.onActivated.addListener(activeInfo => {
    // get tab info
    chrome.tabs.get(activeInfo.tabId, tab => {
        url_match(tab);
    });
});

function url_match(tab) {
    chrome.storage.local.get('value', items => {
        const storage_keywords = items.value || [];
        // 現在見ているページが、登録したキーワードに一致するか確認
        let isMatch = false;
        for (let i = 0; i < storage_keywords.length; i++) {
            if (storage_keywords[i]) {
                const regexp = new RegExp(storage_keywords[i], 'i');
                isMatch = regexp.test(tab.url);
                if (isMatch) break;
            }
        }

        // scripting.executeScript で実行
        if (isMatch) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    document.body.style.borderLeft = "red 15px solid";
                }
            });
        } else {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    document.body.style.borderLeft = "";
                }
            });
        }
    });
}
