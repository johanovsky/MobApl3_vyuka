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

function getTemp(city, div_id) {
    //vytvorime si konstantu s divem
    const div = document.getElementById(div_id);
    //kontrola
    if(city !== "") {
        //mam jmeno mesta -> budeme zjistovat
    } else {
        //nemam jmeno mesta -> konec
        div.innerHTML = "<p>Zadej město</p>";
    }
}

function getTemperature() {
    //stahneme uzivatelovo mesto
    const city = document.getElementById("input_city").value;
    //zavolam metodu ktera pro zadane mesto zjisti data
    getTemp(city, "city");
}
