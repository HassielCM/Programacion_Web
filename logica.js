let btn = document.getElementById("modoBtn");

if(localStorage.getItem("modo") === "oscuro"){
    document.documentElement.classList.add("oscuro");
    btn.textContent = "Local 💙🤍";
} else {
    btn.textContent = "Visitante 🧡🖤";
}

btn.onclick = function() {
    document.documentElement.classList.toggle("oscuro");

    if(document.documentElement.classList.contains("oscuro")){
        localStorage.setItem("modo", "oscuro");
        btn.textContent = "Local 💙🤍";
    }else{
        localStorage.setItem("modo", "claro");
        btn.textContent = "Visitante 🧡🖤";
    }
}