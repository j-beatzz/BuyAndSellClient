'use strict';

angular.module('HuDeySell')
.controller('ShowAdController', function($scope, $location, $routeParams, HuDeySellAPIService) {
	// $scope.buying = true;
	$scope.ad = {};
	var params = {
		id: $routeParams.ad_id
	};
	HuDeySellAPIService.getAd(params, function(data, status, header){
		$scope.ad.id = $routeParams.ad_id;
		$scope.ad.adDescription = data.description;
		$scope.ad.adPrice = data.price;
		$scope.ad.adCreatorName = data.creator_name;
		$scope.ad.adCreatorEmail = data.creator_email;
		$scope.ad.adCreatorPhone = data.creator_phone;

		// $scope.$digest();
	}, function(data, status, header) {
		console.log(data)
	});

	$scope.back = function(){
		$location.path('/');
	}

	// $scope.$watch(function(){
	// 	return $scope.ad;
	// }, function)
})