//vytahneme si inputy do konstant
const che_input = document.getElementById("che_input");
const lem_input = document.getElementById("lem_input");
const mel_input = document.getElementById("mel_input");

window.onload = function() {
    //stahneme pravd. ze session
    let che_prob = sessionStorage.getItem("che_prob");
    let lem_prob = sessionStorage.getItem("lem_prob");
    let mel_prob = sessionStorage.getItem("mel_prob");
    //kontrola
    if((che_prob === null) || (lem_prob === null) || (mel_prob === null)) {
        //alespon jedna chybi -> default 33/34/33
        che_prob = 33;
        lem_prob = 34;
        mel_prob = 33;
        //ulozime default do session
        sessionStorage.setItem("che_prob", che_prob);
        sessionStorage.setItem("lem_prob", lem_prob);
        sessionStorage.setItem("mel_prob", mel_prob);
    }
    //kontrolni vypis
    console.log("Nactene pravdepodobnosti: che: " + che_prob + " lem: " + lem_prob + 
        " mel: " + mel_prob);
    //predvyplnim to do inputu
    che_input.value = che_prob;
    lem_input.value = lem_prob;
    mel_input.value = mel_prob;
};

function saveSetup() {
    //stahneme nove pravdepodobnosti
    const new_che = parseInt(che_input.value);
    const new_lem = parseInt(lem_input.value);
    const new_mel = parseInt(mel_input.value);
    //kontrola
    if(((new_che + new_lem + new_mel) === 100) && 
        (new_che >= 0) && 
        (new_lem >= 0) && 
        (new_mel >= 0)) {
        //v poradku -> ulozime nove hodnoty do session
        sessionStorage.setItem("che_prob", new_che);
        sessionStorage.setItem("lem_prob", new_lem);
        sessionStorage.setItem("mel_prob", new_mel);
    } else {
        //neplatne zadani
        alert("Neplatne hodnoty");
        //vratime do inputu puv. hodnoty
        che_input.value = sessionStorage.getItem("che_prob");
        lem_input.value = sessionStorage.getItem("lem_prob");
        mel_input.value = sessionStorage.getItem("mel_prob");
    }

}