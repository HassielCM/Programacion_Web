const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ========== CONEXIÓN ==========
mongoose.connect(
  "mongodb+srv://ca370545_db_user:Hassiel12@cluster0.anmesns.mongodb.net/jerseyDB?retryWrites=true&w=majority"
)
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error Mongo:", err));

// ========== MODELO ==========
const jerseySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  dorsal: { type: Number, required: true },
  talla: { type: String, required: true },
  tipo: { type: String, required: true },
  precio: { type: Number, required: true },
  descuento: { type: Number, default: 0 },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Jersey = mongoose.model('Jersey', jerseySchema);

// ========== ENDPOINTS ==========

// GET todos
app.get('/api/jerseys', async (req, res) => {
  try {
    const data = await Jersey.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET uno
app.get('/api/jerseys/:id', async (req, res) => {
  try {
    const jersey = await Jersey.findById(req.params.id);
    if (!jersey) return res.status(404).json({ error: 'No encontrado' });
    res.json(jersey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST
app.post('/api/jerseys', async (req, res) => {
  try {
    const nuevo = new Jersey(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT
app.put('/api/jerseys/:id', async (req, res) => {
  try {
    const actualizado = await Jersey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ error: 'No encontrado' });

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
app.delete('/api/jerseys/:id', async (req, res) => {
  try {
    const eliminado = await Jersey.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });

    res.json({ mensaje: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// HOME → tu end.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/end.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});