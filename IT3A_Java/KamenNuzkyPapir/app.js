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
    console.log(hrac);

    //TO DO...
}