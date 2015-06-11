'use strict';

angular.module('HuDeySell')
.service('HuDeySellAPIService', ['$http', '$log', 'API_URL', 'NATION', function($http, $log, API_URL, NATION) {
	var huDeySellAPIService = function() {
		var self = this;
		var validateParams = function(params) {
			var error = "";
			if (!angular.isDefined(params)) {
				error = "Invalid Params";
			}

			if (!angular.isDefined(params.nation_id)) {
				error = "Invalid Params - nation_id";
			}

			if (!angular.isDefined(params.state_id)) {
				error = "Invalid Params - state_id";
			}

			return error;
		};

		var validateFunc =  function(func) {
			if(angular.isDefined(func) && angular.isFunction(func)){
				return true;
			}
			return false;
		};

		self.getStates = function(params, success, error) {
			var validation = validateParams(params);

			// if (validation != "") {
			// 	if (validateFunc(error)) {
			// 		error(validation);
			// 	}
			// 	return;
			// }

			var url = API_URL + 'states';

			$http.get(url, {
				params: params
			}).success(function(data, status, header) {
				if(validateFunc(success)) {
					success(data, status, header);
				}
			}).error(function(data, status, header) {
				if(validateFunc(error)) {
					error(data, status, header);
				}
			});
		};

		self.getTownsForState = function(params, success, error) {
			var validation = validateParams(params);

			// if (validation != "") {
			// 	if (validateFunc(error)) {
			// 		error(validation);
			// 	}
			// 	return;
			// }

			var url = API_URL + 'towns_for_state';

			$http.get(url, {
				params: params
			}).success(function(data, status, header) {
				if(validateFunc(success)) {
					success(data, status, header);
				}
			}).error(function(data, status, header) {
				if(validateFunc(error)) {
					error(data, status, header);
				}
			});
		};

		self.createAd = function(params,success, error) {
			var validation = validateParams(params);

			// if (validation != "") {
			// 	if (validateFunc(error)) {
			// 		error(validation);
			// 	}
			// 	return;
			// }

			var url = API_URL + 'create_ad';
			params["nation"] = NATION;
			$http.post(url, params).success(function(data, status, header) {
				if(validateFunc(success)) {
					// success(data, status, header);
				}
				console.log(data)
			}).error(function(data, status, header) {
				if(validateFunc(error)) {
					// error(data, status, header);
				}
				console.log(header)
			});	
		}

		// Get Ads for Town
		self.getAdsForTown = function(params, success, error) {
			var validation = validateParams(params);

			// if( validation != "") {
			// 	if(validateFunc(error)) {
			// 		error(validation)
			// 	}
			// 	return;
			// }

			var url = API_URL + 'get_ads_for_town'


			$http.get(url, {
					params: params
				}).
				success(function(data, status, header) {
					if (validateFunc(success)){
						success(data);
					}
				}).
				error(function(data, status, header) {
					if (validateFunc(error)){
						error(status);
					}
				});
		};

		// Get an Ad
		self.getAd = function(params, success, error) {
			var validation = validateParams(params);

			// if(validation != "") {
			// 	if(validateFunc(error)) {
			// 		error(validation);
			// 	}
			// 	return;
			// }

			// if(!angular.isDefined(params.id) || !angular.isNumber(params.id)){
			// 	if(validateFunc(error)) {
			// 		error("Invalid Params - ad id (id)");
			// 	}

			// 	return;
			// }
			var url = API_URL +  '/show_ad/' + params.id;

			$http.get(url).
				success(function(data, status, header) {
					if (validateFunc(success)){
						success(data);
					}
				}).
				error(function(data, status, header) {
					if (validateFunc(error)){
						error(status);
					}
				});
		};

		// Edit Ads
		self.updateAd = function(params, callback) {
			var validation = validateParams(params);

			if(validation != "") {
				if(validateFunc(callback)) {
					callback(validation);
				}
				return;
			}

			if(!angular.isDefined(params.id) || !angular.isNumber(params.id)){
				if(validateFunc(callback)) {
					callback("Invalid Params - ad id (id)");
				}

				return;
			}

			// TODO: Add more validation to check cumpolsury fields

			var url = API_URL + params.nation_id + '/states/' 
					+ params.state_id + '/towns/' + params.town_id + '/ads/'
					+ params.id;

			$http.patch(url,{
					params: params
				}).
				success(function(data, status, header) {
					if (validateFunc(callback)){
						callback(status);
					}
				}).
				error(function(data, status, header) {
					if (validateFunc(callback)){
						callback(status);
					}
				});

		};

		// Delete Ads
		self.deleteAd = function(params, callback) {
			var validation = validateParams(params);

			if(validation != "") {
				if(validateFunc(callback)) {
					callback(validation);
				}
				return;
			}

			if(!angular.isDefined(params.id) || !angular.isNumber(params.id)){
				if(validateFunc(callback)) {
					callback("Invalid Params - ad id (id)");
				}

				return;
			}

			var url = API_URL + params.nation_id + '/states/' 
					+ params.state_id + '/towns/' + params.town_id + '/ads/'
					+ params.id;

			$http.delete(url).
				success(function(data, status, header) {
					if (validateFunc(callback)){
						callback(status);
					}
				}).
				error(function(data, status, header) {
					if (validateFunc(callback)){
						callback(status);
					}
				});
		};
	};

	return new huDeySellAPIService();
}]);