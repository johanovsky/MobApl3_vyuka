//po nacteni stranky
window.onload = function() {
    //nacteme z localStorage cash
    let cash = localStorage.getItem("cash");
    //kontrola
    if(cash === null) {
        //sem bys se to nemelo dostat -> sichr je sichr
        //default -> 1000
        cash = 1000;
        //ulozime to do localStorage
        localStorage.setItem("cash", cash);
    }
    //mam nacteny cash
    console.log("Nacteny cash: " + cash);
    //vypiseme cash do spanu
    document.getElementById("cur_cash_span").innerText = cash;
}