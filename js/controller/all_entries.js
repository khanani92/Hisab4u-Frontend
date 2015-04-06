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


        $scope.entryData = {}
        $scope.close = function(){
            ngDialog.close();
        }
        $scope.addEntry = function(){
            var date = new Date();
            var day= date.getDate();
            var month= date.getMonth()+1;
            var year= date.getFullYear();

            var time= date.getHours()+'-'+date.getMinutes()

            if(($scope.entryData.amount)&&(isNaN($scope.entryData.amount) == false)&&($scope.entryData.amount.length > 0)){
                if(($scope.entryData.purpose)&&(($scope.entryData.purpose.length > 3)&&($scope.entryData.purpose.length < 100))){
                    if(($scope.entryData.toFrom)&&(($scope.entryData.toFrom.length > 3)&&($scope.entryData.toFrom.length < 20))){
                        if(($scope.entryData.date)&&(($scope.entryData.date.length > 0))){
                            if(($scope.entryData.form)&&(($scope.entryData.form.length > 0))){
                                $scope.entryData.createdDate = [time,day,month,year];
                                $scope.entryData.userID =userData._id
                                    $scope.entryData.accountID = accountID
                                        $http({
                                            url:"http://localhost:3000/entry/new",
                                            data: $scope.entryData,
                                            method:"POST"
                                        }).success(function(res,textStatus){
                                            //console.log(res);
                                            $scope.entryData = {}
                                            ngDialog.close();
                                            $location.path('/allEntries/'+accountID)
                                            if(!$scope.$$phase) $scope.$apply();
                                        }).error(
                                            function(){ console.log("Error");}
                                        )//Error

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

        $scope.openPOPup = function(){
            ngDialog.open({
                templateUrl:'templates/AddEntry.html',
                className: 'ngdialog-theme-default ngdialog-theme-custom',
                scope:$scope
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
