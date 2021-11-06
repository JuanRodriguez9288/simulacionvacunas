//funcion que muestra una o dos dosis para elegir, según la vacuna
function ocultarDosis2 (){
    //capturo cual vacuna está seleccionada
    let vacunaSeleccionada = document.getElementById("inputVacuna").value;
    console.log(vacunaSeleccionada);
    const segunda = document.getElementById("segDosis");

    if (vacunaSeleccionada === "CANSINO") {
        document.getElementById("dosis2").value = document.getElementById("dosis1").value;
        //oculto la segunda dosis si la vacuna es de una dosis
        ocultarSegundaDosis();
    }else{
        //muestro la segunda dosis si la vacuna es de dos dosis
        mostrarSegundaDosis();
       }
}
//funcion que muestra la fecha de fin de cursar la enfermedad
// si selecciona el estado 2
function mostrarFechaFinCursar (){
    //capturo cual vacuna está seleccionada
    let estadoSeleccionado = document.getElementById("inputEstado").value;
    const fechaFinCurso = document.getElementById("finCursar");
    
    if (estadoSeleccionado === "2") {
        //oculto la segunda dosis si la vacuna es de una dosis
        $('#finCursar').slideDown(400);
    }else{
        $('#finCursar').slideUp(400);
        //muestro la segunda dosis si la vacuna es de dos dosis
       }
}
//funcion que muestra la card para hacer la consulta si está
//habilitado, según su estado
function mostrarCardConsulta (){
    const cardConsulta = document.getElementById("cardConsulta");
    cardConsulta.classList.remove("colapsar");
    cardConsulta.classList.add("mostrar");
        
}
//funcion que oculta la card para hacer la consulta si no está
//habilitado, según su estado
function ocultarCardConsulta (){
    const cardConsulta = document.getElementById("cardConsulta");
    cardConsulta.classList.remove("mostrar");
    cardConsulta.classList.remove("colapsar");
    cardConsulta.classList.add("colapsar");   
}

//funcion que muestra las fechas resultantes
function mostrarFechasResultantes (infoFechaInmunidad, infoFechaRevacunacion){
    //levanto el modal donde están las cajas de mensaje donde
    //cargo la información de las fechas
    $('#modalInfo').modal();
    //asigno la información de las fechas a las cajas de texto
    const infoFechaInmune = document.getElementById("fInmune");
    infoFechaInmune.innerHTML = `${infoFechaInmunidad}`;
    const infoFechaRevacunar = document.getElementById("fRevacunacion");
    infoFechaRevacunar.innerHTML = `${infoFechaRevacunacion}`;


}

// funcion que recibe el pais de la persona
// y devuelve una lista de las vacunas que se usan en ese pais
function asociarVacunas (pais) {
    let paisResidencia = pais;
    const listaDeVacunasPosibles = [];
        
        const contenedor = document.getElementById("inputVacuna");
                
        switch (paisResidencia) {
            case "URUGUAY":
                listaDeVacunasPosibles.push('SINOVAC');
                listaDeVacunasPosibles.push('ASTRAZENECA');
                listaDeVacunasPosibles.push('PFIZER');
                while (contenedor.firstChild) {
                    contenedor.removeChild(contenedor.firstChild);
                }
                for (const vacuna of listaDeVacunasPosibles) {
                let option = document.createElement("option");
                option.innerHTML = `${vacuna}`;
                contenedor.appendChild(option);
                }
            break;
            case "ARGENTINA":
                listaDeVacunasPosibles.push('SPUTNIKV');
                listaDeVacunasPosibles.push('ASTRAZENECA');
                listaDeVacunasPosibles.push('SINOPHARM');
                listaDeVacunasPosibles.push('PFIZER');
                while (contenedor.firstChild) {
                    contenedor.removeChild(contenedor.firstChild);
                }
                for (const vacuna of listaDeVacunasPosibles) {
                let option = document.createElement("option");
                option.innerHTML = `${vacuna}`;
                contenedor.appendChild(option);
                }   
            break;
            case "CHILE":
                listaDeVacunasPosibles.push('ASTRAZENECA');
                listaDeVacunasPosibles.push('CANSINO');
                listaDeVacunasPosibles.push('SINOVAC');
                listaDeVacunasPosibles.push('PFIZER');
                while (contenedor.firstChild) {
                    contenedor.removeChild(contenedor.firstChild);
                }
                for (const vacuna of listaDeVacunasPosibles) {
                let option = document.createElement("option");
                option.innerHTML = `${vacuna}`;
                contenedor.appendChild(option);
                }
            break;
            default:
            break;
                }
        
     return listaDeVacunasPosibles;
        }

// funcion que recibe un nombre de vacuna y devuelve 
// todos los datos de una vacuna
function devolverVacuna (nombreVacuna) {
    var nombreRecibido = nombreVacuna;
    const vacunaArray = [];
    for (let i=0; i<6; i++) {
        let nombreDeEstaVacuna = listaDeVacunasExistentes[i].nombre;
        
        if (nombreDeEstaVacuna == nombreRecibido) {
          //alert (listaDeVacunasExistentes[i].nombre);
          return listaDeVacunasExistentes[i];
       }
    }
  }

function mostrarOcultarConsulta(){
    let estadoSeleccionado = $("#inputEstado").val();
    switch (estadoSeleccionado) {
        case "1":
        break;
        case "2":
        ocultarCardConsulta();
        break;
        case "3":
        ocultarCardConsulta();
        break;
                }
}

//función que según el estado muestra la card correspondiente
function segundoPaso (){
    //levanto la persona del storage
    var personaGuardada = localStorage.getItem('personaGuardada');
    //la convierto a objeto
    var personaLevantada = JSON.parse(personaGuardada);
    // el objeto no es reconocido como persona, entonces lo
    // instancio como una persona para poder acceder a sus metodos
    const personaDB = new Persona(personaLevantada);
    console.log(personaGuardada);
    console.log(personaLevantada);
    console.log(personaDB);

    switch (personaDB.estado) {
        case 1:
            mostrarCardConsulta();
        break;
        case 2:
            ocultarCardConsulta();
            consultaHabilitacion();
        break;
        case 3:
            ocultarCardConsulta();
            $('#modalInfoCursando').modal();
        break;
                }
}

function comparacionFechas(){
    let vacunaSeleccionada = document.getElementById("inputVacuna").value;
    //si la vacuna es de una dosis, igualo el campo de la dosis2
    //por conveniencia para el programa
    if (vacunaSeleccionada === "CANSINO"){
            document.getElementById("dosis2").value = document.getElementById("dosis1").value;
    }
    let dosis1 = document.getElementById("dosis1").value;
    let fecha1 = new Date(dosis1);
    let dosis2 = document.getElementById("dosis2").value;
    let fecha2 = new Date(dosis2);
    
    

    if (fecha1 > fecha2){
        $('#avisoFechas').css({"color": "#f92e2e"}).slideDown(600);
        $('#dosis1').css({"background-color": "#f92e2e"});
        $('#dosis2').css({"background-color": "#f92e2e"});
    } else {
        $('#avisoFechas').css({"color": "transparent"}).slideUp(400);
        //acá como las comparo, se da por hecho que ya son fechas
        //con el formato correcto y también levanta el mensaje
        //de fechas vacias
        $('#avisoFechasVacias').css({"color": "transparent"}).slideUp(400);
        
        $('#dosis1').css({"background-color": "white"});
        $('#dosis2').css({"background-color": "white"});
    }
}

function mostrarAvisoVerificarFechas(){
     $('#avisoFechasVacias').css({"color": "#f92e2e"}).slideDown(400);  
}
function ocultarAvisoVerificarFechas(){
     $('#avisoFechasVacias').css({"color": "transparent"}).slideUp(400);  
}

function mostrarAvisoVerificarDatos(){
     $('#avisoVerificarDatos').css({"color": "#f92e2e"}).slideDown(400);  
}
function ocultarAvisoVerificarDatos(){
     $('#avisoVerificarDatos').css({"color": "transparent"}).slideUp(400);  
}

$("#btnSubir").click(function (e){
    e.preventDefault();
    $("html, body").animate(
    {
        scrollTop:0,
    }, 650
    );
});



function mostrarSegundaDosis(){
     $('#segDosis').slideDown(400);  
}
function ocultarSegundaDosis(){
     $('#segDosis').slideUp(400);  
}

