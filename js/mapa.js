anychart.onDocumentReady(function () {
  // The data used in this sample can be obtained from the CDN
  // https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json
  anychart.data.loadJsonFile(
    'https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json',
    
    function (data) {
      var map = anychart.map();
      //console.log(map);
      map
        .credits()
        .enabled(true)
        .url(
          'https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
        )
        .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico')
        .text(
          // 'Data source: https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_by_population_density'
        );

      map
        .title()
        .enabled(true)
        .useHtml(true)
        .padding([10, 0, 10, 0])
        .text(
          'Vacunación Mundial<br/>' +
          '<span  style="color:#455a64; font-size: 16px;">Paises y sus números</span>'
        );

      map.geoData('anychart.maps.world');
      map.interactivity().selectionMode('none');
      map.padding(0);

      var dataSet = anychart.data.set(data);
      var densityData = dataSet.mapAs({ value: 'density' });
      var series = map.choropleth(densityData);
      
      var miDatajson = function () {
        var mijsonTemp = null;
          $.ajax({
            'async': false,
            'url': "https://cdn.anychart.com/samples/maps-general-features/world-choropleth-map/data.json",
            'success': function (data) {
            mijsonTemp = data;
        }
      });
      return mijsonTemp;
    }(); 
    localStorage.setItem('datospais', JSON.stringify(miDatajson));
    var paisesGuardados = localStorage.getItem('datospais');
    var datoslevantados = JSON.parse(paisesGuardados);


  function agregarMisDatos (paisesLevantados){
  for (const pais of paisesLevantados){
    pais.cantVacunados = '0';
    pais.vacunasUsadas = 'No hay datos en el sistema';
    pais.porcentVacunados = '0';
    if (pais.name ==="Uruguay") {
              pais.cantVacunados = '1432025';
              pais.vacunasUsadas = 'Pfizer, Sinovac, Astrazeneca';
              pais.porcentVacunados = '48';
        }
    if (pais.name ==="Argentina") {
              pais.cantVacunados = '26120250';
              pais.vacunasUsadas = 'Pfizer, SputnikV, Astrazeneca, Sinopharm';
              pais.porcentVacunados = '51';
        }
    if (pais.name ==="Chile") {
              pais.cantVacunados = '11120285';
              pais.vacunasUsadas = 'Pfizer, Sinovac, Astrazeneca, Cansino';
              pais.porcentVacunados = '46';
        }
    if (pais.name ==="Brazil") {
              pais.cantVacunados = '35120018';
              pais.vacunasUsadas = 'Pfizer, Sinovac, Astrazeneca, Cansino';
              pais.porcentVacunados = '32';
        }
    }
}
agregarMisDatos(datoslevantados);
console.log(datoslevantados);
      

      series.labels(false);

      series
        .hovered('')
        .fill('#90caf9')
        .stroke(anychart.color.darken(''));

      series
        .selected('')
        .fill('#90caf9')
        .stroke(anychart.color.darken('#1565c0'));

      series
        .tooltip()
        .useHtml(true)
        .format(function () {
          var paisEnELQueEstoy = this.getData('name').toLocaleString();
          
var nuevosDatos = devolverNuevaData(datoslevantados, paisEnELQueEstoy);

function devolverNuevaData (paisesLevantados, paisJson){
  for (const pais of paisesLevantados){
    let nuevosDatos = [];
    if (pais.name === paisJson){
        nuevosDatos.push(pais.cantVacunados);
        nuevosDatos.push(pais.vacunasUsadas);
        nuevosDatos.push(pais.porcentVacunados);
        return nuevosDatos;
    }
    }
    
}
        return (
              '<span style="color: #bbdefb">Personas vacunadas</span>: ' +
              parseFloat(nuevosDatos[0]).toLocaleString() +
              ' vacunados<br/>' +
              '<span style="color: #bbdefb">Vacunas utilizadas</span>: ' +
              (nuevosDatos[1]).toLocaleString() +
              '<br/>' +
              '<span style="color: #bbdefb">Porcentaje de población vacunada</span>: ' +
              parseInt(nuevosDatos[2]).toLocaleString() +
              ' %'
                );
         });

      var scale = anychart.scales.ordinalColor([
        { less: 10 },
        { from: 10, to: 30 },
        { from: 30, to: 50 },
        { from: 50, to: 100 },
        { from: 100, to: 200 },
        { from: 200, to: 300 },
        { from: 300, to: 500 },
        { from: 500, to: 1000 },
        { greater: 1000 }
      ]);
      scale.colors([
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa',
        '#81d4fa'
      ]);

      var colorRange = map.colorRange();
      colorRange.enabled(false).padding([0, 0, 20, 0]);
      colorRange
        .ticks()
        .enabled(false)
        .stroke('0 white')
        .position('center')
        .length(0);
      colorRange.colorLineSize(0);
      colorRange.marker().size(0);
      colorRange
        .labels()
        .fontSize(0)
        .padding(0, 0, 0, 0)
        .format(function () {
          var range = this.colorRange;
          var name;
          if (isFinite(range.start + range.end)) {
            name = range.start + ' - ' + range.end;
          } else if (isFinite(range.start)) {
            name = 'More than ' + range.start;
          } else {
            name = 'Less than ' + range.end;
          }
          return name;
        });

      series.colorScale(scale);

      // create zoom controls
      var zoomController = anychart.ui.zoom();
      zoomController.render(map);

      // set container id for the chart
      map.container('container');
      // initiate chart drawing
      map.draw();
    }
  );
});