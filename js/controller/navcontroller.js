AccMgt.controller('navController',function($rootScope,$scope,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    //$scope.logToggle = false;
    $scope.signOut = function(){
    //    $scope.showToggle = !e;
        sessionStorage.removeItem('userData')
        $rootScope.logToggle = true;
    }
    if(userData && (Object.keys(userData).length > 0)){
        $rootScope.logToggle = false;
    }else{
        $rootScope.logToggle = true;
    }


});