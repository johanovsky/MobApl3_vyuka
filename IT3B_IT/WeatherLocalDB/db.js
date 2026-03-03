const DB_NAME = "weatherAppDB";
const DB_VERSION = 1;
const STORE_NAME = "favorites";
 
let db = null;
 
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
 
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if(!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        store.createIndex("city", "city", { unique: true });
      }
    };
 
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
 
    request.onerror = (event) => reject(event.target.error);
  });
}
 
function addFavorite(city) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add({ city });
    request.onsuccess = () => resolve(true);
    request.onerror = (event) => {
      if(event.target.error.name === "ConstraintError") resolve(false); // duplicitní město
      else reject(event.target.error);
    };
  });
}
 
function getAllFavorites() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}
 
// vystavíme funkce globálně, aby byly dostupné v app.js
window.initDB = initDB;
window.addFavorite = addFavorite;
window.getAllFavorites = getAllFavorites;