// タブが更新された時
chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab){
    url_match(tab);
});

// タブがアクティブになった時
chrome.tabs.onActivated.addListener(function(tab){
    //// onActivatedはtab.urlが取れないため、get()を利用する
    chrome.tabs.get(tab.tabId, function(tab){
        url_match(tab);
    });
});

function url_match(tab) {

    var storage_keywords = [];
    chrome.storage.local.get('value', function(items) {
        storage_keywords = items.value;
    });

    // コールバック関数より後に実行させる
    window.setTimeout(
        function(){
            // 現在見ているページが、登録したキーワードに一致するか確認
            var isMatch = false;
            for (var i = 0; i < storage_keywords.length; i++) {
                if (storage_keywords[i]) {
                    var regexp = new RegExp(storage_keywords[i], 'i');
                    isMatch = regexp.test(tab.url);
                    if (isMatch) {
                        break;
                    }
                }
            }

            if (isMatch) {
                chrome.tabs.executeScript({
                    code: 'document.body.style.borderLeft="red 15px solid"'
                });
            } else {
                chrome.tabs.executeScript({
                    code: 'document.body.style.borderLeft=""'
                });
            }
        },
        300
    );
}