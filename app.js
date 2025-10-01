document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  // ⚠️ Cuando lo subamos a Clever Cloud, cambia localhost:3000 por la URL de tu app
  const response = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email }),
  });

  const data = await response.json();
  console.log("Usuario agregado:", data);
  cargarUsuarios();
});

async function cargarUsuarios() {
  const response = await fetch("http://localhost:3000/usuarios");
  const usuarios = await response.json();

  const appForm = document.getElementById("app-form");
  appForm.innerHTML = "";
  usuarios.forEach((u) => {
    appForm.innerHTML += `<p>${u.Id_usuario} - ${u.Nombre} (${u.Email})</p>`;
  });
}

// Cargar al inicio
cargarUsuarios();
