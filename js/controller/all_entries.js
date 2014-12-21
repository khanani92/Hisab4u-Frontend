AccMgt.controller('allEntries',function($rootScope,$scope,$location, ngDialog,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    var Url = $location.$$path;
    var accountID = Url.substr(12,Url.length);
    $scope.is_data = false;

    $scope.all_Entries = [];

    var arrayLocation = '';




    $http({
        url:"http://localhost:3000/entry/allAccountEntries",
        data: {accountID:accountID},  //{email: data.email, pass: data.pass},//$scope.userData,
        method:"POST"
    }).success(function(res,textStatus){
        $scope.all_Entries  = res;
    }).error(
        function(){ console.log("Error");}
    )//Error



    $scope.openPOPup = function(){
        ngDialog.open({
            templateUrl:'templates/AddEntry.html',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope: $scope
        });
    }

    $scope.editEntryPop = function(loc, arrayLoc){
        ngDialog.open({
            templateUrl:'templates/EditEntry.html',
            className: 'ngdialog-theme-default ngdialog-theme-custom',
            scope: $scope
        });
        $scope.editData.entryID = loc ;
        arrayLocation  = arrayLoc;
        $scope.editData = {
            entryID:loc,
            newDate:$scope.all_Entries[arrayLocation].entryDate,
            newTF : $scope.all_Entries[arrayLocation].toFrom,
            newPurpose:$scope.all_Entries[arrayLocation].purpose,
            newAmount:$scope.all_Entries[arrayLocation].amount,
            form:$scope.all_Entries[arrayLocation].form};


    };

    //add entry code

    $scope.entriesData = {accountID:accountID, userID:userData._id,newDate:'',newTF : '',newPurpose:'',newAmount:'',form:''};
/*    hasDate = true;
    var hasTF = true;
    var hasPurpose = true;
    var hasAmount = true;
    */

    $scope.addEntry = function() {
/*        if ($scope.entriesData.newDate == '') {
            hasDate = false;
        }
        else if ($scope.entriesData.newTF == '') {
            hasTF = false
        }
        else if ($scope.entriesData.newPurpose == '') {
            hasPurpose = false
        }
        else if ($scope.entriesData.newAmount == '') {
            hasAmount = false
        }
        else {
        */

            var all_EntriesTemp = $scope.all_Entries;

            $http({
                url: "http://localhost:3000/entry/new",
                data: {entryData: $scope.entriesData},
                method: "POST"
            }).success(function (res, textStatus) {
                console.log("Success data edited");
                all_EntriesTemp.push(res.data);
                $scope.all_Entries = all_EntriesTemp;

            }).error(
                function () {
                    console.log("Error");
                }
            )

            ngDialog.close();
        }
/*
    }
    */


    //edit entry code


    $scope.editData = {entryID:'',newDate:'',newTF : '',newPurpose:'',newAmount:'',form:''};

    $scope.editEntry = function(){
        ngDialog.close();
        console.log($scope.editData);
        console.log($scope.all_Entries[arrayLocation].entryDate);
        var all_EntriesTemp = $scope.all_Entries;

        $http({
            url:"http://localhost:3000/entry/update",
            data: {entryData : $scope.editData},
            method:"POST"
        }).success(function(res,textStatus){
            console.log("Success data edited");
            all_EntriesTemp = res.data;
            $scope.all_Entries = all_EntriesTemp;

        }).error(
            function(){ console.log("Error");}
        )



    }

/*    $scope.delEntry = function(){
        $scope.all_Entries.slice($scope.location);

        ngDialog.close();
    }
 */
});
