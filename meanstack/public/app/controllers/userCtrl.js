angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){

	var app = this;

	 this.regUser = function(regData, valid){
	 	app.loading=true;
	 	app.errorMsg=false;
	 	console.log(regData);

	 	if(valid)
	 	{
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
	 	}else
	 	{
	 		//Create error message
				app.loading=false;
				app.errorMsg="Please ensure form details filled properly.";
	 	}
	};

	this.checkUsername=function(regData)
	{
		app.checkingUsername = true;
		app.usernameMsg = false;
		app.usernameInvalid = false;

		User.checkUsername(app.regData).then(function(data){
			if(data.data.success){
				app.checkUsername = false;
				app.usernameInvalid = false;
				app.usernameMsg = data.data.message;
			}else{
				app.checkingUsername = false;
				app.usernameInvalid = true;
				app.usernameMsg = data.data.message;
			}
		});
	}

	this.checkEmail=function(regData)
	{
		app.checkingEmail = true;
		app.emailMsg = false;
		app.emailInvalid = false;

		User.checkEmail(app.regData).then(function(data){
			if(data.data.success){
				app.checkEmail = false;
				app.emailInvalid = false;
				app.emailMsg = data.data.message;
			}else{
				app.checkingEmail = false;
				app.emailInvalid = true;
				app.emailMsg = data.data.message;
			}
		});
	}
})

.controller('facebookCtrl',function($routeParams, Auth, $location, $window){
	
	var app = this;
	if($window.location.pathname == '/facebookerror'){
		app.errorMsg='Facebook email not found in the database';
	}else{
	Auth.facebook($routeParams.token);
	$location.path('/');
	}
})

.controller('twitterCtrl',function($routeParams, Auth, $location, $window){
	
	var app = this;
	if($window.location.pathname == '/twittererror'){
		app.errorMsg='Twitter email not found in the database';
	}else{
	Auth.twitter($routeParams.token);
	$location.path('/');
	}
})

.controller('googleCtrl',function($routeParams, Auth, $location, $window){
	
	var app = this;
	if($window.location.pathname == '/googleerror'){
		app.errorMsg='Google email not found in the database';
	}else{
	Auth.google($routeParams.token);
	$location.path('/');
	}
});