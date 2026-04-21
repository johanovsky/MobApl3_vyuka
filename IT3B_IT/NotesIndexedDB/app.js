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

window.onload = async function() {
    try {
        //pripravime DB
        await initDB();

        //nacteni vsech poznamek
        const notes = await getAllNotes();

        //najdeme div pro vypis
        const div = document.getElementById("notes_list");

        //kontrola prazdneho seznamu
        if(notes.length === 0) {
            div.innerText = "Nemáte uložené žádné poznámky";
            //konec metody
            return;
        }

        //pripravime si html se seznamem
        let htmlSeznam = "<ul>\n";
        
        //do html nasypu jmena poznamek
        //for-cyklus
        for(let i = 0; i < notes.length; i++) {
            //vytahnu si jmeno poznamky
            const note_name = notes[i].name;
            //vytahnu si id poznamky
            const note_id = notes[i].id;
            //pridame radek do html
            htmlSeznam += "<li><a href='detail.html?id=" + note_id + "'>" + note_name + "</a></li>\n";
        }
        //ukoncime seznam
        htmlSeznam += "</ul>\n";
        //slepene html vlozim do divu
        div.innerHTML = htmlSeznam;
    } catch(error) {
        console.log("Chyba pri nacitani poznamek:" + error);
    }
};