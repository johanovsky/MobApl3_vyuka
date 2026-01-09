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

//potrebujeme prepinac a svetlo
const bulbSwitch = document.getElementById("bulbSwitch");
const bulbLight = document.getElementById("bulbLight");

//pridame prepinaci funkci, ktera se spusti pri jeho prepnuti
bulbSwitch.addEventListener("change", prepniSvetlo);

function prepniSvetlo(event) {
    //doslo ke zmene stavu prepinace
    if(bulbSwitch.checked) {
        //zmena byla z off->on
        bulbLight.style.width = "130px";
        bulbLight.style.height = "130px";
        bulbLight.style.transition = "0.5s";
        //kontrolni vypis do konzole
        console.log("switch on");       
    } else {
        //zmena byla z on->off
        bulbLight.style.width = "0px";
        bulbLight.style.height = "0px";
        bulbLight.style.transition = "0.5s";
        //kontrolni vypis do konzole
        console.log("switch off");
    }
}

//po nacteni stranky se pokusim najit nastavenou barvu
window.onload = function() {
    //nacti ulozenou barvu
    let color = sessionStorage.getItem("color");
    //kontrolni vypis
    console.log("Nactena barva: " + color);
    //kdyz nemas barvu
    if(color === null) {
        //tak def. barva = red
        color = "red";
        //rovnou ulozime def. volbu
        sessionStorage.setItem("color", "red");
    }
    //nyni mam barvu
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