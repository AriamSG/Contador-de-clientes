const clickCounter = document.getElementById("clickCounter");
const clickButton = document.getElementById("clickButton");

// URL del servidor (ajusta esta URL si subes el servidor a internet)
const SERVER_URL = 'http://localhost:3000'; // Cambia a la URL de tu servidor al desplegarlo

// Función para obtener el contador actual desde el servidor
function getCounter() {
    fetch(`${SERVER_URL}/contador`)
        .then(response => response.json())
        .then(data => {
            clickCounter.textContent = data.clicks;
        })
        .catch(error => console.error('Error:', error));
}

// Función para incrementar el contador en el servidor
function incrementCounter() {
    fetch(`${SERVER_URL}/incrementar`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            getCounter(); // Actualiza el contador después de incrementar
        }
    })
    .catch(error => console.error('Error:', error));
}

// Al cargar la página, obtiene el contador actual
window.onload = getCounter;

// Al hacer clic en el botón, incrementa el contador
clickButton.addEventListener("click", incrementCounter);
