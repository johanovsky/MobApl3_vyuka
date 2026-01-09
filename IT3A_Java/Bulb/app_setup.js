//najdeme vsechny radio-buttony
const radioButtons = document.querySelectorAll("input[name = 'color']");

//vsem radio-buttonum v poli nastavime funkci, ktera se ma spustit pri jejich zmene
radioButtons.forEach(radio => {
    radio.addEventListener("change", ulozBarvu);
})

//funkce pro ulozeni barvy
function ulozBarvu(event) {
    //kontrolni vypis do konzole
    console.log("Vybrana barva: ", event.target.value);
    //ulozime vybranou hodnotu do session storage
    sessionStorage.setItem("color", event.target.value);
}

//po nacteni stranky
window.onload = function() {
    //zkusime nacist barvu
    let color = sessionStorage.getItem("color");
    //nactena barva
    console.log("Nactena barva: " + color);
    //co kdyz nemam barvu
    if(color === null) {
        //def. volba je red
        color = "red";
        //uloz. do sessionStorage
        sessionStorage.setItem("color", "red");
    }
    //mam barvu
    //nastavime checked u radio-buttonu jehoz value odpovida tomu co jsem nacetl
    //projdi vsechny radio buttony
    for(let radio of radioButtons) {
        //pokud se nekteremu jeho value rovna nactene barve
        if(radio.value === color) {
            //tak ho zatrhni
            radio.checked = true;
        }
    }
}