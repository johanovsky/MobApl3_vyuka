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

//konstanty pro UI prvky
const numberInput = document.getElementById("cislo");
const resultDiv = document.getElementById("vysledek");

//promenne pro hru
let secretNumber;
let tryCount;

function reset() {
    //vynulujeme pocet pokusu
    tryCount = 0;
    //vygenerujeme nove tajne cislo <1, 10>
    secretNumber = Math.floor(Math.random() * 10) + 1;
    //kontrolni vypis
    console.log("Nove tajne cislo je: " + secretNumber);
    //nastavime uvodni text do vysledkoveho divu
    resultDiv.innerText = "Zadej svůj odhad";
}

//pri obnoveni aplikace
window.onload = function() {
    reset();   
}

function hadej() {
    //stahneme si uzivateluv odhad
    const odhad = parseInt(numberInput.value);
    //kontrolni vypis
    console.log("Uzivateluv odhad: " + odhad);
    //kontrola vstupu
    if(isNaN(odhad)) {
        //uzivatel nezadal cislo
        resultDiv.innerText = "Neplatne cislo\nZadej svůj odhad";
    } else {
        //zvysime pocet pokusu
        tryCount++;
        //vyhodnoceni
        if(odhad === secretNumber) {
            //vyhra
            resultDiv.innerHTML = "<p>Výborně, uhodl jsi tajné číslo: " + odhad + "</p>";
            resultDiv.innerHTML += "<p>Potřeboval jsi: " + tryCount + " pokusů</p>";
        } else {
            //netrefil se, jedeme dal
            resultDiv.innerHTML = "<p>Tvůj odhad: " + odhad + " nebyl správný</p>";
            resultDiv.innerHTML += "<p>Hledané číslo je " + ((odhad < secretNumber) ? "VYŠŠÍ" : "NIŽŠÍ") + "</p>";
        }
    }
}