'use strict';

angular.module('HuDeySell')
.controller('AppController', function($scope, $location, NATION, HuDeySellAPIService, HuDeySellTempCache){
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
			$scope.getAds($scope.state, $scope.town, 0)

		} else {
			console.log("invalid params");
		}
	};

	$scope.currentPage = 1;
	$scope.numberOfItems = 0;
	$scope.paginationMaxSize = 5;

	$scope.pageChange = function() {
		console.log("testing");
		// No need to validate state and town here because pagination will not be shown 
		// if on submit of the search form, the validation there fails
		$scope.getAds($scope.state, $scope.town, $scope.currentPage - 1);
	}

	$scope.getAds = function(state, town, page) {
		var params = {
			'nation': NATION,
			'state': state,
			'town': town,
			'current_page': page
		};

		HuDeySellAPIService.getAdsForTown(params,
			function(data, status, header) {
				HuDeySellTempCache.set("last-search-result", data.ads, true);
				$scope.ds_for_town = data.ads;
				$scope.currentPage = data.current_page + 1;
				$scope.numberOfItems = (data.ads_per_page * data.number_of_pages);

				console.log($scope.currentPage)
				console.log($scope.numberOfItems)
				console.log("optained");
				if(data.ads.length > 0) {
					$scope.has_items = true;
				}
			}, function(data, status, header) {
				console.log(data, status, header);
			});	
	}

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