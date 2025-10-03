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

function hra() {
    //nalezeni vybraneho radio-buttonu
    const hrac = document.querySelector("input[name='hrac']:checked").value;
    //kontrolni vypis
    console.log("Hrac:" + hrac);
    //pocitac vybira nahodne
    const volby = ["Kámen", "Nůžky", "Papír"];
    const cpu = volby[Math.floor(Math.random() * volby.length)];
    //kontrolni vypis
    console.log("Cpu: " + cpu);
    //vypis volby cpu
    document.getElementById("cpu_div").innerText = cpu;

    //vyhodnoceni vysledku
    switch(hrac) {
        case "Kámen":
            switch(cpu) {
                case "Kámen":
                    document.getElementById("result_div").innerText = "REMÍZA";
                    break;
                case "Nůžky":
                    document.getElementById("result_div").innerText = "VÝHRA";
                    break;
                case "Papír":
                    document.getElementById("result_div").innerText = "PROHRA";
                    break;
            }
            break;
        case "Nůžky":
            switch(cpu) {
                case "Kámen":
                    document.getElementById("result_div").innerText = "PROHRA";
                    break;
                case "Nůžky":
                    document.getElementById("result_div").innerText = "REMÍZA";
                    break;
                case "Papír":
                    document.getElementById("result_div").innerText = "VÝHRA";
                    break;
            }
            break;
        case "Papír":
            switch(cpu) {
                case "Kámen":
                    document.getElementById("result_div").innerText = "VÝHRA";
                    break;
                case "Nůžky":
                    document.getElementById("result_div").innerText = "PROHRA";
                    break;
                case "Papír":
                    document.getElementById("result_div").innerText = "REMÍZA";
                    break;
            }
            break;       
    }   
}