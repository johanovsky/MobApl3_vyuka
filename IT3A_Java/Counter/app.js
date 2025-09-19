if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js")
            .then(registration => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch(error => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

//aktualni hodnota citace
let counter = 0;
//konstanty pro omezeni rozsahu
const MAX_VAL = 10;
const MIN_VAL = -10;

function btn_management(operation) {

    //promenna ktera rika kolik budu pricitat / odecitat
    let pom = 1;
    //jestlize je checkbox zatrhnuty
    if(document.getElementById("double_check").checked) {
        //budeme pricitat / odecitat 2
        pom = 2;
    };
    //podle parametru vykoname operaci
    switch(operation) {
        case "add":
            if(counter < MAX_VAL) {
                counter = counter + pom;
            }
            break;
        case "sub":
            if(counter > MIN_VAL) {
                counter = counter - pom;
            }
            break;
        case "reset":
            counter = 0;
            break;
    }
    //novou hodnotu zobrazime v aplikaci
    document.getElementById("count_span").innerText = counter;   
}

//spusteni kodu pri nacteni stranky
window.onload = function() {
    //zobraz pocatecni hodnotu counteru
    document.getElementById("count_span").innerText = counter;
}