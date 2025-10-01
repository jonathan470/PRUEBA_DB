const form = document.getElementById("formulario");
const appForm = document.getElementById("app-form");

// Cuando se envía el formulario
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  // Hacemos la petición POST a Clever Cloud
  const res = await fetch(
    "https://app-68bb8ee5-f60c-45c3-a4ef-0d158aa25646.cleverapps.io/usuarios",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email }),
    }
  );

  const data = await res.json();
  console.log("Usuario insertado:", data);

  // Refrescamos la lista de usuarios
  cargarUsuarios();
});

// Función para obtener y mostrar usuarios
async function cargarUsuarios() {
  const res = await fetch(
    "https://app-68bb8ee5-f60c-45c3-a4ef-0d158aa25646.cleverapps.io/usuarios"
  );
  const usuarios = await res.json();

  appForm.innerHTML = usuarios
    .map((u) => `<p><strong>${u.Nombre}</strong> (${u.Email})</p>`)
    .join("");
}

// Cargar usuarios al inicio
cargarUsuarios();
