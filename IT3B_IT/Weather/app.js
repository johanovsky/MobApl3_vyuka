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

if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            //mam souradnice -> stahnu si je do konstant
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            //kontrolni vypis
            console.log("lat: " + latitude + ", lon: " + longitude);
            //vypiseme pocasi do divu city
            getTempGeo(latitude, longitude, "city");
        },
        (error) => {
            console.log("Chyba pri ziskavani pozice - ", error);
        }
    );
} else {
    console.log("Geolokace neni v prohlizeci podporovana");
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
            //kontrola jestli prisla opravdu data s pocasim
            if(data.cod === 200) {
                //ano, odpoved je ok, jsou to data s pocasim
                //postahujeme si data ktera nas zajimaji
                const temp = data.main.temp;
                const press = data.main.pressure;
                const hum = data.main.humidity;
                const icon = data.weather[0].icon;
                //toto je v s
                const sunrise = data.sys.sunrise;
                //toto ocekava ms
                const sunrise_date = new Date(sunrise * 1000);
                const sunset = data.sys.sunset;
                const sunset_date = new Date(sunset * 1000);
                //odkud byla nactena data: false = online, true = z cache
                const cache = data.cached;

                //data vypiseme do pozadovaneho divu
                div.innerHTML = "<h3>" + city + "</h3>";
                if(cache === true) {
                    div.innerHTML += "<p>Data jsou z cache</p>";
                } else {
                    div.innerHTML += "<p>Data jsou z API</p>";
                }
                div.innerHTML += "<p> <img src='https://openweathermap.org/img/wn/" + icon + ".png' /> </p>";
                div.innerHTML += "<p>Teplota: " + temp + " °C</p>";
                div.innerHTML += "<p>Tlak: " + press + " hPa</p>";
                div.innerHTML += "<p>Vlhkost: " + hum + " %</p>";
                div.innerHTML += "<p>Slunce vychází v: " + 
                    sunrise_date.getHours().toString().padStart(2, 0) + ":" + 
                    sunrise_date.getMinutes().toString().padStart(2, 0) + "</p>";
                div.innerHTML += "<p>Slunce zapadá v: " + 
                    sunset_date.getHours().toString().padStart(2, 0) + ":" + 
                    sunset_date.getMinutes().toString().padStart(2, 0) + "</p>";

            } else {
                //sice prisla data, ale je to nejaka chyba
                div.innerHTML = "<p>Chyba: " + data.message + "</p>";
            }
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

function getTempGeo(lat, lon, div_id) {
    //vytahneme si div podle jeho id
    const div = document.getElementById(div_id);
    //budeme hledat podle polohy
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY + "&units=metric&lang=cs")
    .then(response => response.json())
    .then(data => {
        //tady bude zpracovani dat z API
        //kontrola jestli prisla opravdu data s pocasim
        if(data.cod === 200) {
            //ano, odpoved je ok, jsou to data s pocasim
            //postahujeme si data ktera nas zajimaji
            //navic potrebuju mesto
            const city = data.name;
            const temp = data.main.temp;
            const press = data.main.pressure;
            const hum = data.main.humidity;
            const icon = data.weather[0].icon;
            //toto je v s
            const sunrise = data.sys.sunrise;
            //toto ocekava ms
            const sunrise_date = new Date(sunrise * 1000);
            const sunset = data.sys.sunset;
            const sunset_date = new Date(sunset * 1000);

            //data vypiseme do pozadovaneho divu
            div.innerHTML = "<h3>" + city + "</h3>";
            div.innerHTML += "<p> <img src='https://openweathermap.org/img/wn/" + icon + ".png' /> </p>";
            div.innerHTML += "<p>Teplota: " + temp + " °C</p>";
            div.innerHTML += "<p>Tlak: " + press + " hPa</p>";
            div.innerHTML += "<p>Vlhkost: " + hum + " %</p>";
            div.innerHTML += "<p>Slunce vychází v: " + 
                sunrise_date.getHours().toString().padStart(2, 0) + ":" + 
                sunrise_date.getMinutes().toString().padStart(2, 0) + "</p>";
            div.innerHTML += "<p>Slunce zapadá v: " + 
                sunset_date.getHours().toString().padStart(2, 0) + ":" + 
                sunset_date.getMinutes().toString().padStart(2, 0) + "</p>";

        } else {
            //sice prisla data, ale je to nejaka chyba
            div.innerHTML = "<p>Chyba: " + data.message + "</p>";
        }
    })
    .catch(error => {
        //sem to spadne, kdyz nebudu online
        div.innerHTML = "<p>Nastala chyba</p>";
    });
}

function getCityTemp() {
    //stahneme zadane mesto
    const city = document.getElementById("input_city").value;
    //vypiseme informace o city do divu "city"
    getTemp(city, "city");
}

window.onload = function() {
    getTemp("Dobronín", "dobronin");
}