angular.module("authServices",[])
 .factory('Auth',function($http){
 	var authFactory = {};

 //	User.create(regData)
 	authFactory.login = function(loginData){
 		return $http.post('/api/authenticate',loginData);
 		}
	return authFactory;
 });

// .factory('AuthToken',function(){
// 	var authTokenFactory = {};

// //AuthToken.setToken(token);
// 	authTokenFactory.setToken=function(){
// 		$window.localStorage.setItem('token':token);
// 	}
// 	return authTokenFactory;
// });