(function(){
	"use strict";
	 angular
		.module('ngClassifieds')
		.controller('newClassifiedsController', function($state,$scope,$mdSidenav,$mdToast,$timeout,$mdDialog,classifiedsFactory){
			
			var vm=this;
			vm.classifieds=classifiedsFactory.ref;
			vm.closeSideBar=closeSideBar;
			vm.saveClassified=saveClassified;
			vm.classifieds.$loaded().then(function(classifieds){
				vm.categories=getCategory(classifieds);
			});

			function getCategory(classifieds){
				var categories=[];
				angular.forEach(classifieds,function(item){
					angular.forEach(item.categories,function(category){
						categories.push(category);
					});
				});	
				return _.uniq(categories);
			}
			
			$scope.$watch('sidenavOpen',function(sidenav){
					if(sidenav===false){
						$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');
						});
					}
			});

			$timeout(function(){
				$mdSidenav('left').open();
			});
			
			
			function closeSideBar(){
				vm.classified={};
				$scope.sidenavOpen=false;
			}

			function saveClassified(classified){
				if(classified){
					/*classified.contact={
						name: "Akshay Ganji",
						phone: "(312)-785-3228",
						email: "ganji323@gmail.com"
					}*/
					
					/*$scope.$emit('newClassified',classified);*/
					vm.classifieds.$add(classified);
				    showToast('Classified Saved Successfully!');
					closeSideBar();
				}
			}

			function showToast(message){
				$mdToast.show(
						$mdToast.simple()
							.content(message)
							.position('top, right')
							.hideDelay(1000)
						);
			}
		}); 
})();