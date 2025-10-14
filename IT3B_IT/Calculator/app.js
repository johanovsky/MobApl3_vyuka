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

function pocitej() {
    //konstanty pro operandy
    const op1 = parseFloat(document.getElementById("operand1").value);
    const op2 = parseFloat(document.getElementById("operand2").value);
    //konstanta pro operaci
    const oper = document.getElementById("operace").value;

    //promenna pro vysledek
    let vysledek;

    if(isNaN(op1) || (isNaN(op2))) {
        vysledek = "Zadej dvě platná čísla";        
    } else if((op2 === 0) && (oper === "divide")) {
        vysledek = "Nelze dělit nulou";
    } else {
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
                vysledek = "Neznámá operace";
                break;
        }
    }

    //zobrazime vysledek
    document.getElementById("vysledek").innerText = vysledek;
}
