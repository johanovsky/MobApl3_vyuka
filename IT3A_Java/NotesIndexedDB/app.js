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

window.onload = async function() {
    //priprava DB
    await initDB();

    //nacteni a vypis vsech poznamek

    //vytahnu si div pro vypis
    const div = document.getElementById("notes_list");

    //nacteme poznamky z DB
    const notes = await getAllNotes();

    //kontrola jestli mam nejakou poznamku ulozenou
    if(notes.length === 0) {
        //nemam nic ulozeno
        div.innerText = "Nemáme uloženou žádnou poznámku";
        //konec
        return;
    }
    
    //vytvorime seznam pro jmena poznamek
    let seznamPoznamek = "<ul>";
    
    //nasypeme do seznamu jmena poznamek
    for(let i = 0; i < notes.length; i++) {
        const note_name = notes[i].name;
        const note_id = notes[i].id;
        seznamPoznamek += "<li><a href='detail.html?id=" + note_id + "'>" + note_name + "</a></li>";       
    }

    //uzavreme seznam
    seznamPoznamek += "</ul>";
    //vlozime slepeny seznam jako HTML do divu
    div.innerHTML = seznamPoznamek;
}