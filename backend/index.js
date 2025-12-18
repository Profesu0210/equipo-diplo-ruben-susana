const { default: axios } = require("axios");
const express = require("express");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "db",
  user: "root",
  password: "1234",
  database: "laboratorio",
});

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/status", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/items", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM items");
  res.json(rows);
});

app.post("/api/items", async (req, res) => {
  const { nombre } = req.body;
  const [result] = await pool.query("INSERT INTO items (nombre) VALUES (?)", [
    nombre,
  ]);
  res.json({ id: result.insertId, nombre });
});

app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM items WHERE id = ?", [id]);
  res.json({ message: "Item eliminado" });
});

app.get("/api/external", async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  res.json(response.data);
});

app.listen(3000, () => {
  console.log("Backend ejecutandose en el puerto 3000");
});
