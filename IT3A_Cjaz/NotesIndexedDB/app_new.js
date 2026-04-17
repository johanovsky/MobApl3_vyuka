window.onload = async function() {
    //init DB
    await initDB();
}

async function add_note() {
    //stahneme data
    const name = document.getElementById("note_name").value;
    const text = document.getElementById("note_text").value;
    const tag = document.getElementById("note_tag").value;

    //zavolame funkci z db.js ktera prida zaznam do DB
    await addNote(name, text, tag);
}