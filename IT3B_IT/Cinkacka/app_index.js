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

//promenne pro hru

//pravdepodobnosti
let symb_lem_prob = 33;
let symb_che_prob = 34;
let symb_mel_prob = 33;

//sazka a hotovost
let cur_bet = 10;
let cash = 1000;

//stahneme z HTML prvky
const cur_bet_span = document.getElementById("cur_bet");
const cur_bet_input = document.getElementById("input_bet");
const result_div = document.getElementById("div_result");

//pole slotu
const slots = document.querySelectorAll("div[class='slot']");

//funkce pro nacteni stranky
window.onload = function() {
    //nacteme aktualni sazku
    cur_bet = sessionStorage.getItem("cur_bet");
    //kontrol
    if(cur_bet === null) {
        //nacteni se nezdarilo -> default 10
        cur_bet = 10;
        //a default ulozime do sessionStorage
        sessionStorage.setItem("cur_bet", cur_bet);
    }
    //zobrazime aktualni sazku
    console.log("Aktualni sazka: " + cur_bet);
    cur_bet_span.innerText = cur_bet;
    cur_bet_input.value = cur_bet;   
}

//funkce pro zmenu sazky
function change_bet() {
    //nactu hodnotu nove sazky z inputu
    let bet = parseInt(cur_bet_input.value);
    //kontrola sazky
    if((bet > 0) && (bet <= cash)) {
        //sazka je ok
        cur_bet = bet;
        //ulozime to do sessionStorage
        sessionStorage.setItem("cur_bet", cur_bet);
        //kontrolni vypis
        console.log("Sazka zmenena na: " + cur_bet);
        //aktualizujeme to ve spanu
        cur_bet_span.innerText = cur_bet;
        //aktualizujeme to v inputu
        cur_bet_input.value = cur_bet;
    } else {
        //neplatna sazka
        alert("Neplatna sazka");
        //nastavime do inputu puvodni sazku
        cur_bet_input.value = cur_bet;
    }
}