AccMgt.controller('summeryPage',function($rootScope,$scope,$http,$location){
    $scope.AccDetails = [];

    for(var i=0;i<4;i++){
        $scope.AccDetails.push({
            AccountName : "First "+i,
            Purpose : "Banking",
            LastUpdate : new Date()
        })
    }
});
