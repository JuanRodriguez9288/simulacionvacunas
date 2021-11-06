function crearPersona(datos){
    const persona1 = new Persona({
        nombre: datos[0],
        apellido: datos[1],
        edad: datos[2],
        nIdentificacion: datos[3],
        nTelefono: datos[4],
        email:datos[5],
        paisDeResidencia: datos[6],
        estado: datos[7],
        infoEstado: "",
        // A partir de su pais de residencia, con una función
        // determino cuales son las posibles vacunas que se puede dar
        // con eso genero un array
        vacunasPosibles: [],
        vacunaAUsar:"",
        fechaInmunidad: "",
        fechaRevacunarse:"",
    });
    //console.log(persona1);
    persona1.vacunasPosibles = asociarVacunas(persona1.paisDeResidencia);
    return persona1;
}

//funcion que levanta y verifica los datos y crea la persona
function validarDatosyCrearPersona (){
    let nombreEsperandoAceptacion = document.getElementById("inputNombre").value;
    let nombreOk = recibeDatoVerificaNoVacio(nombreEsperandoAceptacion);
    infoErrorNombre(nombreOk);

    let apellidoEsperandoAceptacion = document.getElementById("inputApellido").value;
    let apellidoOk = recibeDatoVerificaNoVacio(apellidoEsperandoAceptacion);
    infoErrorApellido(apellidoOk);

    let edadEsperandoAceptacion = parseInt(document.getElementById("inputEdad").value);
    let edadOk = recibeEdad(edadEsperandoAceptacion);
    
    let identificacionEsperandoAceptacion = document.getElementById("inputIdentificacion").value;
    let identificacionOk = recibeDatoVerificaNoVacio(identificacionEsperandoAceptacion);
    infoErrorCIDNI(identificacionOk);

    let telefonoEsperandoAceptacion = document.getElementById("inputTelefono").value;
    let telefonoOk = recibeDatoVerificaNoVacio(telefonoEsperandoAceptacion);
    infoErrorTel(telefonoOk);

    let correoEsperandoAceptacion = document.getElementById("inputCorreo").value;
    let correoOk = recibeDatoVerificaNoVacio(correoEsperandoAceptacion);
    let correoFormatoOk = validarEmail(correoEsperandoAceptacion);
    
    infoErrorEmail(correoOk);
    infoErrorEmail(correoFormatoOk);

    let paisEsperandoAceptacion = document.getElementById("inputPais").value;
    let paisOk = recibeDatoVerificaNoVacio(paisEsperandoAceptacion);
    infoErrorPais(paisOk);

    let estadoEsperandoAceptacion = parseInt(document.getElementById("inputEstado").value);
    let estadoOk = recibeDatoVerificaNoVacio(estadoEsperandoAceptacion);
    
    let valido = true;
    let validacionFechaFinCovid = validacionFechaFin(estadoEsperandoAceptacion);
    if (nombreOk == true && apellidoOk == true 
        && edadOk == true && identificacionOk == true 
        && correoOk == true && correoFormatoOk == true
        && telefonoOk == true && paisOk == true 
        && estadoOk == true
        && validacionFechaFinCovid == true) {
        
        ocultarAvisoVerificarDatos();
        //despues de que los datos son aceptados, los asigno
        // a los datos definitivos par la creación de la persona
        let nombrePersona = nombreEsperandoAceptacion;
        let apellidoPersona = apellidoEsperandoAceptacion;
        let edadPersona = edadEsperandoAceptacion;
        let identificacionPersona = identificacionEsperandoAceptacion;
        let telefonoPersona = identificacionEsperandoAceptacion;
        let correoPersona = correoEsperandoAceptacion;
        let paisPersona = (paisEsperandoAceptacion).toUpperCase();
        let estadoPersona = estadoEsperandoAceptacion;
        let datosParaCrearPersona = [];
        
        // armo un array con los datos aceptados y los envío a la
        //funcion de crear persona
        //la funcion crea una persona y la devuelve para almacenarla
        //en el localStorage, para poder acceder desde cualquier parte del programa
        datosParaCrearPersona.push(nombrePersona);
        datosParaCrearPersona.push(apellidoPersona);
        datosParaCrearPersona.push(edadPersona);
        datosParaCrearPersona.push(identificacionPersona);
        datosParaCrearPersona.push(telefonoPersona);
        datosParaCrearPersona.push(correoPersona);
        datosParaCrearPersona.push(paisPersona);
        datosParaCrearPersona.push(estadoPersona);

        var personaParaGuardar = crearPersona(datosParaCrearPersona);
        localStorage.setItem('personaGuardada', JSON.stringify(personaParaGuardar));
        
        //llamo a la función del selector, para que actualice
        // si hay o no una segunda dosis
        ocultarDosis2();
        //según los datos, se procede o no a la consulta
        segundoPaso();
        //cuando esten verificados crear un array de
        //datos de persona verificados y enviaros a la funcion crear persona
    } else {  
        mostrarAvisoVerificarDatos();
        valido = false;
    }

}
//testea que el dato no esté vacío
function recibeDatoVerificaNoVacio (dato){
let validacion = false;
    if (dato != '') {
        validacion = true;
    } else {  
        validacion = false;
    }
    return validacion;
}

function validarEmail(correo) {
    let validacion = false;
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(correo)){
        validacion = true;
    } else {
        validacion = false;
    }
    return validacion; 
}


//testea que la edad sea un número mayor o igual a 12
function recibeEdad (edad){
let validacion = false;
    if (typeof edad === 'number' && edad >= 12) {
        validacion = true;
        $('#infoEdad').hide();
    } else {  
        $('#infoEdad').show();
        validacion = false;
    }
    return validacion;
}


//función que recibe el nombre para crear una persona
// y si este no es válido, muestra en pantalla un ícono de información que despliega un popover
function infoErrorNombre(nombreTesteado){
    if (nombreTesteado) {
        $('#infoNombre').hide();
    } else {  
        $('#infoNombre').show();
    }
}
function infoErrorApellido(apellidoTesteado){
    if (apellidoTesteado) {
        $('#infoApellido').hide();
    } else {  
        $('#infoApellido').show();
    }
}
function infoErrorCIDNI(CIDNITesteado){
    if (CIDNITesteado) {
        $('#infoCIDNI').hide();
    } else {  
        $('#infoCIDNI').show();
    }
}
function infoErrorTel(telTesteado){
    if (telTesteado) {
        $('#infoTel').hide();
    } else {  
        $('#infoTel').show();
    }
}
function infoErrorEmail(emailTesteado){
    if (emailTesteado) {
        $('#infoEmail').hide();
    } else {  
        $('#infoEmail').show();
    }
}
function infoErrorPais(paisTesteado){
    if (paisTesteado) {
        $('#infoPais').hide();
    } else {  
        $('#infoPais').show();
    }
}


function validacionFechaFin (estado){
let estadoSeleccionado = estado;
let fechaFinDeEnfermedad = document.getElementById("fechaFinCursar").value;

let validacion = true;
    if (estadoSeleccionado === 2) {
        if (fechaFinDeEnfermedad === ""){
            $('#infoFechaFin').show();
            validacion = false;
        } else {
            $('#infoFechaFin').hide();
        }
    } else {
        validacion = true;
    }
return validacion;
}












//animaciones para los popover de información en el ingreso de datos
$( "#infoEdad" ).mouseover(function() {
  $('[data-toggle="popoverEdad"]').popover('toggle');
  $('[data-toggle="popoverEdad"]').popover('');
});
$( "#infoEdad" ).mouseleave(function() {
  $('[data-toggle="popoverEdad"]').popover('toggle');
});

$( "#infoNombre" ).mouseover(function() {
  $('[data-toggle="popoverNombre"]').popover('toggle'); 
});
$( "#infoNombre" ).mouseleave(function() {
  $('[data-toggle="popoverNombre"]').popover('toggle');
});

$( "#infoApellido" ).mouseover(function() {
  $('[data-toggle="popoverApellido"]').popover('toggle'); 
});
$( "#infoApellido" ).mouseleave(function() {
  $('[data-toggle="popoverApellido"]').popover('toggle');
});

$( "#infoCIDNI" ).mouseover(function() {
  $('[data-toggle="popoverCIDNI"]').popover('toggle'); 
});
$( "#infoCIDNI" ).mouseleave(function() {
  $('[data-toggle="popoverCIDNI"]').popover('toggle');
});

$( "#infoTel" ).mouseover(function() {
  $('[data-toggle="popoverTel"]').popover('toggle'); 
});
$( "#infoTel" ).mouseleave(function() {
  $('[data-toggle="popoverTel"]').popover('toggle');
});

$( "#infoEmail" ).mouseover(function() {
  $('[data-toggle="popoverEmail"]').popover('toggle'); 
});
$( "#infoEmail" ).mouseleave(function() {
  $('[data-toggle="popoverEmail"]').popover('toggle');
});

$( "#infoPais" ).mouseover(function() {
  $('[data-toggle="popoverPais"]').popover('toggle'); 
});
$( "#infoPais" ).mouseleave(function() {
  $('[data-toggle="popoverPais"]').popover('toggle');
});

$( "#infoFechaFin" ).mouseover(function() {
  $('[data-toggle="popoverFechaFin"]').popover('toggle');
});
$( "#infoFechaFin" ).mouseleave(function() {
  $('[data-toggle="popoverFechaFin"]').popover('toggle');
});