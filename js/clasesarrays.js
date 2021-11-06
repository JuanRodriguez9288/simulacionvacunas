class Persona         {
            constructor (data){
                this.nombre = data.nombre;
                this.apellido = data.apellido;
                this.edad = data.edad;
                this.nIdentificacion = data.nIdentificacion;
                this.email = data.email;
                this.nTelefono = data.nTelefono;
                this.paisDeResidencia = data.paisDeResidencia;
                this.estado = data.estado;
                this.infoEstado = data.infoEstado;
                this.vacunasPosibles = data.vacunasPosibles;
                this.vacunaAUsar = data.vacunaAUsar;
                this.fechaInmunidad = data.fechaInmunidad;
                this.fechaRevacunarse = data.fechaRevacunar;
            }
            infoDelEstado(){
                let est = parseInt(this.estado);
                switch (est) {
                    case 1:
                        this.infoEstado = "Habilitado a consultar fecha de inmunidad";
                        alert ("Procediendo al ingreso de datos de su vacunación...");
                        break;
                    case 2:
                        this.infoEstado = "Habilitado a consultar cuando estaría habilitado a vacunarse";
                        alert ("Procediendo al ingreso de datos de su último día cursando la enfermedad...");
                        break;
                    case 3:
                        this.infoEstado = "Actualmente cursando la enfermedad, aún no puede consultar";
                        break;
                    default:
                        break;
                }
            }
             asociarVacuna(persona, vacuna){
                 persona.vacunaAUsar = vacuna;
             }

            consultarInmunidad(persona, fechaDosis1, fechaDosis2){
            
            // funcion que a partir del nombre, devuelve una vacuna completa
            var vacunaAComparar = devolverVacuna(persona.vacunaAUsar);
            
            // recibe la información de la vacuna
            // y llama a la función final que recibe las fechas
            // y con eso calculo la fecha de inmunidad
            // y la fecha de revacunación
            // armando un array con las 2 fechas
            let fechas1Dosis = fechaDosis1;
            let fechas2Dosis = fechaDosis2;
            var fechasResultantes = devolverInmunidadyRevacunacion(vacunaAComparar, fechas1Dosis, fechas2Dosis);

            let fechaFinalDeInmunidad = fechasResultantes[0];
            let fechaFinalDeRevacunar = fechasResultantes[1];
            

            let infoFechaInmunidad = "Alcanzará la inmunidad el día: " + fechaFinalDeInmunidad;
            let infoFechaRevacunacion = "Debería volver a vacunarse el día: " + fechaFinalDeRevacunar;
            persona.fechaInmunidad = infoFechaInmunidad;
            persona.fechaRevacunarse = infoFechaRevacunacion;
            
            //muestro la información en un modal
            mostrarFechasResultantes(infoFechaInmunidad, infoFechaRevacunacion);
            
            
            
                        }
            }

class Vacuna         {
        constructor (data){
            this.nombre = data.nombre;
            this.dosis = data.dosis;
            this.porcentajeEfectividad = data.porcentajeEfectividad;
            this.tiempoDeEsperaDespuesUltimaDosis = data.tiempoDeEsperaDespuesUltimaDosis;
            this.tiempoEntreDosis = data.tiempoEntreDosis;
            this.tiempoDeInmunidad = data.tiempoDeInmunidad;
            }
            }

const vacunaCANSINO = new Vacuna({
        nombre: "CANSINO",
        dosis: parseInt("1"),
        porcentajeEfectividad: parseInt("90"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("10"),
        tiempoEntreDosis: parseInt("0"),
        tiempoDeInmunidad: parseInt("300"),
    });
const vacunaPFIZER = new Vacuna({
        nombre: "PFIZER",
        dosis: parseInt("2"),
        porcentajeEfectividad: parseInt("95"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("7"),
        tiempoEntreDosis: parseInt("60"),
        tiempoDeInmunidad: parseInt("300"),
    });
const vacunaASTRAZENECA = new Vacuna({
        nombre: "ASTRAZENECA",
        dosis: parseInt("2"),
        porcentajeEfectividad: parseInt("95"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("15"),
        tiempoEntreDosis: parseInt("60"),
        tiempoDeInmunidad: parseInt("300"),
    });
const vacunaSINOVAC = new Vacuna({
        nombre: "SINOVAC",
        dosis: parseInt("2"),
        porcentajeEfectividad: parseInt("95"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("15"),
        tiempoEntreDosis: parseInt("60"),
        tiempoDeInmunidad: parseInt("300"),
    });
const vacunaSPUTNIKV = new Vacuna({
        nombre: "SPUTNIKV",
        dosis: parseInt("2"),
        porcentajeEfectividad: parseInt("95"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("15"),
        tiempoEntreDosis: parseInt("60"),
        tiempoDeInmunidad: parseInt("300"),
    });
const vacunaSINOPHARM = new Vacuna({
        nombre: "SINOPHARM",
        dosis: parseInt("2"),
        porcentajeEfectividad: parseInt("96"),
        tiempoDeEsperaDespuesUltimaDosis: parseInt("15"),
        tiempoEntreDosis: parseInt("60"),
        tiempoDeInmunidad: parseInt("300"),
    });

const listaDeVacunasExistentes = [vacunaCANSINO,vacunaPFIZER,vacunaASTRAZENECA,vacunaSINOVAC,vacunaSPUTNIKV,vacunaSINOPHARM];
