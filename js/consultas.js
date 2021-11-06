// funcion que recibe una vacuna completa y las fechas de las dosis
// y a partir de eso devuelve la fecha en la que
// alcanza la inmunidad y cuando debería volver a vacunarse
function devolverInmunidadyRevacunacion(vacuna, fechaDosis1, fechaDosis2){  
        let diasParaLLegarAinmunidad = vacuna.tiempoDeEsperaDespuesUltimaDosis;
        let diasParaLaRevacunacion = vacuna.tiempoDeInmunidad;
        let numeroDeDosis = vacuna.dosis;
        let nombreVacuna = vacuna.nombre;
        //llamo a la funcion que me guarda en localstorage
        // para levantar estadisticas de que vacunas son las
        //más consultadas
        sumarVacunaUsadaStorage(nombreVacuna);

    switch (numeroDeDosis) {
            case 1:
                let fechaDosisUnica = fechaDosis1;
                let fechaUnica = new Date(fechaDosisUnica);

                // instancio la fecha de inmunidad como la ultima dosis
                // a partir de ahí le sumo los días de inmunidad
                // correspondiente al tipo de vacuna
                // lo mismo para la de revacunacion
                var fechaInmune1Dosis = new Date (fechaUnica);
                var fechaRevacunar1Dosis = new Date (fechaUnica);

                //agrego los días para alcanzar la inmunidad de cada vacuna
                fechaInmune1Dosis.setDate(fechaInmune1Dosis.getDate() + diasParaLLegarAinmunidad + 1);
                //agrego los días para volver a revacunar
                fechaRevacunar1Dosis.setDate(fechaRevacunar1Dosis.getDate() + diasParaLaRevacunacion + 1);

                var fInmuneFormato = moment(fechaInmune1Dosis);
                var fechaInmuneformato = fInmuneFormato.format('D/MM/YYYY');
                var fRevacunarFormato = moment(fechaRevacunar1Dosis);
                var fechaRevacunarFormato = fRevacunarFormato.format('D/MM/YYYY');

                let fechasPara1Dosis = [];
                fechasPara1Dosis.push(fechaInmuneformato);
                fechasPara1Dosis.push(fechaRevacunarFormato);
                return fechasPara1Dosis;
            break;
            case 2:
                //alert ("La vacuna " + nombreVacuna + " consta de 2 dosis. Ingreselas...");
                let fechaPrimeraDosis = fechaDosis1;
                let fechaSegundaDosis = fechaDosis2;

                let fecha1 = new Date(fechaPrimeraDosis);
                let fecha2 = new Date(fechaSegundaDosis);

                // instancio la fecha de inmunidad como la ultima dosis
                // a partir de ahí le sumo los días de inmunidad
                // correspondiente al tipo de vacuna
                // lo mismo para la de revacunacion
                var fechaInmune = new Date (fechaSegundaDosis);
                var fechaRevacunar = new Date (fechaSegundaDosis);

                //agrego los días para alcanzar la inmunidad de cada vacuna
                fechaInmune.setDate(fechaInmune.getDate() + diasParaLLegarAinmunidad + 1);
                //agrego los días para volver a revacunar
                fechaRevacunar.setDate(fechaRevacunar.getDate() + diasParaLaRevacunacion + 1);

                var fInmuneFormato = moment(fechaInmune);
                var fechaInmuneformato = fInmuneFormato.format('D/MM/YYYY');
                var fRevacunarFormato = moment(fechaRevacunar);
                var fechaRevacunarFormato = fRevacunarFormato.format('D/MM/YYYY');

                let fechasPara2Dosis = [];
                fechasPara2Dosis.push(fechaInmuneformato, fechaRevacunarFormato);
                return fechasPara2Dosis;
            break;
            default:
            break;
                }

}

// funcion que se ejecuta cuando el usuario curso una o más veces
// la enfermedad, recibe la fecha cuando salió de la enfermedad
// y la compara con un tiempo (120 días, 4 meses aprox)
// si fue hace más de 4 meses, puede consultar sus fechas de vacunación
// y ahí le pide los datos
// si todavía no pasaron 4 meses, le devuelve una fecha
// a partir de la cual puede consultar
function devolverHabilitacionAConsultar(fechaFinEnfermedad){
    let comparacionDeFechas = true;
    let fechaIngresada = new Date(fechaFinEnfermedad);
    const diasParaPoderVacunarse = 120;
    const fechaActual = new Date();
    const fechaDeHabilitacion = new Date(fechaIngresada);

    fechaDeHabilitacion.setDate(fechaDeHabilitacion.getDate() + diasParaPoderVacunarse);
    if (fechaDeHabilitacion > fechaActual){
        comparacionDeFechas = false;
      } else {
        comparacionDeFechas = true;
    }
    var fHabilitacionFormato = moment(fechaDeHabilitacion);
    var fechaHabilitacionFormato = fHabilitacionFormato.format('D/MM/YYYY');
                
    // en un array devuelve si es true o false
    // el poder ver cuando le corresponde vacunarse respectivamente
    // y devuelve la fecha en la que puede verlo en caso de no poder ahora
    let datos = [];
    datos.push(comparacionDeFechas, fechaHabilitacionFormato);
    return datos;
}

function consultaInmunidad(){
    //tomo la vacuna del select
    let vacunaSeleccionada = document.getElementById("inputVacuna").value;
    //tomo el string de la fecha 1
    let dosis1 = document.getElementById("dosis1").value;
    console.log(dosis1);
    
    //la convierto a fecha
    let fecha1 = new Date(dosis1);
    //console.log(fecha1);
    //tomo el string de la fecha 2
    let dosis2 = document.getElementById("dosis2").value;
    //console.log(dosis2);
    //la convierto a fecha
    let fecha2 = new Date(dosis2);
    //console.log(fecha2);
    if((dosis1 === "") || (dosis2 === "") || (dosis1 > dosis2)){
        mostrarAvisoVerificarFechas();
    }else{
        ocultarAvisoVerificarFechas();
        //levanto la persona del storage
        var personaGuardada = localStorage.getItem('personaGuardada');
        //la convierto a objeto
        var personaLevantada = JSON.parse(personaGuardada);
        // el objeto no es reconocido como persona, entonces lo
        // instancio como una persona para poder acceder a sus metodos
        const personaDB = new Persona(personaLevantada);
        //al tener el objeto como persona le asocio la vacuna del select
        personaDB.asociarVacuna(personaDB, vacunaSeleccionada);
        //console.log(personaDB);
        //envio la persona y las fechas de vacunacion al metodo
        personaDB.consultarInmunidad(personaDB,fecha1,fecha2);
    }
    
}

function consultaHabilitacion(){
    //tomo el string de la fecha de fin de enfermedad
    let fechaAltaEnfermedad = document.getElementById("fechaFinCursar").value;
    //la convierto a fecha
    let fechaAlta = new Date(fechaAltaEnfermedad);
    var datosHabilitacion = devolverHabilitacionAConsultar(fechaAlta);
        switch (datosHabilitacion[0]) {
            case true:
                $('#modalInfoHabilitado').modal();
                mostrarCardConsulta();
             break;
             case false:
                $("#modalInfoNoHabilitado #noHabilitado").empty();
                $("#modalInfoNoHabilitado #noHabilitado").append("Aún debe esperar hasta la fecha: " + datosHabilitacion[1] + " para que se cumplan los 4 meses de fin de la enfermedad y poder vacunarse");
                $('#modalInfoNoHabilitado').modal();
                ocultarCardConsulta();
             break;
             default:
             break;
              }
}