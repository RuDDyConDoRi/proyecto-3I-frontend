'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:RegistroCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('ListadoCasosCtrl', ['$rootScope', '$scope', '$location',
                              function ($rootScope, $scope, $location) {
    
    //$scope.casos = consulta al servicio web "listadoCasos"
    $scope.listarCasos = function(){
        $http({
          method: "GET",
          url: "http://localhost:8080/procesos_penales/listadoCasos"
        }).then(function Success(response) {
          //$scope.myRes = response.data;
          //$scope.statuscode = response.status;
          console.log('Respuesta: ', response.data);
          $scope.casos = response.data.casos;
          //$scope.datos_servicio = response.data.tasks;
        }, function Error(response) {
          $scope.myRes = response.myArrayList;
          console.log('Error: ', response);
        });
    };


    $scope.casos = [{
        nro: 1, 
		tipoCaso: 'Corrupcion',
		codigoCaso: 'CASO-001',
		responsable: 'JUAN PEREZ'
      }, {
        nro: 2, 
		tipoCaso: 'Corrupcion',
		codigoCaso: 'CASO-002',
		responsable: 'ROBERTO RAMIREZ'
      }, {
        nro: 3, 
		tipoCaso: 'Corrupcion',
		codigoCaso: 'CASO-003',
		responsable: 'ARTURO ARTES'
      }
    ];
    
    $scope.seguimientoCaso = function(index){
      $rootScope.indexCaso = index;
      $rootScope.detallesCaso = $scope.casos[index];
      $location.path('/detalleSeguimiento');
    }
    
    
    /*$scope.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    
    $scope.randomScalingFactor = function() {
			return Math.round(Math.random() * 50 * (Math.random() > 0.5 ? 1 : 1)) + 50;
		};
    
    $scope.onClick = function(points, evt){
      console.log('Datos: ', points, evt);
      if(points[0] != undefined){
        alert('datos: ' + $scope.data[0][points[0]._index]);
      }
    };
    
    $scope.data = [[51,
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    $scope.randomScalingFactor(),
                    60,
                    $scope.randomScalingFactor()],
                   [51, 10, 20, 30, 60]];
    $scope.datasetOverride = [{
      backgroundColor: "rgba(195,204,0,0.2)",
      pointBackgroundColor: ["rgba(159,204,0,1)", "rgba(201,204,0,0.8)", "rgba(89,204,0,0.8)",
                        "rgba(100,56,0,0.8)", "rgba(95,104,0,0.8)", "rgba(195,100,0,0.8)"],
      pointHoverBackgroundColor:"rgba(100,204,0,0.8)",
      borderColor: "rgba(195,204,0,1)",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "rgba(195,204,0,1)",
      fill: false,
      label: 'Tiempo Estimado (Dias)',
      borderDash: [5, 5],
			//pointRadius: 20,
			pointHoverRadius: 25,
      pointRadius: [20, 15, 10, 21, 22, 20]
    },
    {
      backgroundColor: "rgba(175,204,0,0.2)",
      pointBackgroundColor: "rgba(95,104,0,0.8)",
      pointHoverBackgroundColor:"rgba(100,204,0,0.8)",
      borderColor: "rgba(195,204,0,1)",
      pointBorderColor: "#fff",
      pointHoverBorderColor: "rgba(195,204,0,1)",
      fill: false,
      label: 'Tiempo Real (Dias)',
      borderDash: [5, 5],
			//pointRadius: 20,
			pointHoverRadius: 24,
      pointRadius: 22
    }
    ];*/
        
    /*
    var randomScalingFactor = function() {
			return Math.round(Math.random() * 50 * (Math.random() > 0.5 ? 1 : 1)) + 50;
		};

		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'My First dataset',
					fill: false,
					borderColor: window.chartColors.red,
					backgroundColor: window.chartColors.red,
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					]
				}, {
					label: 'My Second dataset',
					fill: false,
					borderColor: window.chartColors.blue,
					backgroundColor: window.chartColors.blue,
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					]
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart - X-Axis Filter'
				},
				scales: {
					xAxes: [{
						display: true,
						ticks: {
							callback: function(dataLabel, index) {
								// Hide the label of every 2nd dataset. return null to hide the grid line too
								return index % 2 === 0 ? dataLabel : '';
							}
						}
					}],
					yAxes: [{
						display: true,
						beginAtZero: false
					}]
				}
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
		};
     
    */
    
  }
]);

/*
angular.module('proyectoTesisApp')
    .controller('RegistrarobraCtrl', ['$rootScope', '$scope', '$http', 
  	function($rootScope, $scope, $http){
				
	}
]);*/