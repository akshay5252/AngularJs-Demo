(function(){
	"use strict";
	angular
		.module("ngClassifieds")
		.filter("phoneFilter",function(){
			return function(phoneStr){
					var rez=[];
					if(phoneStr.length==10){
						rez.push('(');
						rez.push(phoneStr.substring(0,3));
						rez.push(')');
						rez.push(phoneStr.substring(3,6));
						rez.push('-');
						rez.push(phoneStr.substring(6));
					}
					return rez.join('');
				}
		})
		
		.directive("classifiedCard",function(){
			
			return{
				templateUrl:"components/classifieds/card/classified.card.tmpl.html",
				scope:{
					classifieds:"=",
					filterCriteria:"=filterCriteria",
					category:"=category"
				},
				controller:classifiedCardController,
				controllerAs:'vm'
			}

			
			function classifiedCardController($state,$scope,$mdDialog,$mdToast){

				var vm=this;
				vm.editClassified=editClassified;
				vm.deleteClassified=deleteClassified;

				function editClassified(classified){
			 	$state.go('classifieds.edit',{
			 		id:classified.$id			 		
			 		}); 
				}

				function deleteClassified(event,classified){
				
				var confirm=$mdDialog
								.confirm()
								.title('Are you sure you want delete' + classified.title + '?')
								.ok('Yes')
								.cancel('No')
								.targetEvent(event);
				$mdDialog.show(confirm).then(function(){
					$scope.classifieds.$remove(classified);
					showToast('Deleted Successfully');
				},function(){
					 
				});				
			}

			function showToast(message){
				$mdToast.show(
						$mdToast.simple()
							.content(message)
							.position('top, right')
							.hideDelay(3000)
						);
			}
			}
		})

})();