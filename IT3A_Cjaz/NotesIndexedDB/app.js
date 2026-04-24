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

window.onload = async function() {
    //init DB
    await initDB();

    //nacteme vsechny poznamky z DB
    const notes = await getAllNotes();

    //najdeme div pro vypis
    const div = document.getElementById("notes_list");

    //kdyz nic nemame
    if(notes.length === 0) {
        //nemam poznamky, pouze smutny vypis
        div.innerText = "Nemáte žádné poznámky";
        //konec funkce
        return;       
    }   

    //kdyz to dojde sem, tak mame alespon jednu poznamku
    //vytvorime html seznam se jmeny poznamek
    let seznamPoznamek = "<ul>\n";

    for(let i = 0; i < notes.length; i++) {
        //vytahneme si jmeno a id poznamky
        const note_id = notes[i].id;
        const note_name = notes[i].name;

        seznamPoznamek += "<li><a href='detail.html?id=" + note_id + "'>" + note_name + "</a></li>\n";
    }

    seznamPoznamek += "</ul>\n";
    
    //seznam vlozime jako html do divu
    div.innerHTML = seznamPoznamek;
}