(function () {
angular.module('tpmGuildloot')
.controller('items',['$scope','$http',
function ($scope, $http) {
    $http.get('/enums')
    .then(function (res) {
        $scope.enums = res.data;
        console.log($scope.enums);
    });

    let findItems = function (itemIds) {

    };
}])
})();
