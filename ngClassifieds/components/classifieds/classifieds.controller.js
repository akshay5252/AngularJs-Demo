(function(){
	"use strict";
	angular
		.module("ngClassifieds")
		.controller("classifiedsController",function($scope,$state,$http,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog){

			function phoneFilter(){
				return function(phoneStr){
					var rez=[];
					if(phoneStr.length==10){
						rez.push('(');
						rez.push(phoneStr.substring(0,3));
						rez.push(') ');
						rez.push(phoneStr.substring(3,6));
						rez.push('-');
						rez.push(phoneStr.substring(6));
					}
					return rez.join('');
				}
			}
			var vm = this;
		
			vm.closeSideBar=closeSideBar;
			vm.openSideBar=openSideBar;			
			

			vm.classifieds=classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds){
				vm.categories=getCategory(classifieds);
			});
			

			$scope.$on('newClassified',function(event,classified){
				vm.classifieds.$add(classified);
				showToast('Classified Saved Successfully!');
				
			});

			$scope.$on('editSaved', function(event,message){
				showToast(message);
			});

			function openSideBar(){
				$state.go('classifieds.new');
			}

			function closeSideBar(){
				$mdSidenav('left').close();
			}

			function getCategory(classifieds){
				var categories=[];
				angular.forEach(classifieds,function(item){
					angular.forEach(item.categories,function(category){
						categories.push(category);
					});
				});	
				return _.uniq(categories);
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