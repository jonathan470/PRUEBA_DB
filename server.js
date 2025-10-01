const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 👉 Servir la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Conexión a Clever Cloud MySQL
const connection = mysql.createConnection({
  host: "bmoslgn4va9vank99zwx-mysql.services.clever-cloud.com",
  user: "utayu26aapnkejhu",
  password: "QnAxYkmP0wAopF6Qjrvl",
  database: "bmoslgn4va9vank99zwx",
  port: 3306,
});

// Verificar conexión
connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar:", err.message);
  } else {
    console.log("✅ Conectado a la base de datos en Clever Cloud");
  }
});

// Ruta para insertar usuario
app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;
  const query = "INSERT INTO Usuario (Nombre, Email) VALUES (?, ?)";
  connection.query(query, [nombre, email], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, nombre, email });
  });
});

// Ruta para obtener usuarios
app.get("/usuarios", (req, res) => {
  connection.query("SELECT * FROM Usuario", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 👉 Ruta catch-all para frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
