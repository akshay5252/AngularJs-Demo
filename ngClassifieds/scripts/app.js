angular 
	.module("ngClassifieds",['ngMaterial','ui.router','firebase'])
	.config(function($mdThemingProvider,$stateProvider) {
		
		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('blue');

			

		$stateProvider
			.state('classifieds',{
				url:'/classifieds',
				templateUrl:'components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsController as vm'
			})
			.state('classifieds.new',{
				url:'/new',
				templateUrl:'components/classifieds/new/classifieds.new.tmpl.html',
				controller: 'newClassifiedsController as vm'
			})
			.state('classifieds.edit',{
				url:'/edit/:id',
				templateUrl:'components/classifieds/edit/classifieds.edit.tmpl.html',
				controller: 'editClassifiedsController as vm',
				params:{
					classified:null
				}
			});
			
	});
	