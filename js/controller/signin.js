AccMgt.controller('signIn',function($rootScope,$scope,$http,$location){
    // function to submit the form after all validation has occurred

    if(userData && (Object.keys(userData).length > 0)){
        $location.path('/')
        if(!$scope.$$phase) $scope.$apply();

    }else {
        $scope.userData = {
            email: '',
            pass: ''
        };

        var data = {userData: $scope.userData};
        console.log(data);

        $scope.SignInForm = function () {
            $http({
                url: "http://localhost:3000/users/login",
                data: data,  //{email: data.email, pass: data.pass},//$scope.userData,
                method: "POST"
            }).success(function (res, textStatus) {
                if (res.status == 200) {
                    console.log(textStatus);
                    console.log("Success ");
                    console.log(res);

                    sessionStorage.setItem('userData', JSON.stringify(res.data));
                    $scope.err = '';
                    var geT = JSON.parse(sessionStorage.getItem('userData'));
                    $scope.go('/dashBoard');
                    if (!$scope.$$phase) $scope.$apply();
                    console.log("Sign IN... Session Storage Checking");
                    console.log(geT);
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
