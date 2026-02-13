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

    //nacteni aktualniho zustatku
    cash = localStorage.getItem("cash");
    //kontrola 
    if(cash === null) {
        //nepovedl se nacist stary cash -> default 1000
        cash = 1000;
        //def. hodnotu ulozime do localStorage
        localStorage.setItem("cash", cash);
    }
    //kontrolni vypis
    console.log("Nacteny cash: " + cash);
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

//pomocna funkce pro nah. cislo
function getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

//pomocna funkce pro pribrzdeni
function pockej(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//funkce pro jednu tocku
async function play() {
    //vymazeme stary vypis vysledku
    result_div.innerText = "";
    //kontrola jestlin mam prostredky na dalsi tocku
    if(cur_bet <= cash) {
        //mam penize -> muzu tocit
        //pole symbolu
        let symbols = [0, 0, 0];

        //toto cele protocime 10x - just for feeling
        for(let j = 0; j < 10; j++) {
            //losujeme symboly
            for(let i = 0; i < 3; i++) {
                let rnd = getRandomNumber(0, 99);
                //kontrolni vypis
                console.log("Nah. cislo: " + rnd);
                //pridelime symboly
                if(rnd < che_prob) {
                    //jsou to tresne
                    symbols[i] = "🍒";
                } else if(rnd < che_prob + lem_prob) {
                    //je to citron
                    symbols[i] = "🍋";
                } else {
                    //je to meloun
                    symbols[i] = "🍉";
                }
                //kontrolni vypis obrazku
                console.log(" - coz odpovida: " + symbols[i]);
            }

            //vypiseme symboly do slotu
            for(let i = 0; i < 3; i++) {
                slots[i].innerText = symbols[i];
            }

            //chvilku pockej
            await pockej(250 + j * 50);
        }

        //vyhodnotime vysledek
        if((symbols[0] === symbols[1]) && (symbols[1] === symbols[2])) {
            //vsechny symboly jsou stejne -> vyhra
            console.log("Vyhra");
            result_div.innerText = "VYHRA";
            //prepocitame penize
            cash = Number(cash) + Number(5 * cur_bet);
        } else {
            //nejmene jeden symbol se lisi -> prohra
            console.log("Prohra");
            result_div.innerText = "PROHRA";
            //prepocitame penize
            cash = Number(cash) - Number(cur_bet);
        }
        //vypiseme akt. stav konta
        result_div.innerText += " - aktualni stav konta: " + cash;
        //aktualizujeme cash v localStorage
        localStorage.setItem("cash", cash);

    } else {
        //nemam penize
        result_div.innerText = "Nedostatek prostredku";
    }
}