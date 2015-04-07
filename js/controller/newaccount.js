AccMgt.controller('newAccount',function($rootScope,$scope,$http,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
    $scope.accountData = {
        userID: '',
        accountName: '',
        purpose: '',
        createdDate: ''
    };

$scope.close = function(){
    $location.path('/dashBoard')
    if(!$scope.$$phase) $scope.$apply();
}

    $scope.Add_Call  = function(){
        var date = new Date();
   var day= date.getDate();
   var month= date.getMonth()+1;
   var year= date.getFullYear();

   var time= date.getHours()+'-'+date.getMinutes()
        $scope.accountData.createdDate = [time,day,month,year];

        $scope.accountData.userID = userData._id
        //var currentDate = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+" "+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();

      //  console.log("New Account session check, ID is : ");
       // console.log($scope.accountData.userID);

        var data = {accountData: $scope.accountData};

        $http({
            url:"http://localhost:3000/account/new",
            data: data,
            method:"POST"
        }).success(function(res,textStatus){
                //console.log(res);
            $location.path('/dashBoard')
            if(!$scope.$$phase) $scope.$apply();
            }).error(
            function(){ console.log("Error");}
        )//Error
    }
}else{
    $location.path('/')
    if(!$scope.$$phase) $scope.$apply();
}


});
