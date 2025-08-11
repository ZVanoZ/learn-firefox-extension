const DEBUG_TAG = 'src/default_popup/index.js';
console.log(DEBUG_TAG);

/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `
body > :not(.beastify-image) {
    display: none;
}
`;


class App {
    constructor() {
        console.log(DEBUG_TAG, 'App', 'constructor', [this, arguments]);
    }

    init() {
        console.log(DEBUG_TAG, 'App', 'init', [this, arguments]);
        this.listenForClicks();
    }

    /**
     * There was an error executing the script.
     * Display the popup's error message, and hide the normal UI.
     */
    reportExecuteScriptError(error) {
        console.log(DEBUG_TAG, 'App', 'reportExecuteScriptError', [this, arguments]);
        const message = error.message || error;
        console.error(`Failed to execute beastify content script: ${message}`);
        document.querySelector("#popup-content").classList.add("hidden");
        document.querySelector("#error-content").classList.remove("hidden");
    }


    /**
     * Listen for clicks on the buttons, and send the appropriate message to
     * the content script in the page.
     */
    listenForClicks() {
        console.log(DEBUG_TAG, 'App', 'listenForClicks', [this, arguments]);
        document.addEventListener("click", this.onMenuItemClick);
    }

    /**
     *
     * @param {MouseEvent} e
     */
    onMenuItemClick = (e) => {
        console.log('popup', 'onMenuItemClick', [this, e]);
        console.log('popup', 'onMenuItemClick', 'e', Object.assign({}, e));

        // /**
        //  * Given the name of a beast, get the URL to the corresponding image.
        //  */
        // function beastNameToURL(beastName) {
        //     console.log('popup', 'listenForClicks', 'beastNameToURL', [this, arguments]);
        //     return 'icons/car-sale/512x512.png';
        // }
        //
        // /**
        //  * Insert the page-hiding CSS into the active tab,
        //  * then get the beast URL and
        //  * send a "beastify" message to the content script in the active tab.
        //  */
        // function beastify(tabs) {
        //     console.log('popup', 'listenForClicks', 'beastify', [this, arguments]);
        //
        //     browser.tabs.insertCSS(
        //         {
        //             code: hidePage
        //         }
        //     ).then(
        //         () => {
        //             console.log('popup', 'listenForClicks', 'beastify/then', [this, arguments]);
        //
        //             const
        //                 url = beastNameToURL(e.target.textContent),
        //                 tabId = tabs[0].id,
        //                 message = {
        //                     command: "beastify",
        //                     beastURL: url
        //                 }
        //             ;
        //             console.log('popup', 'listenForClicks', 'beastify/then-sendMessage', [tabId, message]);
        //             browser.tabs.sendMessage(tabId, message);
        //         }
        //     ).then(
        //         () => {
        //             console.log('popup', 'listenForClicks', 'beastify/then-success');
        //         }
        //     ).catch(
        //         (reason) => {
        //             console.log('popup', 'listenForClicks', 'beastify/catch', reason);
        //             throw reason;
        //         }
        //     );
        // }
        //
        // /**
        //  * Remove the page-hiding CSS from the active tab,
        //  * send a "reset" message to the content script in the active tab.
        //  */
        // function reset(tabs) {
        //     console.log('popup', 'listenForClicks', 'reset', [this, arguments]);
        //
        //     browser.tabs.removeCSS(
        //         {
        //             code: hidePage
        //         }
        //     ).then(() => {
        //         browser.tabs.sendMessage(tabs[0].id, {
        //             command: "reset",
        //         });
        //     });
        // }
        //
        // /**
        //  * Just log the error to the console.
        //  */
        // function reportError(error) {
        //     console.log('popup', 'listenForClicks', 'reportError', [this, arguments]);
        //
        //     console.error(`Could not beastify: ${error}`);
        // }

        const clickedElement = e.target;
        if (!clickedElement.dataset.action) {
            console.log('popup', 'onMenuItemClick', 'SKIP:action-not-found');
            return;
        }

        const action = clickedElement.dataset.action;
        console.log('popup', 'onMenuItemClick', 'action', action);

        switch (action) {
            case 'inject-script-into-page':
                this.doInjectionScript();
                break;
            case 'get-data-from-page':
                this.doGetDataFromPage();
            default:
                this.reportExecuteScriptError('Error: unknown action "' + action + '"');
        }
    }

    /**
     * Внедряет в текущую станицу скрипт JavaScript
     */
    doInjectionScript() {
        console.log(DEBUG_TAG, 'App', 'doInjectionScript', [this, arguments]);
        browser.tabs.executeScript(
            {
                file: "/inject-into-tab/script1.js"
            }
        ).catch(
            this.reportExecuteScriptError.bind(this)
        );
    }

    doGetDataFromPage() {
        console.log(DEBUG_TAG, 'App', 'doGetDataFromPage', [this, arguments]);
        // @TODO: реализовать
        debugger;
        browser.tabs.query(
            {
                active: true,
                currentWindow: true
            }
        ).then(
            (tabs) => {
                browser.tabs.sendMessage(
                    tabs[0].id,
                    {
                        command: "get-content"
                    }
                ).then((response) => {
                        // Обработка ответа от сценария содержимого
                        console.log(response.content);
                    }
                );
            }
        );

    }

}

const app = new App();
app.init();
// app.doInjectionScript();