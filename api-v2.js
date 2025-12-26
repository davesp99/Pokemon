// Obtenemos el formulario por su ID
const form = document.getElementById("formPokemon");

// Obtenemos el input donde el usuario escribe el Pokémon
const input = document.getElementById("buscarPokemon");

// Elementos donde mostraremos los resultados
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const numero = document.getElementById("numero");

// Escuchamos el evento submit del formulario
form.addEventListener("submit", async (e) => {

    // Evita que el formulario recargue la página
    e.preventDefault();

    // Tomamos el valor escrito, lo pasamos a minúsculas y quitamos espacios
    const valor = input.value.toLowerCase().trim();

    // Si el input está vacío, no hacemos la búsqueda
    if (valor === "") return;

    try {
        // Hacemos la petición a la PokéAPI con nombre o número
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);

        // Si la respuesta es incorrecta (404), lanzamos un error
        if (!response.ok) {
            throw new Error("Pokémon no encontrado");
        }

        // Convertimos la respuesta en un objeto JavaScript
        const data = await response.json();

        // Mostramos el nombre del Pokémon en el HTML
        nombre.textContent = data.name.toUpperCase();

        // Mostramos el número de la Pokédex
        numero.textContent = `Pokédex #${data.id}`;

        // Asignamos la imagen del Pokémon
        imagen.src = data.sprites.front_default;

        // Hacemos visible la imagen
        imagen.style.display = "block";

    } catch (error) {
        // Si ocurre cualquier error, mostramos mensaje al usuario
        nombre.textContent = "Pokémon no encontrado";

        // Limpiamos el número
        numero.textContent = "";

        // Ocultamos la imagen
        imagen.style.display = "none";

        // Mostramos el error en consola (solo para desarrollo)
        console.error(error);
    }
});
