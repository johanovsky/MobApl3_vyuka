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

const APIKEY = "ef4dab04b610b4fc6318e3a5a222fdbd";

function getTemp(city, div_id) {
    //vytahneme si div podle jeho id
    const div = document.getElementById(div_id);
    //kontrola zadaneho mesta
    if(city !== "") {
        //mam zadane nejake mesto -> budeme zjistovat
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKEY + "&units=metric&lang=cs")
        .then(response => response.json())
        .then(data => {
            //tady bude zpracovani dat z API
        })
        .catch(error => {
            //sem to spadne, kdyz nebudu online
            div.innerHTML = "<p>Nastala chyba</p>";
        });
    } else {
        //nemam mesto -> nic nezjistujeme
        div.innerHTML = "<p>Zadej město</p>";
    }

}

function getCityTemp() {
    //stahneme zadane mesto
    const city = document.getElementById("input_city").value;
    //vypiseme informace o city do divu "city"
    getTemp(city, "city");
}