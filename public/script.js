let score = 0;

// Elemente aus HTML holen
const pokemon = document.getElementById("pokemon");
const scoreDisplay = document.getElementById("score");
const pokemonNameDisplay = document.getElementById("pokemon-name");

pokemon.addEventListener("click", async () => {
  if (score === 0) prompt("Dein Name:");
  // Score erhöhen
  score++;
  scoreDisplay.textContent = score;

  // Neue zufällige Pokémon-ID (1-151)
  const randomId = Math.floor(Math.random() * 151) + 1;

  // Bildquelle ändern
  pokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;

  try {
    // Pokémon-Name von der API holen
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomId}/`
    );
    const data = await response.json();
    pokemonNameDisplay.textContent =
      data.name.charAt(0).toUpperCase() + data.name.slice(1);
  } catch (error) {
    console.error("Fehler beim Laden des Pokémon-Namens:", error);
    pokemonNameDisplay.textContent = "Unbekannt";
  }
});
