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

//najdeme si prepinac a ulozim ho do konstanty
const marineSwitch = document.getElementById("spaceMarine_check");
//najdeme a ulozime do konstanty obrazek
const marineImg = document.getElementById("spaceMarine_img");

//nastavime posluchace udalosti zmena checkboxu
marineSwitch.addEventListener("change", onMarineSwitchChange);

//funkce ktera se ma spustit pri zmene checkboxu
function onMarineSwitchChange(event)  {
    if(marineSwitch.checked) {
        //zmena byla z off -> on
        marineImg.src = "Shooting.gif";
    } else {
        //zmena byla z on -> off
        marineImg.src = "NotShooting.jpg";
    }
}