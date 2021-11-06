//levanto del localstorage los contadores de vacunas usadas
//estos se incrementan en 1, cada vez que se consulta por alguna vacuna
var contadorSinovac = localStorage.getItem("contadorDeSinovac");
var contadorSputnikv = localStorage.getItem("contadorDeSputnikv");
var contadorCansino = localStorage.getItem("contadorDeCansino");
var contadorPfizer = localStorage.getItem("contadorDePfizer");
var contadorSinopharm = localStorage.getItem("contadorDeSinopharm");
var contadorAzeneca = localStorage.getItem("contadorDeAzeneca");

// estos if son para iniciar el localStorage, con valores
// a medida que consulte por alguna vacuna, se irán incrementando respectivamente
if (contadorSinovac === null){
    contadorSinovac = 10;
}
if (contadorSputnikv === null){
    contadorSputnikv = 15;
}
if (contadorCansino === null){
    contadorCansino = 12;
}
if (contadorPfizer === null){
    contadorPfizer = 10;
}
if (contadorSinopharm === null){
    contadorSinopharm = 3;
}
if (contadorAzeneca === null){
    contadorAzeneca = 5;
}


//funcion que es llamada cada vez que se realiza la consulta de alguna vacuna
// lo que hace es incrementar la cantidad de veces que se consulto por determinada vacuna
// para después mostrarlas en un gráfico a modo de estadisticas
function sumarVacunaUsadaStorage(nombreVacuna){
	let vacunaParaSumar = nombreVacuna;
	switch (vacunaParaSumar) {
        case "SINOVAC":
            //incrementa en 1 si se consulto por sinovac
            contadorSinovac++;
            //almacena el nuevo dato para después levantarlo
  			localStorage.setItem("contadorDeSinovac", contadorSinovac);    
            break;
        case "SPUTNIKV":
            contadorSputnikv++;
  			localStorage.setItem("contadorDeSputnikv", contadorSputnikv);      
            break;
        case "PFIZER":
            contadorPfizer++;
  			localStorage.setItem("contadorDePfizer", contadorPfizer);      
            break;
        case "CANSINO":
            contadorCansino++;
  			localStorage.setItem("contadorDeCansino", contadorCansino);    
            break;
        case "SINOPHARM":
        alert("entra");
            contadorSinopharm++;
  			localStorage.setItem("contadorDeSinopharm", contadorSinopharm);      
            break;
        case "ASTRAZENECA":
            contadorAzeneca++;
  			localStorage.setItem("contadorDeAzeneca", contadorAzeneca);
            break;  
        default:

        	break;
             }
}

//genero gráfica donde cargo los valores almacenados en el localstorage
    let miCanvas2 = document.getElementById("miGrafica").getContext("2d");
    var chart2 = new Chart(miCanvas2, {
        type: "polarArea",
        data:{
        labels:["SINOVAC","ASTRAZENECA","PFIZER","SPUTNIKV","CANSINO", "SINOPHARM"],
        datasets:[{
            label:'',
            data:[contadorSinovac,contadorAzeneca,contadorPfizer,contadorSputnikv,contadorCansino, contadorSinopharm],
            backgroundColor: [
                'rgb( 255, 54, 51 )',
                'rgb( 255, 220, 0 )',
                'rgb( 128, 234, 255 )',
                'rgb( 255, 142, 29 )',
                'rgb( 208, 104, 222 )',
                'rgb( 47, 212, 50 )']}]
    }
})