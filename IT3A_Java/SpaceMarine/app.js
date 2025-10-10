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

//vyrobim konstantu s tim prepinacem
const marineSwitch = document.getElementById("marine_check");
//nastavime posluchac udalosti - zmena prepinace
//zadana funkce se spusti, kdyz dojde ke zmene prepinace
marineSwitch.addEventListener("change", onMarineSwitchChange);
//vyrobime konstantu s obrazkem
const marineImg = document.getElementById("marine_img");


//metoda ktera se ma spustit, kdyz dojde ke zmene stavu prepinace
function onMarineSwitchChange(event) {
    //zjistime jaka zmena to byla
    if(marineSwitch.checked) {
        //nyni je zatrhnuty -> zmena byla z off do on
        marineImg.src = "./Shooting.gif";
    } else {
        //nyni neni zatrhnuty -> zmena byla z on do off
        marineImg.src = "./NotShooting.jpg";
    }
}