(function () {
angular.module('tpmGuildloot')
.controller('set-priority',['$scope','$http', 'orderByFilter',
    function ($scope, $http, orderBy) {

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
            $scope.selectedBoss.loot = orderBy($scope.selectedBoss.loot, 'name', false);
        };

        $scope.refreshItem = function (item, i) {
            $http.post(
                'lootlist/wowhead-request',
                {itemId:item.itemId}
            )
                .then(function (res) {
                    if(i !== undefined){
                        $scope.selectedBoss.loot[i] = res.data;
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        };

        $scope.refreshBossLoot = function(){
            $scope.selectedBoss.loot.forEach(function (item, i) {
                $scope.refreshItem(item, i);
            });
        };

        $scope.calculateGP = function (base, multiplier) {
            return Math.round(base * multiplier);
        };
    }]);
})();
