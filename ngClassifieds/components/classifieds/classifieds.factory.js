(function() {
	"use strict";

	angular
		.module("ngClassifieds")
		.factory("classifiedsFactory",function($http,$firebaseArray){
			var ref=new Firebase('https://postit-angulardemo.firebaseio.com/');	
			return{
				ref:$firebaseArray(ref)
			}
		});


})();
