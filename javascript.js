document.addEventListener("DOMContentLoaded", () => {
  const seccion = document.querySelector(".seccion-pokemon");
  const nombrePokemon = document.querySelector("#nombrePokemon");
  const enviar = document.querySelector("#enviar");

  enviar.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = nombrePokemon.value.trim().toLowerCase(); 

    if (nombre === "") {
      alert("Error, no puede estar vacío.");
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Pokémon no encontrado");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Nombre:", data.name);
          console.log("Altura:", data.height);
          console.log("Peso:", data.weight);

          const tipos = data.types.map((tipoInfo) => tipoInfo.type.name);
          console.log("Tipos:", tipos.join(", "));

          const imagenPokemon = document.createElement("img");
          imagenPokemon.src = data.sprites.front_default;
          imagenPokemon.alt = data.name;
          imagenPokemon.width = 150;

          seccion.appendChild(imagenPokemon);
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error("Error al obtener el Pokémon:", error.message);
        });
    }
  });
});