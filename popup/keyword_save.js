
//キーワードを登録するためのフォームを作成
var storage_keywords = [];
chrome.storage.local.get('value', function(items) {
    storage_keywords = items.value;
});

// コールバック関数より後に実行させる
window.setTimeout(
    function(){
        // キーワード登録フォーム作成
        for (var i=0; i < 10; i++) {
            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("class","text");
            // 登録されている要素がある場合
            if (storage_keywords != undefined) {
                input.setAttribute("value", storage_keywords[i]);
            }
            document.getElementById("keywords").appendChild(input);
        }
    },
    300
);

document.addEventListener("click", function(e) {

    // キーワードをストレージに保存
    if (e.target.classList.contains("save")) {

        // ストレージ内のデータを削除
        chrome.storage.local.remove("value");

        var keywords = document.getElementsByClassName("text");

        var array_keywords = [];
        for (var i = 0; i < keywords.length; i++) {
            array_keywords.push(keywords[i].value);
        }

        chrome.storage.local.set({'value': array_keywords}, function() {});

        // 保存完了文字表示
        document.getElementById("complete_text").style.display = "";

        chrome.tabs.reload();
    }

    // 保存完了文言の非表示
    if (e.target.classList.contains("text")) {
        document.getElementById("complete_text").style.display = "none";
    }
});
