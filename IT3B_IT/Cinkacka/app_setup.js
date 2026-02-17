//potrebuji tri inputy do konstant
const symb_che_prob_input = document.getElementById("input_che_prob");
const symb_lem_prob_input = document.getElementById("input_lem_prob");
const symb_mel_prob_input = document.getElementById("input_mel_prob");

//po nacteni stranky
window.onload = function() {
    //stahneme vsechny pravdepodobnosti z sessionStorage
    let che_prob = sessionStorage.getItem("prob_che");
    let lem_prob = sessionStorage.getItem("prob_lem");
    let mel_prob = sessionStorage.getItem("prob_mel");

    if((che_prob === null) || (lem_prob === null) || (mel_prob === null)) {
        //nejmene jedna chybi -> default 33/34/33
        che_prob = 33;
        lem_prob = 34;
        mel_prob = 33;
        //vsechno aktualizuji v sessionStorage
        sessionStorage.setItem("prob_che", che_prob);
        sessionStorage.setItem("prob_lem", lem_prob);
        sessionStorage.setItem("prob_mel", mel_prob);
    }

    //mam jednotlive pravdepodobnosti -> zobrazim je v inputech
    symb_che_prob_input.value = che_prob;
    symb_lem_prob_input.value = lem_prob;
    symb_mel_prob_input.value = mel_prob;
};

function save_setup() {
    //nacteme nove pravdepodobnosti
    const new_che = parseInt(symb_che_prob_input.value);
    const new_lem = parseInt(symb_lem_prob_input.value);
    const new_mel = parseInt(symb_mel_prob_input.value);
    //kontrola
    //1. soucet == 100
    //2. kazda jednotliva prav. je 0 a vice
    if((new_che + new_lem + new_mel === 100) && 
        (new_che >= 0) && 
        (new_lem >= 0) &&
        (new_mel >= 0)) {
        //pravdepodobnosti v poradku -> ulozime je do session
        sessionStorage.setItem("prob_che", new_che);
        sessionStorage.setItem("prob_lem", new_lem);
        sessionStorage.setItem("prob_mel", new_mel);
    } else {
        alert("Neplatne zadani");       
    }
    //zobrazime nove / puvodni hodnoty
    symb_che_prob_input.value = sessionStorage.getItem("prob_che");
    symb_lem_prob_input.value = sessionStorage.getItem("prob_lem");
    symb_mel_prob_input.value = sessionStorage.getItem("prob_mel");
}