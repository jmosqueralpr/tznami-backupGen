let timeoutId;
const inactivityTime = 10 * 10 * 1000; // 2 minutos en milisegundos

function resetInactivityTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(notifyServerOfInactivity, inactivityTime);
}

async function notifyServerOfInactivity() {
    try {
        console.log("Timeout iniciado");
        const response = await fetch('/inactivityTime', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Usuario inactivo' })
        });

        if (!response.ok) {
            throw new Error('Error al notificar al servidor');
        }

        const data = await response.json();
        document.getElementById('titleGral').innerHTML = "SESION FINALIZADA";
        document.getElementById('titleGral').style.backgroundColor = "red";
        alert('Sesion finalizada.');
        document.getElementById('fileSelection').innerHTML = '';
    } catch (error) {
        console.error('Hubo un problema con la notificación de inactividad:', error);
    }
}

// Eventos que se consideran actividad del usuario
window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keydown', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer);
window.addEventListener('click', resetInactivityTimer);

// Iniciar el temporizador por primera vez
resetInactivityTimer();