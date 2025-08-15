// server/index.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Ordner "public" für statische Dateien freigeben (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// Standard-Route: index.html ausliefern
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
