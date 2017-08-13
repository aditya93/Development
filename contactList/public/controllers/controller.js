var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', function($scope, $http) 
{
    console.log("Hello World from controller");
    console.log("hi");

    var refresh=function(){
    $http.get("/contactlist").success(function(response){
        console.log("I got the data which I requested");
        $scope.contactList=response;
        $scope.contact="";
    });
    }

    refresh();

    $scope.addContact =function()
    {
    	console.log($scope.contact);
        $http.post('/contactlist',$scope.contact);
        refresh();
    };

    $scope.remove=function(id)
    {
        console.log(id);
        $http.delete('/contactlist/' +id).success(function(response){
            console.log(response);
            //refresh();
        });
        refresh();
    };

    $scope.edit=function(id)
    {
        console.log(id);
        $http.get('/contactlist/' +id).success(function(response){
            $scope.contact=response;
        });
    };

    $scope.update=function()
    {
        console.log($scope.contact._id);
        $http.put('/contactlist/'+ $scope.contact._id , $scope.contact).success(function(response){
            refresh();
        });
    }
    $scope.deselect=function()
    {
        $scope.contact="";
    }
});