AccMgt.controller('navController',function($rootScope,$scope,$location){
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    //$scope.logToggle = false;
    $scope.signOut = function(){
    //    $scope.showToggle = !e;
        sessionStorage.removeItem('userData')
        $scope.logToggle = true;
    }
    if(userData && (Object.keys(userData).length > 0)){
        $scope.logToggle = false;
    }else{
        $scope.logToggle = true;
    }


});