'use strict';
/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', '$http', 
  	function($scope, $http){
      
      $scope.datos_servicio = "";
      $scope.respuesta = "";

      $scope.datos = {
          atributos:["Ruta","Empresa","Tiempo","Distancia","Prisa"],
          tabla:[["2S","A","20","05","SI","SI"],
                 ["03","B","30","10","SI","NO"],
                 ["2S","A","10","15","SI","SI"],
                 ["4B","C","20","10","NO","SI"],
                 ["03","B","20","05","SI","SI"],
                 ["4B","A","30","15","SI","NO"],
                 ["03","B","10","30","SI","NO"]]
        }
      
      $scope.llamar = function(){
        $http({
          method: "GET",
          url: "http://127.0.0.1:3333/mistasks"
        }).then(function Success(response) {
          $scope.myRes = response.data;
          $scope.statuscode = response.status;
          console.log('Respuesta: ', response.data);
          $scope.datos_servicio = response.data.tasks;
        }, function Error(response) {
          $scope.myRes = response.myArrayList;
          console.log('Error: ', response);
        });
      };
    

      $scope.llamarAgente = function(){
        $http.post("http://localhost:8080/iii/agente/cierre", $scope.datos)
        .then(function Success(response) {
          $scope.myRes = response.data;
          $scope.statuscode = response.status;
          console.log('Respuesta: ', response.data);
          $scope.respuesta = response.data;
        }, function Error(response) {
          $scope.myRes = response.myArrayList;
          console.log('Error: ', response);
        });
      };
    }
]);