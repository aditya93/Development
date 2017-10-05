angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){

	var app = this;

	 this.regUser = function(regData){
	 	app.loading=true;
	 	app.errorMsg=false;
	 	console.log(regData);
	 	User.create(app.regData).then(function(data){
			if(data.data.success){
				//Create success message
				app.loading=false;
				app.successMsg=data.data.message + "....Redirecting";
				//Redirect to homepage
				$timeout(function(){
					$location.path('/');
				}, 2000);
			}else{
				//Create error message
				app.loading=false;
				app.errorMsg=data.data.message;
			}
		});
	};
})

.controller('facebookCtrl',function($routeParams, Auth, $location, $window){
	
	var app = this;
	if($window.location.pathname == '/facebookerror'){
		app.errorMsg='Facebook email not found in the database';
	}else{
	Auth.facebook($routeParams.token);
	$location.path('/');
	}
});