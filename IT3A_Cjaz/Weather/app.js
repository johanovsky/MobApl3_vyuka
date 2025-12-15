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

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            //mam souradnice / oriznu je na 4 des. mista
            const latitude = position.coords.latitude.toFixed(4);
            const longitude = position.coords.longitude.toFixed(4);
            //kontrolni vypis
            console.log("lat: " + latitude + ", lon: " + longitude);
            //vypise teplotu do divu
            getTempCoords(latitude, longitude, "city");
        }, (err) => {
            //nemam souradnice
            console.log("Chyba pri stahovani souradnic, ", err);
        }
    );
} else {
    console.log("Geolocation neni v prohlizeci k dispozici");
}

//api klic pro pristup k OpenWeatherMap
const API_KEY = "ef4dab04b610b4fc6318e3a5a222fdbd";

function getTemp(city, div_id) {
    //vytvorime si konstantu s divem
    const div = document.getElementById(div_id);
    //kontrola
    if(city !== "") {
        //mam jmeno mesta -> budeme zjistovat
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=metric&lang=cs")
        .then(response => response.json())
        .then(data => {
            //prisla nejaka odpoved
            //zkontrolujeme kod odpovedi
            if(data.cod === 200) {
                //odpoved je ok, opravdu prislo pocasi
                //stahneme teplotu
                const temp = data.main.temp;
                //stahneme tlak
                const press = data.main.pressure;
                //jeste vlhkost
                const hum = data.main.humidity;

                //stahneme obrazek
                const icon = data.weather[0].icon;

                //stahneme cas vychodu a zapadu slunce
                //toto je v sec
                const sunrise = data.sys.sunrise;
                const sunset = data.sys.sunset;

                //vytvorime instance tridy datum
                //toto ocekava milisec.
                const sunrise_date = new Date(sunrise * 1000);
                const sunset_date = new Date(sunset * 1000);

                //zjistime jestli prisla data online, nebo z cache
                const cache = data.cached;

                //jdeme "lepit" vystup
                div.innerHTML = "<h3>" + city + "</h3>";
                if(cache === true) {
                    div.innerHTML += "<p>Pozor, data nejsou aktualni, byla nactena z cache</p>";
                } else {
                    div.innerHTML += "<p>Data jsou aktualni</p>";
                }
                div.innerHTML += "<p> <img src='https://openweathermap.org/img/wn/" + icon + ".png' /></p>";
                div.innerHTML += "<p>Teplota: " + temp + " °C</p>" ;
                div.innerHTML += "<p>Tlak: " + press + " hPa</p>";
                div.innerHTML += "<p>Vlhkost: " + hum + " %</p>";
                div.innerHTML += "<p>Slunce vychází v: " + sunrise_date.getHours().toString().padStart(2, "0") + ":" + sunrise_date.getMinutes().toString().padStart(2, "0") + "</p>";
                div.innerHTML += "<p>Slunce zapadá v: " + sunset_date.getHours().toString().padStart(2, "0") + ":" + sunset_date.getMinutes().toString().padStart(2, "0") + "</p>";

            } else {
                //sice mame odpoved, ale nejsou tam data o pocasi
                div.innerHTML = "<p>Chyba: " + data.message + "</p>";
            }
        })
        .catch(error => {
            //sem to spadne, typicky kdyz nebudu online -> neprisla odpoved
            div.innerHTML = "<p>Nejsi online</p>";
        });
    } else {
        //nemam jmeno mesta -> konec
        div.innerHTML = "<p>Zadej město</p>";
    }
}

function getTempCoords(lat, lon, div_id) {
    //vytvorime si konstantu s divem
    const div = document.getElementById(div_id);
    //mam lon a lat -> budeme zjistovat
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric&lang=cs")
    .then(response => response.json())
    .then(data => {
        //prisla nejaka odpoved
        //zkontrolujeme kod odpovedi
        if(data.cod === 200) {
            //odpoved je ok, opravdu prislo pocasi
            //stahneme mesto
            const city = data.name;
            //stahneme teplotu
            const temp = data.main.temp;
            //stahneme tlak
            const press = data.main.pressure;
            //jeste vlhkost
            const hum = data.main.humidity;

            //stahneme obrazek
            const icon = data.weather[0].icon;

            //stahneme cas vychodu a zapadu slunce
            //toto je v sec
            const sunrise = data.sys.sunrise;
            const sunset = data.sys.sunset;

            //vytvorime instance tridy datum
            //toto ocekava milisec.
            const sunrise_date = new Date(sunrise * 1000);
            const sunset_date = new Date(sunset * 1000);

            //jdeme "lepit" vystup
            div.innerHTML = "<h3>" + city + "</h3>";
            div.innerHTML += "<p> <img src='https://openweathermap.org/img/wn/" + icon + ".png' /></p>";
            div.innerHTML += "<p>Teplota: " + temp + " °C</p>" ;
            div.innerHTML += "<p>Tlak: " + press + " hPa</p>";
            div.innerHTML += "<p>Vlhkost: " + hum + " %</p>";
            div.innerHTML += "<p>Slunce vychází v: " + sunrise_date.getHours().toString().padStart(2, "0") + ":" + sunrise_date.getMinutes().toString().padStart(2, "0") + "</p>";
            div.innerHTML += "<p>Slunce zapadá v: " + sunset_date.getHours().toString().padStart(2, "0") + ":" + sunset_date.getMinutes().toString().padStart(2, "0") + "</p>";

        } else {
            //sice mame odpoved, ale nejsou tam data o pocasi
            div.innerHTML = "<p>Chyba: " + data.message + "</p>";
        }
    })
    .catch(error => {
        //sem to spadne, typicky kdyz nebudu online -> neprisla odpoved
        div.innerHTML = "<p>Nejsi online</p>";
    });
}

function getTemperature() {
    //stahneme uzivatelovo mesto
    const city = document.getElementById("input_city").value;
    //zavolam metodu ktera pro zadane mesto zjisti data
    getTemp(city, "city");
}

window.onload = function() {
    getTemp("Dobronín", "dobronin");
}