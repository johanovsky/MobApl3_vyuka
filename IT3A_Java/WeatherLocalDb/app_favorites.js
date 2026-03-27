//pri nacteni stranky favorites
window.onload = async function () {
    try {
        //inicializace DB
        await initDB();

        //nacteme si mesta do kolekce
        const favorites = await getAllFavorites();

        //najdeme div pro vypis
        const favDiv = document.getElementById("favorites");

        //kontrola poctu mesto
        if(favorites.length === 0) {
            //nemam zatim zadne ulozene obl. mesto
            favDiv.innerHTML = "<p>Nemáte uložená žádná oblíbená města</p>";
        } else {
            //mam alespon jedno oblibene mesto
            //vytvorim si promennou na vypis
            let seznamMest = "";
            //projdeme kolekci a prepiseme do ni mesta
            //for-cyklus
            for(let i = 0; i < favorites.length; i++) {
                //stahnu si jmeno mesta
                const city = favorites[i].city;7
                //a id mesta do extra konstant
                const id = favorites[i].id;
                //vypisuju do HTML
                seznamMest += "<p> <a href='index.html?city=" + city + "'>" + city + "</a>";
                seznamMest += " <button onclick='removeCity(" + id + ")'>smazat</button> </p>\n";
            }
            //foreach
            /*
            favorites.forEach(item => {
                seznamMest += "<p>" + item.city + "</p>\n";
            });
            */
            //kdyz mam string slepeny, tak ho vlozim do divu
            favDiv.innerHTML = seznamMest;
        }
    } catch(error) {
        console.log("Nezdarilo se nacteni obl. mest");
    }
}

//mdtoda ktera zaridi smazani zaznamu z db a refresh stranky
async function removeCity(id) {
    try {
        //smazeme zaznam z DB
        await deleteFavorite(id);
        //refresh stranky
        location.reload();
    } catch(error) {
        console.log("Chyba pri mazani zaznamu: " + error);
    }
}