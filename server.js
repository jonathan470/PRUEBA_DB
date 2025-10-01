const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a Clever Cloud MySQL
const connection = mysql.createConnection({
  host: "baux8tmz2mpirzrqrtcf-mysql.services.clever-cloud.com",
  user: "uk58ug1lhijudldm",
  password: "Ka0aXnAHqX45AbONPN5Q",
  database: "baux8tmz2mpirzrqrtcf",
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
