(function(){

	"use strict";

	angular
		.module('ngClassifieds')
		.controller('editClassifiedsController', function($state,$scope,$mdSidenav,$timeout,$mdDialog,classifiedsFactory){
			var vm=this;
			vm.classifieds=classifiedsFactory.ref;
			vm.closeSideBar=closeSideBar;
			vm.saveEdit=saveEdit;
			
			vm.classified=vm.classifieds.$getRecord($state.params.id);

			$timeout(function(){
				$mdSidenav('left').open();
			});
			
			$scope.$watch('vm.sidenavOpen',function(sidenav){
					if(sidenav===false){
						$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');
						});
					}
			});

			function closeSideBar(){
				vm.sidenavOpen=false;
			}

			function saveEdit(){
				vm.classifieds.$save(vm.classified).then(function(){
					$scope.$emit('editSaved','Edit Saved!')
					vm.sidenavOpen=false;	
				})
			}
		}); 
})();