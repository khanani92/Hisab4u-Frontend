AccMgt.controller('signUp',function($rootScope,$scope,$http,$location, ngDialog){
    // function to submit the form after all validation has occurred
    $scope.userData={
        username: '',
        email: '',
        pass: ''
    };

    var data = {userData: $scope.userData};

    $scope.submitForm = function() {
        console.log($scope.userData);
        $http({
            url:"http://localhost:3000/users/register",
            data: data, //{username: data.username, email: data.email, pass: data.pass},//$scope.userData,
            method:"POST"
        }).success(function(res,textStatus){
                if(res.msg != 'email found'){
                    location.href = 'http://localhost:63342/grayscale/index.html#/signIn';
                }
                else{
                    ngDialog.open({
                        templateUrl:'templates/AlreadyRegistered.html',
                        className: 'ngdialog-theme-default ngdialog-theme-custom'
                    })
                }
                console.log(res);
            }).error(
            function(){ alert("Error");}
        )//Error
        //console.log(data.email);


        // check to make sure the form is completely valid
//        if ($scope.userForm.$valid) {
//            alert('Validate Form !');
//        }
    };


  /*  $scope.go = function (path){
        $location.path(path);
    }*/

})
