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

//pravdepodobnosti jednotlivych symbolu
let symb_che_prob = 33;
let symb_lem_prob = 34;
let symb_mel_prob = 33;

//promenne pro hru
let cur_bet = 10;
let cash = 1000;

//html kompomnenty z indexu
const cur_bet_span = document.getElementById("cur_bet_span");
const cur_bet_input = document.getElementById("cur_bet_input");
const result_div = document.getElementById("result_div");

//pole slotu pro symboly
const slots = document.querySelectorAll("div[class='slot']");

//po nacteni stranky
window.onload = function() {
    //nacteni akt. sazky ze sessionStorage
    cur_bet = sessionStorage.getItem("cur_bet");
    //kontrola
    if(cur_bet === null) {
        //nemame cur_bet -> default = 10;
        cur_bet = 10;
        //default ulozime do sessionStorage
        sessionStorage.setItem("cur_bet", cur_bet);
    }
    //ted uz urcite mame cur_bet, zobrazime ji
    console.log("Nactena akt. sazka: " + cur_bet);
    cur_bet_span.innerText = cur_bet;
    cur_bet_input.value = cur_bet;
}

//fukce pro nastaveni nove sazky
function changeBet() {
    //nacteme novou sazku
    let bet = parseInt(cur_bet_input.value);
    //kontrola sazky
    if((bet > 0) && (bet <= cash)) {
        //sazka je ok
        cur_bet = bet;
        //kontrolni vypis
        console.log("Sazka nastavena na: " + cur_bet);
        //nastavime to do UI
        cur_bet_span.innerText = cur_bet;
        cur_bet_input.value = cur_bet;
        //ulozime akt. sazku do sesionStorage
        sessionStorage.setItem("cur_bet", cur_bet);
    } else {
        //neplatna sazka
        alert("Neplatna sazka");
        //vratime do inputu puvodni (spravnou sazku)
        cur_bet_input.value = cur_bet;              
    }
}

//pomocna funkce pro generovani nah. cisel od min do max
function getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

//pomocna funkce pro pribrzdeni
function pockej(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//funkce pro jednu tocku
async function play() {
    //vymazeme div se starym vysledkem
    result_div.innerText = "";
    //kontrola jestli mame dostatek prostredku na dalsi tocku
    if(cur_bet <= cash) {
        //muzeme tocit
        //pole pro symboly
        let symbols = [0, 0, 0];
        
        //toto cele protocime 10x - just for feeling
        for(let j = 0; j < 10; j++) {
            //vylosujeme symboly
            for(let i = 0; i < 3; i++) {
                let rnd = getRandomNumber(0, 99);
                //kontrolni vypis cisla
                console.log("Nahodne cislo: " + rnd);
                //urcim podle pravdepodobnosti symbol
                if(rnd < symb_che_prob) {
                    //je to tresen
                    symbols[i] = "🍒";
                } else if(rnd < symb_che_prob + symb_lem_prob) {
                    //je to citron
                    symbols[i] = "🍋";
                } else {
                    //je to meloun
                    symbols[i] = "🍉";
                }
                //kontrolni vypis symbolu
                console.log("To odpovida: " + symbols[i]);
            }

            //vypiseme symboly do slotu
            for(let i = 0; i < 3; i++) {
                slots[i].innerText = symbols[i];
            }

            //pockame
            await pockej(250 + j * 50);
        }

        //mame dolosovano -> jdeme vyhodnotit hru
        if((symbols[0] === symbols[1]) && (symbols[1] === symbols[2])) {
            //vsechny symboly jsou stejne ->  vyhra
            console.log("Vyhra");
            //vypis do divu
            result_div.innerText = "VYHRA";
            //pricteme penize
            cash = Number(cash) + Number(5 * cur_bet);
        } else {
            //alespon jeden se lisi -> prohra
            console.log("Prohra");
            //vypis do divu
            result_div.innerText = "PROHRA";
            //odectu penize
            cash = Number(cash) - Number(cur_bet);
        }
        //do vysledneho divu vypisu zustatek
        result_div.innerText += " - aktualni zůstatek: " + cash;
    } else {
        //nemam penize
        result_div.innerText = "Nedostatek prostredku";
    }
}