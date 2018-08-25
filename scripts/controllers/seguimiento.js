'use strict';

angular.module('frontendApp')
  .controller('SeguimientoCtrl', [
    '$rootScope', 
    '$scope', 
    '$http', 
    '$location', 
    '$uibModal', 
    '$log', 
    '$document', 
    function (
      $rootScope, 
      $scope, 
      $http, 
      $location,
      $uibModal, 
      $log, 
      $document) {
      
      /* ---------------------- cargado de datos -------------------------*/
      $scope.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
      $scope.puntosColorFondo = ["rgba(159,204,0,1)", 
                                 "rgba(201,204,0,0.8)", 
                                 "rgba(89,204,0,0.8)",
                                 "rgba(100,56,0,0.8)", 
                                 "rgba(251,0,0,0.8)", 
                                 "rgba(195,100,0,0.8)"];
    
      $scope.tiemposEstimados = [51, 40, 70, 15, 60, 90];
      $scope.tiemposReales = [51, 10, 20, 30, 60, 90];
      $scope.dato_0 = {};
    
      /* ---------------- proceso de visualizacion ------------*/
      $scope.mostrarDatos = function(size, parentSelector) {
        console.log("Entrando");
        var parentElem = parentSelector ? 
                          angular.element($document[0]
                                         .querySelector('.modal-demo ' 
                                            + parentSelector)) : undefined;

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'modal.html',
        controller: 'ModalCtrl',
        controllerAs: '$ctrl',
        size: size,
        appendTo: parentElem,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result
      .then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
        
    $scope.randomScalingFactor = function() {
			return Math.round(Math.random() * 50 * (Math.random() > 0.5 ? 1 : 1)) + 50;
		};
    
    
    $scope.data = [$scope.tiemposEstimados, $scope.tiemposReales];
    $scope.datasetOverride = [
      {
        backgroundColor: "rgba(195,204,0,0.2)",
        pointBackgroundColor: $scope.puntosColorFondo,
        pointHoverBackgroundColor:"rgba(100,204,0,0.8)",
        borderColor: "rgba(195,204,0,1)",
        pointBorderColor: "#fff",
        pointHoverBorderColor: "rgba(195,204,0,1)",
        fill: false,
        label: 'Tiempo Estimado (Dias)',
        borderDash: [5, 5],
        pointHoverRadius: 25,
        pointRadius: [20, 21, 21, 21, 22, 20]
      }, {
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
    ];

    $scope.options = {
      //responsive: true,
      /*scales: {
        xAxes: [{
          display: true,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            max: 125,
            min: -125,
            stepSize: 10
          }
        }]
      },*/
      tooltips: {
        mode: 'index',
        callbacks: {
          // Use the footer callback to display the sum of the items showing in the tooltip
          footer: function(tooltipItems, data) {
            var sum = 0;
            var estado = false
            tooltipItems.forEach(function(tooltipItem) {
              sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            });
            return 'Suma: ' + sum;
          }/*,
          header: function(tooltipItems, data) {
            var sum = 0;
            var estado = false;
            var numero = 0;
            tooltipItems.forEach(function(tooltipItem) {
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]>0?estado=true:estado=false 
            });
            return 'Estado: ' + estado ;
          }*/
        },
        footerFontStyle: 'normal'
      }/*,
      hover: {
          mode: 'index',
          intersect: true,
          callbacks: {
            footer: function(tooltipItems, data){
              var datooos = '';
              tooltipItems.forEach(function(tooltipItem) {
                datooos = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
              });
              return 'Dato: ' + datooos;
            }
          }
        }*/
    };

    $scope.onClick = function(points, evt){
      console.log('Datos: ', points[0].value);
      $scope.dato_0 = points[0].value;
      var firstPoint = points[0];
      console.log('Datos-evento: ',  firstPoint._index);
      console.log('Datos-evento: ',  firstPoint._datasetIndex);
      console.log(points[0]._view);
      
      //
      //var activePoints = getElementsAtEventForMode(evt, 'point', $scope.options);
        
        var label = $scope.labels[firstPoint._index];
        var value = $scope.data[firstPoint._datasetIndex][firstPoint._index];
        console.log('test>> ', value);
        alert(label + ": " + value);
      //alert($scope.datasetOverride[0].points.indexOf(points[0]))
      if(points[0] != undefined){
        $scope.mostrarDatos();
      }
    };

    $scope.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };
    
    $scope.items = [$rootScope.detallesCaso.nro, 
                    $rootScope.detallesCaso.tipoCaso , 
                    $rootScope.detallesCaso.codigoCaso, 
                    $rootScope.detallesCaso.responsable];
    $scope.animationsEnabled = true;
  }
]);
  
angular.module('frontendApp')
  .controller('ModalCtrl', function ($uibModalInstance, items) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
      item: $ctrl.items[0]
    };
    
    $ctrl.ok = function () {
      $uibModalInstance.close($ctrl.selected.item);
    };
    
    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});