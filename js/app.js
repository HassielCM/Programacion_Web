const API_URL = 'http://localhost:3000/api/jerseys';

let jerseys = [];
let modoEdicion = false;
let editandoId = null;

// TOAST
function mostrarMensaje(texto, tipo = "exito") {
    const toast = document.getElementById('toast');

    toast.textContent = texto;
    toast.className = `toast mostrar ${tipo}`;

    setTimeout(() => {
        toast.className = 'toast';
    }, 2500);
}

// GET
async function obtenerJerseys() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error();

        jerseys = await res.json();
        renderizarTabla();

        mostrarMensaje(`${jerseys.length} jerseys cargados`, 'exito');

    } catch (error) {
        mostrarMensaje('Error al cargar jerseys', 'error');
    }
}

// POST
async function crearJersey(jersey) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jersey)
        });

        if (!res.ok) throw new Error();

        const nuevo = await res.json();
        jerseys.unshift(nuevo);
        renderizarTabla();

        mostrarMensaje("Guardado correctamente", 'exito');

    } catch (error) {
        mostrarMensaje("Error al guardar jersey", 'error');
    }
}

// PUT
async function actualizarJersey(id, jersey) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jersey)
        });

        if (!res.ok) throw new Error();

        const actualizado = await res.json();

        const index = jerseys.findIndex(j => j._id === id);
        if (index !== -1) jerseys[index] = actualizado;

        renderizarTabla();

        mostrarMensaje("Actualizado correctamente", 'exito');

    } catch (error) {
        mostrarMensaje("Error al actualizar", 'error');
    }
}

// DELETE
async function eliminarJersey(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error();

        jerseys = jerseys.filter(j => j._id !== id);
        renderizarTabla();

        mostrarMensaje("Eliminado correctamente", 'exito');

    } catch (error) {
        mostrarMensaje("Error al eliminar", 'error');
    }
}

// TABLA
function renderizarTabla() {
    const tbody = document.getElementById('tabla');

    if (jerseys.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Sin datos</td></tr>';
        return;
    }

    tbody.innerHTML = jerseys.map(j => `
        <tr class="${j._id === editandoId ? 'fila_editando' : ''}">
            <td>${j.nombre}</td>
            <td>${j.dorsal}</td>
            <td>${j.talla}</td>
            <td>${j.tipo}</td>
            <td>$${Number(j.precio).toFixed(2)}</td>
            <td>${j.descuento}%</td>
            <td>${j.stock}</td>
            <td>
                <button class="btn_accion btn_editar" onclick="editarJersey('${j._id}')">Editar</button>
                <button class="btn_accion btn_eliminar" onclick="eliminarJersey('${j._id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// EDITAR
function editarJersey(id) {
    const j = jerseys.find(x => x._id === id);
    if (!j) return;

    modoEdicion = true;
    editandoId = id;

    document.getElementById('nombre').value = j.nombre;
    document.getElementById('dorsal').value = j.dorsal;
    document.getElementById('talla').value = j.talla;
    document.getElementById('tipo').value = j.tipo;
    document.getElementById('precio').value = Number(j.precio).toFixed(2);
    document.getElementById('descuento').value = j.descuento;
    document.getElementById('stock').value = j.stock;

    document.getElementById('btnGuardar').textContent = "Actualizar";
    document.getElementById('btnCancelar').style.display = "inline-block";

    mostrarMensaje(`Editando: ${j.nombre}`, 'info');

    renderizarTabla();
}

// CANCELAR
function cancelarEdicion(mostrar = true) {
    modoEdicion = false;
    editandoId = null;

    document.getElementById('formJersey').reset();

    document.getElementById('btnGuardar').textContent = "Guardar";
    document.getElementById('btnCancelar').style.display = "none";

    if (mostrar) {
        mostrarMensaje('Edición cancelada', 'error');
    }

    renderizarTabla();
}

// FORM
document.getElementById('formJersey').addEventListener('submit', async e => {
    e.preventDefault();

    const btn = document.getElementById('btnGuardar');
    btn.disabled = true;
    btn.textContent = modoEdicion ? "Actualizando..." : "Guardando...";

    const jersey = {
        nombre: document.getElementById('nombre').value,
        dorsal: parseInt(document.getElementById('dorsal').value),
        talla: document.getElementById('talla').value,
        tipo: document.getElementById('tipo').value,
        precio: parseFloat(document.getElementById('precio').value),
        descuento: parseFloat(document.getElementById('descuento').value) || 0,
        stock: parseInt(document.getElementById('stock').value) || 0
    };

    if (modoEdicion) {
        await actualizarJersey(editandoId, jersey);
        cancelarEdicion(false);
    } else {
        await crearJersey(jersey);
        e.target.reset();
    }

    btn.disabled = false;
    btn.textContent = modoEdicion ? "Actualizar" : "Guardar";
});

// BOTÓN CANCELAR
document.getElementById('btnCancelar').addEventListener('click', cancelarEdicion);

// INIT
obtenerJerseys();