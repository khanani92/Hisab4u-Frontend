AccMgt.controller('newAccount',function($rootScope,$scope,$http,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
    $scope.accountData = {
        userID: '',
        accountName: '',
        purpose: '',
        createdDate: ''
    };



    $scope.Add_Call  = function(){
        //var date = new Date();

        $scope.accountData.createdDate = new Date();

        $scope.accountData.userID = JSON.parse(sessionStorage.getItem('userData'))
        //var currentDate = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+" "+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();

        console.log("New Account session check, ID is : ");
        console.log($scope.accountData.userID);

        var data = {accountData: $scope.accountData};

        $http({
            url:"http://localhost:3000/account/new",
            data: data,
            method:"POST"
        }).success(function(res,textStatus){
                console.log(res);
            }).error(
            function(){ console.log("Error");}
        )//Error
        console.log(data.accountData.createdDate);
    }
}else{
    $location.path('/')
    if(!$scope.$$phase) $scope.$apply();
}


});
