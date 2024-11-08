const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Asegúrate de que esto esté presente
app.use(express.static('public')); // Asegúrate de que 'public' sea la carpeta donde está index.html

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./clicks.db');

// Crear tabla si no existe
db.run('CREATE TABLE IF NOT EXISTS contador (id INTEGER PRIMARY KEY, total_clicks INTEGER)');

// Ruta para obtener el contador
app.get('/contador', (req, res) => {
  db.get('SELECT total_clicks FROM contador WHERE id = 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ clicks: row ? row.total_clicks : 0 });
  });
});

// Ruta para incrementar el contador
app.post('/incrementar', (req, res) => {
  db.run('UPDATE contador SET total_clicks = total_clicks + 1 WHERE id = 1', function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});