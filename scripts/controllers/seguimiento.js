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
                                 "rgba(95,104,0,0.8)", 
                                 "rgba(195,100,0,0.8)"];
    
      $scope.tiemposEstimados = [51, 40, 70, 15, 60, 90];
      $scope.tiemposReales = [51, 10, 20, 30, 60, 90];
    
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
    
    $scope.onClick = function(points, evt){
      console.log('Datos: ', points, evt);
      if(points[0] != undefined){
        $scope.mostrarDatos();
      }
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