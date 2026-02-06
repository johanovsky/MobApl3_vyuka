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

//promenne pro hru

//pravdepodobnosti 
let che_prob = 33;
let lem_prob = 34;
let mel_prob = 33;

//konto a sazka
let cur_bet = 10;
let cash = 1000;

//html prvky
const cur_bet_span = document.getElementById("cur_bet_span");
const cur_bet_input = document.getElementById("cur_bet_input");
const result_div = document.getElementById("result_div");

//jeste pole slotu
const slots = document.querySelectorAll("div[class='slot']");

//funkce po nacteni stranky
window.onload = function() {
    //nacteni akt. sazky
    cur_bet = sessionStorage.getItem("cur_bet");
    //kontrolni vypis
    console.log("Nactena akt. sazka: " + cur_bet);
    //kontrola 
    if(cur_bet === null) {
        //nemam nactenou akt. sazku -> deafult = 10
        cur_bet = 10;
        sessionStorage.setItem("cur_bet", cur_bet);
        console.log("Aktualni sazka nastavena na deafult: " + cur_bet);
    }
    //doplnim to do stranky
    cur_bet_span.innerText = cur_bet;
    cur_bet_input.value = cur_bet;
}

//funkce pro zmenu akt. sazky
function changeBet() {
    //nacteme novou sazku
    let bet = parseInt(cur_bet_input.value);
    //kontrola 
    if((bet > 0) && (bet <= cash)) {
        //sazka je ok
        cur_bet = bet;
        //aktualni sazku ulozime do sessionStorage
        sessionStorage.setItem("cur_bet", cur_bet);
        //prepisu to ve spanu
        cur_bet_span.innerText = cur_bet;
        //prepisu to i v inputu
        cur_bet_input.value = cur_bet;
        //kontrolni vypis
        console.log("Sazka nastavena na: " + cur_bet);
    } else {
        //nova sazka neni ok
        alert("Neplatna sazka");
        //do inputu vratime puvodni sazku
        cur_bet_input.value = cur_bet;
    }
}