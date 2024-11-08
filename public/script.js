const clickCount = document.getElementById("clickCount");
const incrementButton = document.getElementById("incrementButton");

// Obtener el número de clics al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  obtenerContador();
});

// Incrementar el contador al hacer clic
incrementButton.addEventListener("click", () => {
  fetch('http://localhost:3000/incrementar', {
    method: "POST"
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      obtenerContador(); // Actualiza el contador después del incremento
    }
  });
});

// Función para obtener el contador
function obtenerContador() {
  fetch('http://localhost:3000/contador')
    .then(response => response.json())
    .then(data => {
      clickCount.textContent = data.clicks;
    })
    .catch(error => console.error('Error al obtener el contador:', error));
}
