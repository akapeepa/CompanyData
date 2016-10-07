var myApp = angular.module('myApp',['ngRoute','ngResource','ngMaterial','angularUtils.directives.dirPagination']);

//Routes
myApp.config(function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl:'pages/home.htm',
    controller:'homeController',
    controllerAs:'hc'
  });
});

//Service
myApp.service('myService',function($resource){
  return $resource('javascript/data.json');
});


//Controller
myApp.controller('homeController',['$scope', 'myService',function($scope,myService){


  $scope.countryList = myService.query(function(data){
    $scope.companyData = data;
    $scope.active =0;
    $scope.strikeOff =0;
    $scope.dormant = 0;
    $scope.liquid = 0;
    $scope.uStrikeOff =0;

    for (var i = 0; i <   $scope.companyData.length; i++) {
      if (  $scope.companyData[i].COMPANY_STATUS == "ACTIVE") {
        $scope.active++;
      }else if ($scope.companyData[i].COMPANY_STATUS == "STRIKE OFF") {
        $scope.strikeOff++;
      }else if ($scope.companyData[i].COMPANY_STATUS == "DORMANT") {
        $scope.dormant++;
      }else if ($scope.companyData[i].COMPANY_STATUS == "UNDER LIQUIDATION") {
        $scope.liquid++;
      }
      else {
        $scope.uStrikeOff++;
      }
    }
    console.log($scope.active);
    console.log($scope.strikeOff);
    console.log($scope.uStrikeOff);
    console.log($scope.dormant);
    console.log($scope.liquid);
  });

  $scope.propertyName = '';
  $scope.reverse = true;
  $scope.companyData = $scope.companyData;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

}]);
