//stahneme si do pole vsechny radio-buttony, ktere se jmenuji color
const radioButtons = document.querySelectorAll("input[name = 'color']");

//pomoci for-each projdeme vsechny radio-buutony
radioButtons.forEach(radio => {
    radio.addEventListener("change", radioVybran);
});

function radioVybran(event) {
    //kontrolni vypis
    console.log("Vybrana barva: " + event.target.value);
    //ulozime vybranou barvu do sessionStorage
    sessionStorage.setItem("color", event.target.value);
}

window.onload = function() {
    let color = sessionStorage.getItem("color");
    if(color === null) {
        color = "red";
        sessionStorage.setItem("color", color);
    }
    //mam nactenou ulozenou barvu
    //projdi vsechny radio-buttony
    for(let radio of radioButtons) {
        //ten jehoz hodnota se shoduje s ulozenou barvou
        if(radio.value === color) {
            //nastav na zaskrtnuty
            radio.checked = true;
        }
    }
}
