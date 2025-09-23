if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
        .then (registration => {
            console.log("Service Worker registered with scope: ", registration.scope);
        })
        .catch(error => {
            console.log("Service Worker registration failed: ", error);
        });
    });
}

//aktualni stav citace
let counter = 0;

//konstanty
const MAX_COUNTER_VAL = 10;
const MIN_COUNTER_VAL = -10;

function btn_management(operation) {
    //kontrola check-boxu

    let tmp = 1;
    if(document.getElementById("double_check").checked) {
        //check box zatrhnut, pojedeme po dvou
        tmp = 2;
    }

    //Vyber operace
    switch(operation) {
        case "add":
            if(counter < MAX_COUNTER_VAL) {
                counter = counter + tmp;
            }
            break;
        case "sub":
            if(counter > MIN_COUNTER_VAL) {
                counter = counter - tmp;
            }
            break;
        case "reset":
            counter = 0;
            break;
    }
    document.getElementById("counter_span").innerText = counter;
}

//spusteni kodu pri nacteni stranky
window.onload = function() {
    document.getElementById("counter_span").innerText = counter;
}