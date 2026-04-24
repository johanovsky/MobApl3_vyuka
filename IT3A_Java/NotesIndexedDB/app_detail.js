window.onload = async function() {
    //init DB
    await initDB();

    //nacteme vsechna data z URL
    const paramsFromURL = new URLSearchParams(window.location.search);
    //ze vsech dat nas zajima jen id (prevedeme na cislo)
    const idFromURL = Number(paramsFromURL.get("id"));

    //kontrola
    if(idFromURL !== null) {
        //mame id, budeme zobrazovat data
        //stahneme data z DB
        const note = await getNoteById(idFromURL);

        //kontrola
        if(note !== null) {
            //prekydame data do divu
            document.getElementById("note_id").innerText = note.id;
            document.getElementById("note_name").innerText = note.name;
            document.getElementById("note_text").innerText = note.text;
            document.getElementById("note_tag").innerText = note.tag;
        }
    } else {
        //nemame id -> neni co zobrazit
        //redirect na index
        window.location.href = "index.html";
    }
}

async function delete_note() {
    //stahnu si id z divu
    const note_id = Number(document.getElementById("note_id").innerText);
    //smazu zaznam
    await deleteNote(note_id);
    //redirect na index
    window.location.href = "index.html";
}