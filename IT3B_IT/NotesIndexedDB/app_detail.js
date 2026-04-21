window.onload = async function() {
    //init DB
    await initDB();
    //nacteni id z URL
    const paramsFromURL = new URLSearchParams(window.location.search);
    //vytahnu pouze id z parametru - a prevedu ze stringu na int
    const idFromURL = Number(paramsFromURL.get("id"));
    //jestlize mam id
    if(idFromURL !== null) {
        //mam id, budeme stahovat data z DB
        //stahnu zaznam z DB
        const note = await getNoteById(idFromURL);
        //kontrola jestli takovy zaznam existuje
        if(note !== null) {
            //mam poznamku -> budu ji zobrazovat v divech
            document.getElementById("note_id").innerText = note.id;
            document.getElementById("note_name").innerText = note.name;
            document.getElementById("note_text").innerText = note.text;
            document.getElementById("note_tag").innerText = note.tag;
        } else {
            alert("zaznam neexistuje");
            //redirect na index
            window.location.href("index.html");
        }
    } else {
        //nemam id -> redirect na index
        window.location.href("index.html");
    }
};

async function delete_note() {
    //stahnu si id z divu
    const note_id = Number(document.getElementById("note_id").innerText);
    //zavolam funkci pro smazani z DB
    await deleteNote(note_id);
    //redirect na index
    window.location.href = "index.html";
}