AccMgt.controller('allEntries',function($rootScope,$scope,$location, ngDialog,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'))
    var Url = $location.$$path;
    var accountID = Url.substr(12,Url.length);
    console.log(accountID);
    $scope.is_data = false
    $scope.all_Entries = [];


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


    $scope.Entries_Call  = function(){


    }

    $scope.openPOPup = function(){
        ngDialog.open({
            templateUrl:'templates/AddEntry.html',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope: $scope
        });
    }

    $scope.editEntry = function(){
        ngDialog.open({
            templateUrl:'templates/EditEntry.html',
            className: 'ngdialog-theme-default ngdialog-theme-custom'
        });
    }



    $scope.entriesData = {accountID:accountID, userID:userData._id,newDate:'',newTF : '',newPurpose:'',newAmount:'',form:''}

    $scope.addEntry = function(){

        alert($scope.entriesData);

        $http({
            url:"http://localhost:3000/entry/new",
            data: {entryData : $scope.entriesData},
            method:"POST"
        }).success(function(res,textStatus){
            console.log("Success ");
            $scope.all_Entries.push  = res;
        }).error(
            function(){ console.log("Error");}
        )//Error



        ngDialog.close();

    }

});
