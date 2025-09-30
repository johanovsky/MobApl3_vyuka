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

function hraj() {
    //stazeni volby hrace
    //nalezeni vybraneho radiobuttonu
    const hrac = document.querySelector("input[name='hrac']:checked").value;
    //kontrolni vypis
    console.log("Hrac: " + hrac);
    //volba pocitace - nahoda
    //pole moznych voleb
    const volby = ["Kámen", "Nůžky", "Papír"];
    //nahodny vyber z pole
    const cpu = volby[Math.floor(Math.random() * volby.length)];
    console.log("CPU: " + cpu);
    //vypiseme volbu pocitace
    document.getElementById("cpu_div").innerText = cpu;
    
    //TODO vyhodnoceni
}