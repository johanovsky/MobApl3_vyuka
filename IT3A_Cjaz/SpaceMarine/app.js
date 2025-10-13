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

//najdu a stahnu si do konstanty checkbox
const marineSwitch = document.getElementById("spaceMarine_check");
//najdu a stahnu si do konstanty obrazek
const marineImg = document.getElementById("spaceMarine_img");

//pridame posluchace udalosti zmena checkboxu
marineSwitch.addEventListener("change", onMarineSwitchChange);

//funkce ktera se ma spustit kdyz dojde k zmene checkboxu
function onMarineSwitchChange(event) {
    if(marineSwitch.checked) {
        //zmena byla z off -> on
        marineImg.src = "Shooting.gif";
    } else {
        //zmena byla z on -> off
        marineImg.src = "NotShooting.jpg";
    }
}