angular.module('mainController',[])
.controller('mainCtrl',function(Auth,$timeout,$location){
	var app = this;

	 this.doLogin = function(loginData){
	 	app.loading=true;
	 	app.errorMsg=false;
	 	console.log(loginData);
	 	Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				//Create success message
				app.loading=false;
				app.successMsg=data.data.message + "....Redirecting";
				//Redirect to homepage
				$timeout(function(){
					$location.path('/about');
				}, 1500);
			}else{
				//Create error message
				app.loading=false;
				app.errorMsg=data.data.message;
			}
		});
	};
});
	



