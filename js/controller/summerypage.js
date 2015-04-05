AccMgt.controller('summeryPage',function($rootScope,$scope,$http,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    $scope.AccDetails = [];

    if(userData && (Object.keys(userData).length > 0)){
    $http({
            url:"http://localhost:3000/account/getUserAccounts",
            data: userData._id,  //{email: data.email, pass: data.pass},//$scope.userData,
            method:"POST"
        }).success(function(res,textStatus){
            console.log("Success ");
            $scope.AccDetails  = res;
        }).error(
            function(){ console.log("Error");}
        )//Error
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }


});
