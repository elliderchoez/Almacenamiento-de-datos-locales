document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtención de los valores de los campos del formulario
    const cedula = document.getElementById('cedula').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const nombres = document.getElementById('nombres').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    // Expresiones regulares para validaciones
    const cedulaRegex = /^\d{10}$/;
    const nombreApellidoRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const direccionRegex = /^.{5,100}$/;
    const telefonoRegex = /^\d{7,10}$/;
    const correoRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // Función para validar campos individuales
    function validarCampo(input, regex) {
        if (!regex.test(input.value.trim())) {
            input.classList.add('error');
            return false;
        } else {
            input.classList.remove('error');
            return true;
        }
    }

    // Validación de cada campo
    const validCedula = validarCampo(document.getElementById('cedula'), cedulaRegex);
    const validApellidos = validarCampo(document.getElementById('apellidos'), nombreApellidoRegex);
    const validNombres = validarCampo(document.getElementById('nombres'), nombreApellidoRegex);
    const validDireccion = validarCampo(document.getElementById('direccion'), direccionRegex);
    const validTelefono = validarCampo(document.getElementById('telefono'), telefonoRegex);
    const validCorreo = validarCampo(document.getElementById('correo'), correoRegex);

    // Verificar que todas las validaciones pasen antes de enviar
    if (validCedula && validApellidos && validNombres && validDireccion && validTelefono && validCorreo) {
        // Verificar si la cédula ya está registrada
        let clients = localStorage.getItem('clients');
        clients = clients ? JSON.parse(clients) : [];

        // Buscar si la cédula ya existe en los clientes registrados
        const cedulaExistente = clients.some(cliente => cliente.cedula === cedula);

        if (cedulaExistente) {
            alert('La cédula ingresada ya está registrada.');
            return;
        }

        // Si la cédula no está registrada, agregar el cliente
        const clientData = {
            cedula,
            apellidos,
            nombres,
            direccion,
            telefono,
            correo
        };

        clients.push(clientData);
        localStorage.setItem('clients', JSON.stringify(clients));

        console.log('Datos del Cliente:', clientData);
        alert('Datos enviados correctamente');
        document.getElementById('clientForm').reset();
    } 
});
