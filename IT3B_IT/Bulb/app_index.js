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

//stahneme komponenty z html
const bulbSwitch = document.getElementById("bulbSwitch");
const bulbLight = document.getElementById("bulbLight");

//pridame posluchace udalosti "zmena" na prepinac
bulbSwitch.addEventListener("change", prepniZarovku);

//metoda pro prepnuti zarovky
function prepniZarovku() {
    if(bulbSwitch.checked === true) {
        //budeme rozsvecet zarovku
        bulbLight.style.width = "130px";
        bulbLight.style.height = "130px";
        bulbLight.style.transition = "0.5s";

        //kontrolni vypis
        console.log("Switch on");
    } else {
        //budeme zhasinat
        bulbLight.style.width = "0px";
        bulbLight.style.height = "0px";
        bulbLight.style.transition = "0.5s";

        //kontrolni vypis
        console.log("Switch off");
    }
}

//pri nacteni stranky se pokusime stahnout ulozenou barvu
window.onload = function() {
    //zkusime nacist barvu
    let color = sessionStorage.getItem("color");
    //kontrolni vypis
    console.log("Nactena barva: " + color); 
    //kdyz nemam barvu
    if(color === null) {
        //nastavime def. red
        color = "red";
        //a rovnou to uloz do sessionStorage
        sessionStorage.setItem("color", color);
    }
    //podle barvy nastavime svetlo zarovky
    switch(color) {
        case "red":
            bulbLight.style.background = "radial-gradient(circle, rgba(255, 0, 0, 1), rgba(0, 0, 0, 0))";
            break;
        case "green":
            bulbLight.style.background = "radial-gradient(circle, rgba(0, 255, 0, 1), rgba(0, 0, 0, 0))";
            break;
        case "blue":
            bulbLight.style.background = "radial-gradient(circle, rgba(0, 0, 255, 1), rgba(0, 0, 0, 0))";
            break;
        case "yellow":
            bulbLight.style.background = "radial-gradient(circle, rgba(255, 255, 0, 1), rgba(0, 0, 0, 0))";
            break; 
        case "magenta":
            bulbLight.style.background = "radial-gradient(circle, rgba(255, 0, 255, 1), rgba(0, 0, 0, 0))";
            break;
        case "cyan":
            bulbLight.style.background = "radial-gradient(circle, rgba(0, 255, 255, 1), rgba(0, 0, 0, 0))";
            break;   
    }   
}