(function () {
angular.module('tpmGuildloot')
.controller('main',['$scope','$http',
function ($scope, $http) {
    $http.get('enums')
    .then(function (res) {
        $scope.enums = res.data;

        $http.post(
            'lootlist/get-instances',
            {contentType:[
                    $scope.enums.contentType.byNumber[$scope.enums.contentType.byName.RAID40_CONTENT],
                    $scope.enums.contentType.byNumber[$scope.enums.contentType.byName.RAID20_CONTENT]
                ]}
        )
        .then(function (res) {
            $scope.raids = res.data;
        })
    });

    $scope.selectRaid = function(raid){
        $scope.selectedRaid = raid;
        $http.post(
            'lootlist/get-bosses',
            {boss_id: raid.bosses}
        )
        .then(function (res) {
            $scope.bosses = res.data;
            $scope.selectBoss($scope.bosses[0]);
        });
    };

    $scope.selectBoss = function (boss) {
        $scope.selectedBoss = boss;
    };
}]);
})();
