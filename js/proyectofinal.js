$(document).ready(function(){
   mostrarFechaFinCursar();
});

//boton para crear una persona a partir de los datos ingresados
let btnCrearPersona = document.getElementById("btnIngreso");
btnCrearPersona.addEventListener( "click", validarDatosyCrearPersona);

// boton para consultar la inmunidad
let btnConsultarInmunidad = document.getElementById("btnConsultarInmunidad");
btnConsultarInmunidad.addEventListener( "click", consultaInmunidad);

// selector para seleccionar la vacuna
let selectorDeVacuna = document.getElementById("inputVacuna");
selectorDeVacuna.addEventListener( "change", ocultarDosis2);

// selector para seleccionar el estado
let selectorDeEstado = document.getElementById("inputEstado");
selectorDeEstado.addEventListener( "change", mostrarFechaFinCursar);
//selectorDeEstado.addEventListener( "onstart", mostrarFechaFinCursar);

$("#inputEstado").on("change", mostrarOcultarConsulta);

//compara las fechas y tira un error si la fecha de dosis1
//es mayor a la fecha de dosis2
$("#dosis1").on("change", comparacionFechas);
$("#dosis2").on("change", comparacionFechas);




