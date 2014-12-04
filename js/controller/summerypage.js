AccMgt.controller('summeryPage',function($rootScope,$scope,$http,$location){
    var userID = ({userID:JSON.parse(sessionStorage.userData)._id})
    $scope.AccDetails = [];

/*    for(var i=0;i<4;i++){
        $scope.AccDetails.push({
            AccountName : "First "+i,
            Purpose : "Banking",
            LastUpdate : new Date()
        })
    }*/

    $http({
            url:"http://localhost:3000/account/getUserAccounts",
            data: userID,  //{email: data.email, pass: data.pass},//$scope.userData,
            method:"POST"
        }).success(function(res,textStatus){
            console.log("Success ");
            $scope.AccDetails  = res;
        }).error(
            function(){ console.log("Error");}
        )//Error



});
