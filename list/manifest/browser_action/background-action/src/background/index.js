const DEBUG_TAG = 'list/manifest/browser_action/background/index.js';
console.log(DEBUG_TAG);

function myListener(tab, data) {
    //.. при клике будет выполнен этот код
    // в аргумент tab попадет базовая информация об активной вкладке. !!! контент недоступен !!!
    console.log(DEBUG_TAG, 'myListener', {
        tab: tab,
        data: data
    });
    console.log('tab.url', tab.url);       // tab.url https://auto.ria.com/uk/
    console.log('tab.title', tab.title);   // tab.title AUTO.RIA™ — Автобазар №1, купити та продати перевірене авто легко!
    console.log('tab.status', tab.status); // tab.status complete
    alert(DEBUG_TAG + '/myListener/end');
}

browser.browserAction.onClicked.addListener(myListener);