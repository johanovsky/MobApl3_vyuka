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

function pocitej() {
    //stahneme operandy do konstant
    const op1 = parseFloat(document.getElementById("operand1").value);
    const op2 = parseFloat(document.getElementById("operand2").value);
    //stahneme si i operaci do konstanty
    const oper = document.getElementById("operace").value;

    //promenna pro vysledek
    let vysledek;

    //kontrolni vypis
    console.log("op1: " + op1);
    console.log("op2: " + op2);

    //kontrola cisel
    if((isNaN(op1)) || (isNaN(op2))) {
        //nemam dve platna cisla
        vysledek = "Zadej platná čísla";
    } else if ((op2 === 0) && (oper === "divide")) {
        //pokus o deleni nulou
        vysledek = "Delit nulou nelze";
    } else {
        //mam dve platna cisla a neni to deleni 0
        switch(oper) {
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
                vysledek = "Neznama operace";
                break;
        }
    }

    //vypiseme vysledek
    document.getElementById("vysledek").innerText = vysledek;
}