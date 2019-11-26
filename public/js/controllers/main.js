(function () {
angular.module('tpmGuildloot')
.controller('main',['$scope','$http',
function ($scope, $http) {
    $scope.lootList = [];

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

    $http.get('settings')
    .then(function (res) {
        $scope.settings = res.data;
        console.log($scope.settings);
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
        $scope.clearLoot();
    };

    $scope.selectItem = function(item) {
        console.log(item);
        let index = $scope.lootList.indexOf(item);
        if(index > -1){
            $scope.lootList.splice(index,1);
        }
        else{
            $scope.lootList.push(item);
        }
    };

    $scope.clearLoot = function(){
        $scope.lootList = [];
    };

    $scope.calculateGP = function (base, multiplier) {
        return Math.round(base * multiplier);
    };
}]);
})();
