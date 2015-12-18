'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //retrieve the Model from localStorage
    var loadModel = function(){
    	var model = {
    		watchlists: localStorage['StockDog.watchlists'] ? 
    		JSON.parse(localStorage['StockDog.watchlists']) : [],
    		nextId : localStorage['StockDog.nextId'] ?
    		   parseInt(['StockDog.nextId']) : 0
    	};
    	return model;
    };

    //Save Model to local Storage
    var saveModel = function(){
    	localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
    	localStorage['StockDog.nextId'] = Model.nextId;
    };

    var findById = function(listId){
    	return _.find(Model.watchlists, function(watchlist){
    		return watchlist.id == parseInt(listId);
    	});
    };

    this.query = function(listId){
    	if(listId){
    		return findById(listId);
    	}else{
    		return Model.watchlists;
    	}
    };

    this.save = function(watchlist){
    	watchlist.id = Model.nextId++;
    	Model.watchlists.push(watchlist);
    	saveModel();
    };

    this.remove = function(watchlist){
    	_.remove(Model.watchlists, function(list){
    		return list.id == watchlist.id;
    	});
    	saveModel();
    };

    var Model = loadModel();

  });
