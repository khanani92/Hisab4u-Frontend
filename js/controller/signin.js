AccMgt.controller('signIn',function($rootScope,$scope,$http,$location){
    // function to submit the form after all validation has occurred
    var userData =  JSON.parse(sessionStorage.getItem('userData'));
    if(userData && (Object.keys(userData).length > 0)){
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();

    }else {
        $scope.userData = {
            email: '',
            pass: ''
        };
        $scope.err = ''
        var data = {userData: $scope.userData};


        $scope.SignInForm = function () {
            $http({
                url: "http://localhost:3000/users/login",
                data: data,  //{email: data.email, pass: data.pass},//$scope.userData,
                method: "POST"
            }).success(function (res, textStatus) {
                if (res.status == 200) {
                    console.log(textStatus);
                    console.log("Success ");
                   // console.log(res);
                    sessionStorage.setItem('userData', JSON.stringify(res.data.data));
                    $scope.go('/dashBoard');
                    if (!$scope.$$phase) $scope.$apply();

                } else {
                    $scope.err = res.data.msg;
                    //console.log(textStatus)
                }
            }).error(
                function () {
                    console.log("Error");
                }
            )//Error

        };


        $scope.go = function (path) {
            $location.path(path);
        }
    }
})
