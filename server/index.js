const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// JSON Body Parsing
app.use(express.json());

// Statische Dateien (Frontend) ausliefern
app.use(express.static(path.join(__dirname, "../public")));

// Highscores abrufen
app.get("/highscores", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT player_name, score, created_at FROM highscores ORDER BY score DESC LIMIT 10"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Abrufen der Highscores" });
  }
});

// Neuen Score speichern
app.post("/highscores", async (req, res) => {
  const { player_name, score } = req.body;
  if (!player_name || score == null) {
    return res
      .status(400)
      .json({ error: "Spielername und Score erforderlich" });
  }

  try {
    await db.query(
      "INSERT INTO highscores (player_name, score) VALUES ($1, $2)",
      [player_name, score]
    );
    res.status(201).json({ message: "Score gespeichert" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Speichern des Scores" });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
