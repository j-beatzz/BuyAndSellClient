'use strict';

angular.module('HuDeySell')
.controller('AppController', function($scope, $location, NATION, HuDeySellAPIService, HuDeySellTempCache){
	var params = {
		'nation': NATION
	};

	var validateString = function(string) {
		if(angular.isDefined(string) && angular.isString(string) && string != "") {
			console.log(string);
			return true;
		}		
		return false;
	}

	var displayAdsList = function() {
		if($scope.ds_for_town.length > 0) {
			$scope.has_items = true;
		} else {
			$scope.has_items = false;
		}
	}

	//Get location. To be added in later update
	$scope.ds_for_town = HuDeySellTempCache.get("last-search-result", true) || [];
	displayAdsList();

	HuDeySellAPIService.getStates(params,
		function(data, status, header) {
			console.log(data);
	},	function(data, status, header) {
			console.log(data, status, header);
	});

	$scope.showItem = function(id) {
		$location.path('/town' + id)
	};

	$scope.submit = function() {
		var state = $scope.state;
		var town = $scope.town;
		var category = $scope.category;
		if(validateString(state) /*&& validateString(town) && validateString(category)*/) {
			// $scope.state = "";
			// $scope.town = "";
			// $scope.category = "";

			params['state'] = state;
			params['town'] = town;

			// HuDeySellAPIService.getTownsForState(params,
			// 	function(data, status, header) {
			// 		console.log(data);
			// 	}, function(data, status, header) {
			// 		console.log(data, status, header);
			// 	});


			HuDeySellAPIService.getAdsForTown(params,
				function(data, status, header) {
					HuDeySellTempCache.set("last-search-result", data.ads, true);
					$scope.ds_for_town = data.ads;
					console.log("optained");
					if(data.ads.length > 0) {
						$scope.has_items = true;
					}
				}, function(data, status, header) {
					console.log(data, status, header);
				});


		} else {
			console.log("invalid params");
		}
	};

	$scope.stateSelected = function(e)  {
		if(e.which == 13) {
			$('#input-town').focus();
			//$scope.submit();
		}
	};

	$scope.townSelected = function(e)  {
		if(e.which == 13) {
			$('#input-category').focus();
		}
	};

	$scope.categorySelected = function(e)  {
		if(e.which == 13) {
			$scope.submit();
		}
	};

	$scope.createNewAd = function() {
		$location.path('/create-ad');
	};

	$scope.$watch(function(){
		return $scope.ds_for_town;
	}, function() {
		displayAdsList();
	})
});	