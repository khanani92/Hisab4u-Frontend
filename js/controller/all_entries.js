AccMgt.controller('allEntries',function($rootScope,$scope,$location, ngDialog){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
    var Url = $location.$$path;
    var userIDTo = Url.substr(12,Url.length);
    console.log(userIDTo)
$scope.is_data = false



    $scope.all_Entries = {};
    $scope.Entries_Call  = function(){

    }

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
