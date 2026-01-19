//vybereme vsechny radiobuttony
const radioButtons = document.querySelectorAll("input[name = 'color']");

//vsem vybranym radio-buttonum nastavime posluchace udalosti "zmena"
radioButtons.forEach(radio => {
    radio.addEventListener("change", vybranyRadioButton);
});

function vybranyRadioButton(event) {
    //kontrolni vypis - vypisu value vybraneho radio-buttonu
    console.log(event.target.value);
    //vybranou hodnotu ulozime do sessionStorage
    sessionStorage.setItem("color", event.target.value);
}

window.onload = function() {
    //zkusime nacist barvu ze sessionStorage
    let color = sessionStorage.getItem("color");
    if(color === null) {
        //stale nemame barvu -> def. volba bude red
        color = "red";
        //uloz to do sessionStorage
        sessionStorage.setItem("color", color);
    }

    //projdeme pole radio-buttonu
    for(let radio of radioButtons) {
        //tomu jehoz value se rovna nactene barve
        if(radio.value === color) {
            //nastav checked
            radio.checked = true;
        }
    }
}