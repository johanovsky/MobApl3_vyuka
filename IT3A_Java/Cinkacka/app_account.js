window.onload = function() {
    //nacteme cash z localStorage
    let cash = localStorage.getItem("cash");
    //kontrola
    if(cash === null) {
        cash = 1000;
        localStorage.setItem("cash", cash);
    }
    //zobrazime cash ve spanu
    document.getElementById("cur_cash_span").innerText = cash;
};

function resetCash() {
    localStorage.setItem("cash", 1000);
    console.log("Cash zresetovan na 1000");
    document.getElementById("cur_cash_span").innerText = localStorage.getItem("cash");
    alert("Prostredky resetovany na 1000");
}