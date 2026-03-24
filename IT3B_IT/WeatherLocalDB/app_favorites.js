//pri nacteni stranky
window.onload = async function() {
    //init databaze
    await initDB();

    //nacteni mest do kolekce
    const favorites = await getAllFavorites();
    //najdeme div pro vypis
    const divFav = document.getElementById("favorites");

    //kdyz nemame ulozena zadna mesta
    if(favorites.length === 0) {
        //smutny odstavec
        divFav.innerHTML = "<p>Nemáte žádná uložená města</p>";
    } else {
        //mam alespon jedno mesto
        let seznam = "";
        //for-cyklus
        for(let i = 0; i < favorites.length; i++) {
            //vytahnu ze zaznamu id
            const id = favorites[i].id;
            //vytahnu ze zaznamu mesto
            const city = favorites[i].city;
            //aktualni mesto vypiseme jako link
            seznam += "<p> <a href='index.html?city=" + city + "'>" + city + "</a>";
            seznam += " <button onclick='removeCity(" + id + ")'>smazat</button> </p>\n";

        }
        //vlozime "slepene" html do divu
        divFav.innerHTML = seznam;
    }
}

//funkce pro smazani zaznamu z DB
async function removeCity(id) {
    try {
        //zavola funkci z db.js
        await deleteFavorite(id);
        //reload stranky
        location.reload();
    } catch (error) {
        console.log("Chyba pri mazani: " + error);       
    }
}