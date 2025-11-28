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

const APIKEY = "ef4dab04b610b4fc6318e3a5a222fdbd";

function getTemp(city, div_id) {
    //vytahnu si bokem div
    const div = document.getElementById(div_id);
    //kontrola jestli mam mesto
    if(city != "") {
        //mam mesto budu zjistovat
        //pozadame API o data
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKEY +"&units=metric&lang=cs")
        .then(response => response.json())
        .then(data => {
            //tady bude zpracovani dat
        })
        .catch(error => {
            //sem to spadne, napr. kdyz zarizeni nebude online
            div.innerHTML = "<p>Nastala chyba</p>";
        });
    } else {
        //nemam mesto -> chyba
        div.innerHTML = "<p>Zadej město</p>";
    }
}

function getTemperature() {
    //stahneme si mesto
    const city = document.getElementById("input_city").value;
    //vyplnime teplotu do zadaneho divu
    getTemp(city, "city");
}