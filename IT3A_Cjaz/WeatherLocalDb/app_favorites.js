//po nacteni stranky
window.onload = async function() {
    //init DB
    await initDB();

    //nacteni mest
    const favCities = await getAllFavorites();

    //div pro vypis mest
    const cityDiv = document.getElementById("favorites");

    //kontrola na pocet zaznamu
    if(favCities.length === 0) {
        //smutny vypis
        cityDiv.innerHTML = "<p>Nemáš žádná oblíbená města</p>";
    } else {
        //mame alespon jedno mesto
        //promenna pro text
        let seznamMest = "";
        //for-cyklus
        for(let i = 0; i < favCities.length; i++) {
            const city = favCities[i].city;
            const id = favCities[i].id;
            seznamMest += "<p> <a href='index.html?city=" + city +"'>" + city + "</a>";
            seznamMest += " <button onclick='removeCity(" + id + ")'>smazat</button> </p>\n";
        }
        //mam slepeny string, vlozim ho do divu
        cityDiv.innerHTML = seznamMest;
    }
}

//funkce pro smazani zaznamu a refresh stranky
async function removeCity(id) {
    try {
        //smazeme mesto z DB
        await deleteFavorite(id);
        //refresh stranky
        location.reload();
    } catch(error) {
        console.log("Chyba pri mazani zaznamu: " + error);
    }
}