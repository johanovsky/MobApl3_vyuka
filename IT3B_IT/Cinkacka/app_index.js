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
    //kontrola
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
    
    
    //nacteme aktualni cash
    cash = localStorage.getItem("cash");
    //kontrola
    if(cash === null) {
        //nacteni se nezdarilo -> default 1000
        cash = 1000;
        //a default ulozime do localStorage
        localStorage.setItem("cash", cash);
    }
    //predelam cash na cislo
    cash = Number(cash);
    //kontrolni vypis
    console.log("Aktualni cash: " + cash);
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

//funkce pro generovani nah. cisla od min do max
function getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

//zpozdovaci funkce
function pockej(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//funkce pro jednu tocku
async function play() {
    //vycistime div s vysledkem
    result_div.innerText = "";
    //kontrola jestli mam dost prostredku na tocku
    if(cur_bet <= cash) {
        //mam dost penez -> muzu tocit
        //pole pro symboly
        let symbols = [0, 0, 0];

        //10x protocime generovani -> just for feeling
        for(let j = 0; j < 10; j++) {
            //vylosujeme symboly
            for(let i = 0; i < 3; i++) {
                let rnd = getRandomNumber(0, 99);
                //kontrolni vypis
                console.log("Nahodne cislo: " + rnd);
                //obrazky
                if(rnd < symb_lem_prob) {
                    //win + . vyvola nabidku emoji
                    //je to citron
                    symbols[i] = "🍋";
                } else if(rnd < (symb_lem_prob + symb_che_prob)) {
                    //jsou to tresne
                    symbols[i] = "🍒";
                } else {
                    //musi to byt meloun
                    symbols[i] = "🍉";
                }
                //kontrolni vypis obrazku
                console.log("Nah. cislo odpovida: " + symbols[i]);
                //vypiseme obrazek do slotu
                slots[i].innerText = symbols[i];
            }
            //pribrzdime
            await pockej(250 + j * 50);
        }

        //tady mame vysledny stav -> vyhodnotime
        if((symbols[0] === symbols[1]) && (symbols[1] === symbols[2])) {
            //vsechny symboly jsou stejne -> vyhra
            cash = cash + (5 * cur_bet);
            result_div.innerText = "VYHRA";
        } else {
            //symboly nejsou stejne
            cash = cash - cur_bet;
            result_div.innerText = "PROHRA";
        }
        //aktualizuju cash v localStorage
        localStorage.setItem("cash", cash);
        //vzdy vypisu zustatek
        result_div.innerText += " - aktualni stav konta: " + cash;
    } else {
        //nemam penize -> nelze
        result_div.innerText = "Nedostatek prostredku";
    }
}