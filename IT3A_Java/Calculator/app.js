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

function pocitej() {
    //stahneme do konstant operandy
    const op1 = parseFloat(document.getElementById("operand1").value);
    //kontrolni vypis
    console.log("OP1: " + op1);
    const op2 = parseFloat(document.getElementById("operand2").value);
    //kontrolni vypis
    console.log("OP2: " + op2);

    //stahneme do konstanty i operaci
    const operation = document.getElementById("operace").value;
    //kontrolni vypis
    console.log("OPERATION: " + operation);

    //promenna pro vysledek
    let vysledek;

    if(isNaN(op1) || isNaN(op2)) {
        //nejsou to platna cisla
        vysledek = "Zadej platna cisla";
    } else if((op2 === 0) && (operation === "divide")) {
        //deleni nulou
        vysledek = "Nelze delit nulou";
    } else {
        //budeme pocitat
        switch(operation) {
            case "add":
                vysledek = op1 + op2;
                break;
            case "subtract":
                vysledek = op1 - op2;
                break;
            case "multiply":
                vysledek = op1 * op2;
                break;
            case "divide":
                vysledek = op1 / op2;
                break;
            default:
                vysledek = "Neznámá operace";
                break;
        }
    }

    //vypiseme vysledek
    document.getElementById("div_vysledek").innerText = vysledek;   
}