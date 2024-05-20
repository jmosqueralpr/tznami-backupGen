
 

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
var flagSendFiles = 1; //Un flag para saber si los archivos se enviaron o no
let files = [];
let filesAux = [];

//1ERO Cuando presiono para camrgar archivos, hago que se visualicen en la pantalla.
document.getElementById('fileInput').addEventListener('change', function() {

    var fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; 

        
        filesAux = this.files; 
        // Limpiar la lista de archivos previa
        if (flagSendFiles == 2) {

            //Acá agrego los nuevos  archivos.
            let j = files.length;
            let flag = true;
            for (var i = 0; i < filesAux.length; i++){
                files.forEach((element) => {
                    console.log(`Element name: ${element.name}`);
                    if (element.name == filesAux[i].name){
                        console.log(`Element con nombre coincidente: ${element.name}`);
                        flag = false;
                        j--;
                    }
                })
                if (flag == true) {
                    files[j + i] = filesAux[i];
                }
                flag = true;
                console.log(`Length + i: ${j + i} `);
            }
        };
        if (flagSendFiles == 1 ){

            console.log(this.files);
            files = filesAux;
            flagSendFiles = 2;
            }; 
        

        console.log("Files luego del if");
        console.log(files);

    //Cuando hago el imput file, se me genera un array con los archivos.
     
    console.log(files);
    console.log(typeof files);

    //Genero un div para cada elemento para poder mostrarlo en pantalla.
    for (var i = 0; i < files.length; i++) {

        var listItemNumber = Math.floor(Math.random()*3000000);

        var listItem = document.createElement('div');
        
        var fileName = document.createElement('span');

        fileName.textContent = files[i].name;

        var removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('removeButton');

        //Identificador único para cada item, para asociar el evento de borrar el item.
        listItem.id = `fileItem_${listItemNumber}`;

        //Identificador del file.
        files[i].listItemNumber = `fileItem_${listItemNumber}`;

        //Evento para eliminar el archivo cuando se hace clic en el boton de eliminar.
        removeButton.addEventListener('click', function(){
            //Obtener el id del elemento que quiero eliminar y luego asociarlo correctamente.
            var id = this.parentElement.id;
            console.log(id)
            var elementToRemove = document.getElementById(id);
            console.log("Elemento a remover");
            console.log(elementToRemove);
            fileList.removeChild(elementToRemove);
            //Eliminar de files el elemento que quiero quitar.
            let j = 0;
            let aux = [];
            for (var i = 0; i < files.length; i++){
                //Busco el elemento que quiero quitar en función del id del elemento.
                if(id == files[i].listItemNumber){
                    console.log("Elemento Removido");
                    console.log(files[i]);
                    
                } else {
                    aux[j] = files[i]; //Guardo en una variable aux el filelist sin el elemento final.
                    j++;
                }
            }
            files =  aux;
            console.log("Funciono lo del aux?")
            console.log(files);
        });

        listItem.appendChild(fileName);
        listItem.appendChild(removeButton);
        listItem.classList.add('itemFile');
        fileList.appendChild(listItem);
    }

    console.log("Files con el listItemNumber");
    console.log(files);

    if (files.length > 0) {
        document.getElementById('uploadButton').style.display = 'block';
    } else {
        document.getElementById('uploadButton').style.display = 'none';
    }
});

//2do Cargados los archivos, al presionar el boton debo enviarlos al servidor.
document.getElementById('uploadButton').addEventListener('click', function(event) {
    event.preventDefault();

    //flag de elementos enviados.
    flagSendFiles = 1;
    
    //Tomo los archivos cargados en la web
    // var files = document.getElementById('fileInput').files;  -> ya tengo los archivos en la var files.
    //El destino donde se van a guardar las carpetas
    var destiny = document.getElementById('destiny').value;
    //La selección de la carpeta
    var fileBkp =  document.getElementById('fileBkp').value;

    //Creo el formData con todos los valores de los archivos para enviar.
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    if (destiny != "" && fileBkp != ""){
        fetch(`/upload?destiny=${destiny}&folder=${fileBkp}`, {
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
    } else {
        document.getElementById('status').textContent = 'Para poder subir archivos, ingresar los datos en todos los campos';
    }
});
