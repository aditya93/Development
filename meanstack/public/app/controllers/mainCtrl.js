angular.module('mainController',[])
.controller('mainCtrl',function(Auth, $timeout, $location, $rootScope){
	var app = this;

	$rootScope.$on('$routeChangeStart',function(){
		if(Auth.isLoggedIn()){
		console.log('SUCCESS LOGGED IN');
		Auth.getUser().then(function(data){
			console.log(data.data.username);
			app.username=data.data.username;
		});
	}else{
		console.log('NOT LOGGED IN');
		app.username="";
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
	



