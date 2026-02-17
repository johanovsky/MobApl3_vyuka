//po nacteni stranky
window.onload = function() {
    //pokusime se z localStorage stahnout cash
    let cash = localStorage.getItem("cash");
    //co kdyz nemam cash
    if(cash === null) {
        //default -> 1000
        cash = 1000;
        //ulozit do localStorage
        localStorage.setItem("cash", cash);
    }
    //kontrolni vypis
    console.log("Nacteny cash: " + cash);
    //zobrazime ve spanu
    document.getElementById("cur_cash").innerText = cash;
};

//resetovaci metoda
function reset_cash() {
    //preulozime cash v localStorage
    localStorage.setItem("cash", 1000);
    //kontrolni vypis
    console.log("Cash resetovan na 1000");
    //vypis do spanu
    document.getElementById("cur_cash").innerText = localStorage.getItem("cash");
}