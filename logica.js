/*
const express = require('express');
const app = express();

// Ruta principal
app.get('/', (req, res) => {    
    res.send('Hola mundo, tu servidor funciona 💗💗💗');
});

// Puerto
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corrinedo en http://localhost:${PORT}`);
});

// corazon rosa: 💗
*/

/// Modo oscuro
let btn = document.getElementById("modoBtn");

    // Estado inicial al cargar
if (localStorage.getItem("modo") === "oscuro") {
    document.documentElement.classList.add("oscuro");
    btn.textContent = "Local 💙🤍";
} else {
    document.documentElement.classList.remove("oscuro");
    btn.textContent = "Visitante 🧡🖤";
}

function modo_oscuro() {
    if (document.documentElement.classList.contains("oscuro")) {
        ponerClaro();
    } else {
        ponerOscuro();
    }
}

    // Forzar modo oscuro
function ponerOscuro() {
    document.documentElement.classList.add("oscuro");
    localStorage.setItem("modo", "oscuro");
    btn.textContent = "Local 💙🤍";
}

    // Forzar modo claro
function ponerClaro() {
    document.documentElement.classList.remove("oscuro");
    localStorage.setItem("modo", "claro");
    btn.textContent = "Visitante 🧡🖤";
}

/// Botón de subir
let footer = document.getElementById("footer_principal");
let btnArriba = document.getElementById("arriba");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let windowH = window.innerHeight;
    let docH = document.documentElement.scrollHeight;

    // mostrar botón
    btnArriba.style.display = scrollY > 250 ? "flex" : "none";

    // evitar error si no hay footer
    if (!footer) return;

    let footerTop = footer.offsetTop;

    if (scrollY + windowH >= footerTop) {
        btnArriba.style.position = "absolute";

        let btnHeight = btnArriba.offsetHeight;
        btnArriba.style.top = (footerTop - btnHeight - 20) + "px";

    } else {
        btnArriba.style.position = "fixed";
        btnArriba.style.bottom = "20px";
        btnArriba.style.top = "auto";
    }
});

btnArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

///cambiar fotos
function cambiar(img){
    document.getElementById("principal").src = img.src;
}

/// Cuestionario
let btnJugador = document.getElementById("btnAgregarJugador");

if(btnJugador){
    btnJugador.addEventListener("click", function () {
        let nombre = document.getElementById("otroJugador").value;
        let select = document.getElementById("jugadorFavorito");

        if (nombre === "") return;

        let option = document.createElement("option");
        option.value = nombre.toLowerCase();
        option.textContent = nombre;

        select.appendChild(option);

        document.getElementById("otroJugador").value = "";
    });
}

/// Contar checkboxes seleccionados
let checks = document.querySelectorAll("input[type='checkbox']");
let mensajeCheckbox = document.getElementById("mensaje_checkbox");

if(checks.length > 0){
    checks.forEach(c=>{
        c.addEventListener("change", () => {
            let total = document.querySelectorAll("input[type='checkbox']:checked").length;
            console.log("Seleccionados total:", total);
            if( total > 0){
                mensajeCheckbox.textContent = "Seleccionaste " + total + " torneos";
            }else{
                mensajeCheckbox.textContent = "";
            }
        });
    });
}



/// Cuestionario validación
let form = document.querySelector(".formulario_pachuca");

if(form){
    form.addEventListener("submit", function(e) {
        e.preventDefault(); 

        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correo").value;
        let telefono = document.getElementById("telefono").value;
        let mensaje = document.getElementById("mensaje");

        if(nombre === "" || correo === "" || telefono === ""){
            mensaje.textContent = "Todos los campos son obligatorios";
        }else if(!correo.includes("@")){
            mensaje.textContent = "Correo inválido";
        }else{
            mensaje.textContent = "Formulario enviado correctamente";
        }
    });
}

/// Confirmar salida a la web
let links = document.querySelectorAll("a[href^='http']");

links.forEach(function(link) {
    link.addEventListener("click", function(e) {
        if(!confirm("Quieres salir del sitio")){
            e.preventDefault();
        }
    });
});



///Carrusel de leyendas
let leyendas = document.querySelectorAll(".leyendas_historia");

let botonSiguiente = document.getElementById("boton_siguiente");
let botonRegresar = document.getElementById("boton_regresar");
let carrusel = document.getElementById("carrusel_principal");
let indice = 0;

let nombreLeyenda = document.getElementById("nombre_leyenda");

function indiceActual(){
    return indice;
}

function regresarLeyenda(indiceMenos){
    if(indiceMenos < 0){
        indice = leyendas.length - 1;
    }else{
        indice = indiceMenos;
    }
    mostrarLeyenda();
}

function siguienteLeyenda(indiceMas){
    if(indiceMas >= leyendas.length){
        indice = 0;
    }else{
        indice = indiceMas;
    }
    mostrarLeyenda();
}

function mostrarLeyenda(){
    carrusel.src = leyendas[indice].src;
    console.log("Mostrando leyenda:", indice);
    nombreLeyenda.textContent = leyendas[indice].alt;
}

/// Botones likes y dislikes
// selecciona TODOS los jugadores
let jugadores = document.querySelectorAll(".lista_jugadores li");

jugadores.forEach(li => {
    let nombre = li.textContent.trim();

    // botón like
    let likeBtn = document.createElement("button");
    likeBtn.textContent = "👍";
    likeBtn.classList.add("btn_like");
    likeBtn.addEventListener("click", () => votar(nombre, "like"));

    // botón dislike
    let dislikeBtn = document.createElement("button");
    dislikeBtn.textContent = "👎";
    dislikeBtn.classList.add("btn_dislike");
    dislikeBtn.addEventListener("click", () => votar(nombre, "dislike"));

    // agregar al li
    li.appendChild(likeBtn);
    li.appendChild(dislikeBtn);
});

// función general
function votar(nombre, tipo){
    let key = tipo + "_" + nombre;

    let contador = localStorage.getItem(key) || 0;
    contador++;

    localStorage.setItem(key, contador);

    console.log(nombre + " → " + tipo + ": " + contador);
}


/// Agregar tareas a la lista
let contador = 0;

function agregar(){
    let tarea = document.getElementById("tarea").value;
    let lista = document.getElementById("lista");

    if(tarea === "") return;
    if(contador === 3) return;

    let li = document.createElement("li");
    li.textContent = tarea;

    lista.appendChild(li);

    contador++;
    document.getElementById("tarea").value = "";

    if(contador === 3){
        document.getElementById("tarea").style.display = "none";
        document.getElementById("btnAgregar").style.display = "none";
    }
}