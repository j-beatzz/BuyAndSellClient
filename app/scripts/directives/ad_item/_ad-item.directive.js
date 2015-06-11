'use strict';

angular.module('HuDeySell')
.directive('hdsItem', function() {
	return {
		restrict: 'E',
		scope: {
			ad: '=model'
		},
		controller: 'hdsItemController',
		templateUrl: 'views/templates/_ad-item.html',
		link: function($scope, element, attrs) {
			// console.log($scope.ad)
		}
	}
});


angular.module('HuDeySell')
.controller('hdsItemController', function($scope, $location) {
	console.log('controller is connected');

	$scope.showItem = function() {
		console.log('get')
		$location.path('/' + $scope.ad.id)
	};
});