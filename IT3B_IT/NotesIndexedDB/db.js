const DB_NAME = "NotesAppDB";
const DB_VERSION = 1;
const STORE_NAME = "notes";
 
let db = null;
 
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
 
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if(!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        //sloupec podle ktereho chceme radit musi byt index
        store.createIndex("name", "name", { unique: true });
        store.createIndex("tag", "tag", { unique: false });
      }
    };
 
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
 
    request.onerror = (event) => reject(event.target.error);
  });
}
 
function addNote(name, text, tag) {
  return new Promise((resolve, reject) => {

    //kontrola
    if(!name || name.trim() === "") {
        //nevyplnene jmeno -> chyba
        alert("Vypln nazev poznamky");
        resolve(false);
        return;
    }

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    //vytvorime objekt: poznamka
    const note = {
        name: name.trim(),
        text: text.trim() || "",
        tag: tag.trim() || ""
    };

    const request = store.add(note);

    request.onsuccess = () => resolve(true);

    request.onerror = (event) => {
      if(event.target.error.name === "ConstraintError") {
        alert("Duplicitni nazev");
        resolve(false); // duplicitní město
      }
      else reject(event.target.error);
    };
  });
}

/* odtud jeste neupraveno */

function getAllFavorites() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    //razeni v indexedDB
    const sorted = store.index("city"); //serazeni podle hodnoty city
    const request = sorted.getAll();  //vytazeni serazenych dat

    //const request = store.getAll(); //neserazena data
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

function deleteFavorite(id) {
  return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = (event) => reject(event.target.error);
  });
}
 
// vystavíme funkce globálně, aby byly dostupné v app.js
window.initDB = initDB;
window.addNote = addNote;

window.getAllFavorites = getAllFavorites;
window.deleteFavorite = deleteFavorite;