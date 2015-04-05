AccMgt.controller('allEntries',function($rootScope,$scope,$location, ngDialog,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        var Url = $location.$$path;
        var accountID = Url.substr(12,Url.length);
        console.log(accountID)

        $http({
            url:"http://localhost:3000/entry/allAccountEntries",
            data: {accountID:accountID},  //{email: data.email, pass: data.pass},//$scope.userData,
            method:"POST"
        }).success(function(res,textStatus){
            console.log("Success ");
            $scope.all_Entries  = res;
        }).error(
            function(){ console.log("Error");}
        )//Error


        //$scope.all_Entries = {};
        //$scope.Entries_Call  = function(){

        //}

        $scope.openPOPup = function(){
            ngDialog.open({
                templateUrl:'templates/AddEntry.html',
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });
        }

        $scope.editEntry = function(){
            ngDialog.open({
                templateUrl:'templates/EditEntry.html',
                className: 'ngdialog-theme-default ngdialog-theme-custom'
            });
        }
    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }

});
