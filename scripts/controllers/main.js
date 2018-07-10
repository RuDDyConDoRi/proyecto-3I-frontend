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

        $scope.usuario = {
          nombre: "root",
          contrasena: "root",
          accion: "validar"
        }

        $http({
          method: "POST",
          url: "http://localhost:8080/JadeEjemplo001/ServletValidar",
          params: $scope.usuario
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
  }
]);