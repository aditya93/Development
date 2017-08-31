angular.module('mainController',[])
.controller('mainCtrl',function(Auth, $timeout, $location, $rootScope){
	var app = this;
	app.loadme=false;

	$rootScope.$on('$routeChangeStart',function(){
		if(Auth.isLoggedIn()){
		app.isLoggedIn=true;
		Auth.getUser().then(function(data){
			app.username=data.data.username;
			app.useremail=data.data.email;
			app.loadme=true;
		});
	}else{
		app.username="";
		app.isLoggedIn=false;
		app.loadme=true;
	}

	});
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
					app.loginData="";
					app.successMsg=false;
				}, 1500);
			}else{
				//Create error message
				app.loading=false;
				app.errorMsg=data.data.message;
			}
		});
	};

	this.logout=function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		},2000);
	};
});
	



