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
            if(data.cod === 200) {
                //prisla data a jsou ok -> je v nich pocasi
                //stahneme data
                const temp = data.main.temp;
                const press = data.main.pressure;
                const hum = data.main.humidity;
                const icon = data.weather[0].icon;
                //toto je v sec
                const sunrise = data.sys.sunrise;
                //toto chce mili-sec
                const sunrise_date = new Date(sunrise * 1000);
                const sunset = data.sys.sunset;
                const sunset_date = new Date(sunset * 1000);

                //slepime html do divu
                div.innerHTML = "<h3>" + city + "</h3>";
                div.innerHTML += "<p> <img src='https://openweathermap.org/img/wn/" + icon + ".png' /> </p>";
                div.innerHTML += "<p>Teplota: " + temp + " °C</p>";
                div.innerHTML += "<p>Tlak: " + press + " hPa</p>";
                div.innerHTML += "<p>Vlhkost: " + hum + " %</p>";
                div.innerHTML += "<p>Slunce vyjde v: " + 
                    sunrise_date.getHours().toString().padStart(2, "0") + ":" + 
                    sunrise_date.getMinutes().toString().padStart(2, "0") + "</p>";
                div.innerHTML += "<p>Slunce zapadne v: " + 
                    sunset_date.getHours().toString().padStart(2, "0") + ":" + 
                    sunset_date.getMinutes().toString().padStart(2, "0") + "</p>";
            } else {
                //sice prisla data, ale je v nich nejaka chyba
                div.innerHTML = "<p>Chyba: " + data.message + "</p>";
            }
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

window.onload = function() {
    getTemp("Dobronín", "dobronin");
}