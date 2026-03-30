window.onload = function(){
    document.getElementById("historyOverlay").style.display = "none";
}

/* MENU */
document.getElementById("historyOverlay").onclick = function(e){
    if(e.target.id === "historyOverlay"){
        closeHistory();
    }
}

let menu = document.getElementById("menu");

function toggleMenu(){
    menu.style.display =
        menu.style.display === "flex" ? "none" : "flex";
}

/* DARK MODE */

function toggleDark(){
    document.body.classList.toggle("dark");
}

/* DISPLAY */

let display = document.getElementById("display");

/* HISTORY LOAD */

/* HISTORY LOAD SAFE */

let history = [];

try{
    history = JSON.parse(localStorage.getItem("calcHistory")) || [];
}catch{
    history = [];
}

/* PRESS BUTTON */

function press(val){
    display.value += val;
}

/* CLEAR DISPLAY */

function clearDisplay(){
    display.value = "";
}

/* DELETE LAST */

function del(){
    display.value = display.value.slice(0,-1);
}

/* CALCULATE + SAVE HISTORY */

function calculate(){

    try{

        let expression = display.value;
        let result = eval(expression);

        history.push(expression + " = " + result);

        localStorage.setItem(
            "calcHistory",
            JSON.stringify(history)
        );

        display.value = result;

    }catch{

        display.value = "Error";

    }

}

/* SHOW HISTORY */
function showHistory(){

let overlay = document.getElementById("historyOverlay");
let list = document.getElementById("historyList");

list.innerHTML = "";

if(history.length === 0){
list.innerHTML = "<p>No History</p>";
}else{

history.forEach(item => {

let div = document.createElement("div");
div.className = "history-item";
div.innerText = item;

div.onclick = function(){
let exp = item.split("=")[0].trim();
display.value = exp;
closeHistory();
};

list.appendChild(div);

});

}

overlay.style.display = "flex";

}

function closeHistory(){
document.getElementById("historyOverlay").style.display = "none";
}
function clearHistory(){

    history = [];
    localStorage.removeItem("calcHistory");
    alert("History Cleared");

}

function toggleHistory(){
    showHistory();
}


