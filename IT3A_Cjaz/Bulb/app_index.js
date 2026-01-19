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

//vytahnu si z HTML dva prvky
const bulbSwitch = document.getElementById("bulbSwitch");
const bulbLight = document.getElementById("bulbLight");

//pridame posluchac udalosti "zmena" na prepinac
bulbSwitch.addEventListener("change", prepniZarovku);

function prepniZarovku(event) {
    if(bulbSwitch.checked === true) {
        //tady budeme rozsvecet
        bulbLight.style.width = "130px";
        bulbLight.style.height = "130px";
        bulbLight.style.transition = "0.5s";
        //kontrolni do konzole
        console.log("switch on");
    } else {
        //tady budeme zhasinat       
        bulbLight.style.width = "0px";
        bulbLight.style.height = "0px";
        bulbLight.style.transition = "0.5s";
        console.log("switch off");
    }
}

//po spusteni stranky nacti ulozenou barvu ze session storage
window.onload = function() {
    //zkusime nacist barvu ze sessionStorage
    let color = sessionStorage.getItem("color");
    //kontrolni vypis
    console.log("Nactena barva: " + color);
    //co kdyz se nic nenacetlo
    if(color === null) {
        //nic se nenacetlo -> default bude cervena
        color = "red";
        //vybrali jsme default -> ulozime ho do sessionStorage
        sessionStorage.setItem("color", color);
    }
    //podle color nyni nastavime barvu bulbLight
    switch(color) {
        case "red":
            bulbLight.style.background = "radial-gradient(circle, rgba(255,0,0,1), rgba(0,0,0,0)";
            break;
        case "green":
            bulbLight.style.background = "radial-gradient(circle, rgba(0,255,0,1), rgba(0,0,0,0)";
            break;
        case "blue":
            bulbLight.style.background = "radial-gradient(circle, rgba(0,0,255,1), rgba(0,0,0,0)";
            break;
        case "yellow":
            bulbLight.style.background = "radial-gradient(circle, rgba(255,255,0,1), rgba(0,0,0,0)";
            break;
        case "magenta":
            bulbLight.style.background = "radial-gradient(circle, rgba(255,0,255,1), rgba(0,0,0,0)";
            break;
        case "cyan":
            bulbLight.style.background = "radial-gradient(circle, rgba(0,255,255,1), rgba(0,0,0,0)";
            break;
    }

}