window.onload = async function() {
    //pripravime DB
    await initDB();
}

async function add_note() {
    //stahneme data z inputu
    const name = document.getElementById("note_name").value;
    const text = document.getElementById("note_text").value;
    const tag = document.getElementById("note_tag").value;

    //zavolame funkci z DB pro ulozeni zaznamu a ulozime si jeji vysledek
    const result = await addNote(name, text, tag);

    //v pripade uspesneho ulozeni zaznamu
    if(result === true) {
        //pridani se povedlo
        alert("Poznamka pridana");
        //presmeruji zpet na index
        window.location.href = "index.html";
    }
}