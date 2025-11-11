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

//komponenty z UI
const numberInput = document.getElementById("cislo");
const resultDiv = document.getElementById("vysledek");
const playBtn = document.getElementById("tlacitko");

//promenne pro hru
let secretNumber;
let tryCount;

function reset() {
    //vynulujeme pocet pokusu
    tryCount = 0;
    //vygenerujeme nove tajne cislo
    secretNumber = Math.floor(Math.random() * 20) + 1;
    //kontrolni vypis
    console.log("Nove tajne cislo: " + secretNumber);
    //do vystupniho divu dame prvni hlasku
    resultDiv.innerText = "Zadej svůj odhad";
    //vratime napis na tlacitku na Hadat
    playBtn.innerText = "Hádat";
    //vymazeme posledni pokus z inputu
    numberInput.value = "";         
}

//spusteni kodu pri nacteni stranky
window.onload = function() {
    reset();
}

function hadej() {
    //kontrola jestli je to reset, nebo hra
    if(playBtn.innerText === "Reset") {
        //je to reset
        reset();
    } else {
        //neni to reset, je to hra
        //stahneme uzivateluv odhad
        const odhad = parseInt(numberInput.value);
        //kontrolni vypis
        console.log("Uzivateluv odhad je: " + odhad);
        //kontrola
        if(isNaN(odhad)) {
            //uzivatel nezadal cislo
            resultDiv.innerText = "Zadej cele cislo";
        } else {
            //uzivatel zadal cele cislo
            //zvysime pocet pokusu
            tryCount++;
            //vyhodnoceni
            if(odhad === secretNumber) {
                //vyhra
                resultDiv.innerHTML = "<p>Výborně, uhodl jsi tajné číslo: " + odhad + "</p>";
                resultDiv.innerHTML += "<p>Potřeboval jsi: " + tryCount + " pokusů</p>";
                //zmenime napis na tlacitku
                playBtn.innerText = "Reset";
            }  else {
                //chyba, jedeme dál
                resultDiv.innerHTML = "<p>Tvůj odhad: " + odhad + " není správný</p>";
                resultDiv.innerHTML += "<p>Hledané číslo je: " + ((odhad < secretNumber) ? "VYŠŠÍ" : "NIŽŠÍ") + "</p>";
                //vymazeme posledni pokus z inputu
                numberInput.value = "";
            }     
        }
    }
}