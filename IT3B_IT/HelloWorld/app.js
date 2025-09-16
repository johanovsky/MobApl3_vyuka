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

function sayHello() {
    if(document.getElementById("hello").innerText === "Hello world") {
        document.getElementById("hello").innerText = "Ahoj světe";
    } else {
        document.getElementById("hello").innerText = "Hello world";
    }
}