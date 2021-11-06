let datosUruguay = [];      
datosUruguay.push("Uruguay");
datosUruguay.push(1210562);
datosUruguay.push("Pfizer, Sinovac, Astrazeneca");
datosUruguay.push(41);
localStorage.setItem('datosuy', JSON.stringify(datosUruguay));
var uyGuardado = localStorage.getItem('datosuy');
var datosUy = JSON.parse(uyGuardado);


let datosArgentina = [];
datosArgentina.push("Argentina");
datosArgentina.push(23012478);
datosArgentina.push("SputnikV, Pfizer, Astrazeneca, Sinopharm");
datosArgentina.push(50);
localStorage.setItem('datosar', JSON.stringify(datosArgentina));
var arGuardado = localStorage.getItem('datosar');
var datosAr = JSON.parse(arGuardado);


let datosChile = [];      
datosChile.push("Chile");
datosChile.push(8523124);
datosChile.push("Pfizer, Sinovac, Astrazeneca, Cansino");
datosChile.push(45);
localStorage.setItem('datoschi', JSON.stringify(datosChile));
var chiGuardado = localStorage.getItem('datoschi');
var datosChi = JSON.parse(chiGuardado);


let datosBrazil = [];
datosBrazil.push("Brazil");
datosBrazil.push(30210565);
datosBrazil.push("SputnikV, Pfizer, Astrazeneca, Sinopharm");
datosBrazil.push(32);
localStorage.setItem('datosbr', JSON.stringify(datosBrazil));
var brGuardado = localStorage.getItem('datosbr');
var datosBr = JSON.parse(brGuardado);

