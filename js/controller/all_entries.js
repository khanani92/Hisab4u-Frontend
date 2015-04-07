AccMgt.controller('allEntries',function($rootScope,$scope,$location, ngDialog,$http){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        var Url = $location.$$path;
        var accountID = Url.substr(12,Url.length);

        $scope.updateEntries = function() {
           $scope.totalDebit =0;
           $scope.totalCredit = 0
           $scope.currentAmount = 0
            $http({
                url: "http://localhost:3000/entry/allAccountEntries",
                data: {accountID: accountID},  //{email: data.email, pass: data.pass},//$scope.userData,
                method: "POST"
            }).success(function (res, textStatus) {
                console.log("Success ");
                res.forEach(function(entry){
                  if(entry.transactionType == 'Credit'){
                      $scope.totalCredit += parseInt(entry.amount);
                  }else{
                      $scope.totalDebit += parseInt(entry.amount);
                  }
                    $scope.currentAmount += parseInt(entry.amount);
                })


                $scope.currentAmount -= $scope.totalDebit;
                $scope.all_Entries = res;
            }).error(
                function () {
                    console.log("Error");
                }
            )//Error
        }

        //$scope.all_Entries = {};
        //$scope.Entries_Call  = function(){

        //}
        $scope.updateEntries()

        $scope.entryData = {}
        $scope.close = function(){
            $scope.entryData = {};
            ngDialog.close();
        }
        $scope.addEntry = function(){
            validateAndAction('new')
        }




        $scope.openPOPup = function(){
            $scope.entryData = {};
            ngDialog.open({
                templateUrl:'templates/AddEntry.html',
                className: 'ngdialog-theme-default ngdialog-theme-custom',
                scope:$scope
            });
        }

        $scope.editEntry = function(entryId){
            ngDialog.open({
                templateUrl:'templates/EditEntry.html',
                className: 'ngdialog-theme-default ngdialog-theme-custom',
                scope:$scope
            });
             console.log(entryId)

            var entryTemp =  $scope.all_Entries.filter(function(entry) {
                       return entryId == entry._id;
            })
            if((entryTemp)&&(entryTemp.length > 0)){
                //entryTemp[0].entryDate = new Date(entryTemp[0].entryDate)
                $scope.entryData = entryTemp[0];
            }
        }

        $scope.updateEntry =function(){
              validateAndAction('update')
        }

        $scope.deleteEntry = function(entryID){
            $http({
                url: "http://localhost:3000/entry/delete",
                data: {entryID: entryID},
                method: "POST"
            }).success(function (res, textStatus) {
                console.log("Success ");
                $scope.updateEntries()
            }).error(
                function () {
                    $scope.updateEntries()
                    console.log("Error");
                }
            )//Error
        }

        var validateAndAction = function(event){
            if(event == 'new'){
                var date = new Date();
                var day= date.getDate();
                var month= date.getMonth()+1;
                var year= date.getFullYear();
                var time= date.getHours()+'-'+date.getMinutes();
                $scope.entryData.createdDate = [time,day,month,year];
            }else{
                $scope.entryData.updateDate = [time,day,month,year];
            }


            if(($scope.entryData.amount)&&(isNaN($scope.entryData.amount) == false)&&($scope.entryData.amount.length > 0)){
                if(($scope.entryData.purpose)&&(($scope.entryData.purpose.length > 2)&&($scope.entryData.purpose.length < 100))){
                    if(($scope.entryData.toFrom)&&(($scope.entryData.toFrom.length > 2)&&($scope.entryData.toFrom.length < 20))){
                        if(($scope.entryData.entryDate)&&(($scope.entryData.entryDate.length > 0))){
                            if(($scope.entryData.form)&&(($scope.entryData.form.length > 0))){
                                if(($scope.entryData.transactionType)&&(($scope.entryData.transactionType.length > 0))){

                                $scope.entryData.userID =userData._id
                                $scope.entryData.accountID = accountID
                                $http({
                                    url:"http://localhost:3000/entry/"+event,
                                    data: $scope.entryData,
                                    method:"POST"
                                }).success(function(res,textStatus){
                                    //console.log(res);
                                    $scope.entryData = {}
                                    $scope.updateEntries()
                                    //$location.path('/allEntries/'+accountID)
                                    //if(!$scope.$$phase) $scope.$apply();
                                    ngDialog.close();

                                }).error(
                                    function(){ console.log("Error");}
                                )//Error
                                }else{
                                    console.log('check amount Property')
                                }
                            }else{
                                console.log('check amount Form')
                            }
                        }else{
                            console.log('check entry Date')
                        }
                    }else{
                        console.log('check entry To/From')
                    }
                }else{
                    console.log('check entry Purpose')
                }
            }else{
                console.log('check entry Amount')
            }

        }

        $scope.goBack = function(){
            $location.path('/dashBoard')
            if(!$scope.$$phase) $scope.$apply();
        }

    }else{
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();
    }

});
