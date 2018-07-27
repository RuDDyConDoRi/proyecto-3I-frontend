'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistroCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('VerificacionCtrl', ['$scope', function ($scope) {
    
    $scope.nroCasoCorrupcion = '0056';
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [ {x: 0, y: 10}, {x: 0, y: 1}, {x: 1, y: 6}, {x: 4, y: 2} ],
      [ {x: 0, y: 2}, {x: 5, y: 7}, {x: 4, y: 2}, {x: 2, y: 9} ]
    ];
    
    $scope.options = {
      scales: {
        xAxes: [{
          display: false,
          type: 'linear',
          position: 'bottom'
        }],
        yAxes: [{
					display: false,
					beginAtZero: false
				}]
      }
    };
    
    $scope.labels = ['January', 
                     'February', 
                     'March', 
                     'April', 
                     'May', 
                     'June', 
                     'July'];

    $scope.series2 = ['Series A', 'Series B'];
    $scope.velocidades = [[65, 59, 80, 81, 56, 55, 40],
                          [28, 48, 40, 19, 86, 27, 90]];

    $scope.onClick = function(points, evt){
      console.log(points, evt);
    };
    
    $scope.datasetOverride = [{yAxisID:'y-axis-1'}, {yAxisID: 'y-axis-2'}];
    $scope.opciones = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };
    
    $scope.rome = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([12.5, 41.9]))
    })
    
    $scope.rome.setStyle(new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
      }))
    }));
     
    $scope.vectorSource = new ol.source.Vector({
      features: [$scope.rome]
    });

    $scope.vectorLayer = new ol.layer.Vector({
      source: $scope.vectorSource
    });

    $scope.rasterLayer = new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
        crossOrigin: ''
      })
    });
    
    $scope.map = new ol.Map({
      target: 'map',
      layers: [$scope.rasterLayer, $scope.vectorLayer],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
  }
]);