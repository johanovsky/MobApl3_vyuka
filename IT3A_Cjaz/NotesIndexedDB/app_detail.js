window.onload = async function() {
    //init DB
    await initDB();

    //stahneme vsechna data z URL
    const paramsFromURL = new URLSearchParams(window.location.search);
    //ze vsech dat nas zajima je id - prevedu na cislo
    const idFromURL = Number(paramsFromURL.get("id"));

    //kontrola
    if(idFromURL !== null) {
        //mam id budu zobrazovat
        //stahneme zaznam z DB
        const note = await getNoteById(idFromURL);

        //kontrola
        if(note !== null) {
            //poznamka existuje ->vypiseme ji do divu
            document.getElementById("note_id").innerText = note.id;
            document.getElementById("note_name").innerText = note.name;
            document.getElementById("note_text").innerText = note.text;
            document.getElementById("note_tag").innerText = note.tag;
        }
    } else {
        //nemam id, neni co zobrazovat
        //redirect na index
        window.location.href = "index.html";
    }

};

async function delete_note() {
    //z divu si stahnu id mazane poznamky
    const note_id = Number(document.getElementById("note_id").innerText);
    //smazu zaznam
    await deleteNote(note_id);
    //redirect na index
    window.location.href = "index.html";
}