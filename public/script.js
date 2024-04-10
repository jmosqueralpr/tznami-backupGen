
//EVENTO GENERADO POR EL BOTON Iniciar sesión.
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
   
    //VALIDACIÓN DEL LOGIN EN EL SERVIDOR.

    //Capturo valores de username y password.
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //Convierto a un json string.
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => { //Respuesta de la promesa.
        console.log(response);
        if (response.ok) {  // Informa que recibimos todo ok.
            return response.text(); //Para poder ver el texto de respuesta del servidor.
        };
    }).then(data => {

        if (data == 'true') {
            // Autenticación exitosa, mostrar mensaje o redireccionar
            document.getElementById('fileSelection').style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
        } else {
            // Autenticación fallida, manejar el error
            alert("Nombre de usuario o contraseña incorrectos.");
        };
    })
    .catch(error => {
        // Error en la solicitud, manejar el error
        console.error('Error:', error);
});
    /*
    if (username === "usuario" && password === "contraseña") {
        console.log("entre al fi")
        document.getElementById('fileSelection').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    } */
});

document.getElementById('fileInput').addEventListener('change', function() {
    var fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpiar la lista de archivos previa

    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        var listItem = document.createElement('div');
        listItem.textContent = files[i].name;
        fileList.appendChild(listItem);
    }

    if (files.length > 0) {
        document.getElementById('uploadButton').style.display = 'block';
    } else {
        document.getElementById('uploadButton').style.display = 'none';
    }
});

document.getElementById('uploadButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    var files = document.getElementById('fileInput').files;

    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('status').textContent = 'Archivos subidos correctamente.';
        } else {
            document.getElementById('status').textContent = 'Error al subir archivos.';
        }
    };
    xhr.send(formData);
});
