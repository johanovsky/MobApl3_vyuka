if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
        .then(registration => {
            console.log("Service Worker registered with scope: ", registration.scope);
        })
        .catch(error => {
            console.log("Service Worker registration failed: ", error);
        });
    });
}

//glob. promenna pro aktualni hodnotu citace
let counter = 0;

//konstanty pro meze
const MAX_COUNTER_VAL = 10;
const MIN_COUNTER_VAL = -10;

function btn_management(operation) {
    //kontrola check-boxu
    let pom = 1;
    if(document.getElementById("double_check").checked) {
        //check-box je zatrhnuty
        pom = 2;
    }

    //podle operace vykoname akci
    switch(operation) {
        case "add":
            if(counter < MAX_COUNTER_VAL) {
                counter = counter + pom;
            }
            break;
        case "sub":
            if(counter > MIN_COUNTER_VAL) {
                counter = counter - pom;
            }
            break;
        case "reset":
            counter = 0;
            break;
    }
    //vypiseme aktualni hodnotu counteru
    document.getElementById("counter_span").innerText = counter;
}

//spusteni kodu pri nacteni stranky
window.onload = function() {
    //zobrazeni uvodni nuly
    document.getElementById("counter_span").innerText = counter;
}