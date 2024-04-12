
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


//ENVIO DE ARCHIVOS.
//1ERO Cuando presiono para camrgar archivos, hago que se visualicen en la pantalla.
document.getElementById('fileInput').addEventListener('change', function() {
    var fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpiar la lista de archivos previa
    console.log(this.files);

    var files = this.files; //Cuando hago el imput file, se me genera un array con los archivos.
    //Genero un div para cada elemento para poder mostrarlo en pantalla.
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

//2do Cargados los archivos, al presionar el boton debo enviarlos al servidor.
document.getElementById('uploadButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    //Tomo los archivos cargados en la web
    var files = document.getElementById('fileInput').files; 

    //Creo el formData con todos los valores de los archivos para enviar.
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData //Envio el formData con los archivos.
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('status').textContent = 'Archivos subidos correctamente.';
        } else {
            document.getElementById('status').textContent = 'Error al subir archivos.';
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        document.getElementById('status').textContent = 'Error al subir archivos.';
    });
});
