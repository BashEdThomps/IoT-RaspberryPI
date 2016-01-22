/*
  Ash's RaspberryPI IO Remote.
  email: ashthompson06@gmail.command
  repo: https://github.com/BashEdThomps/IoT-RaspberryPI.git

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
PiApp.controller('SerialCommandEditor', ['appApi','util','$scope','$state','$stateParams',
function(appApi,util, $scope, $state, $stateParams) {
    $scope.cmdName = $stateParams.name;
    $scope.REMOVE_CMD_DEFAULT = "Select Command";
    $scope.ui = {};
    $scope.alerts = {};

    if ($scope.cmdName != "new") {
      appApi.getSerialCommand($scope.cmdName, function(script) {
        $scope.cmd = cmd;
        console.log("Modifying command:", $scope.cmd);
      });
    } else {
      $scope.script = {name:"New Script", cmd: "Command"};
      console.log("Modifying command:", $scope.cmd);
    }

    $scope.deleteButton = function() {
      appApi.deleteSerialCommand($scope.cmd.name, function(success) {
        if (success) {
          util.addAlert({ type: 'success', msg: 'Command '+$scope.cmd.name+' has been deleted!' });
          setTimeout(function() {
            $state.go("Settings");
          }, 1500);
        } else {
          util.addAlert({ type: 'danger', msg: 'Error deleting '+$scope.cmd.name });
        }
      });
    };

    $scope.saveButton = function() {
      appApi.addSerialCommand($scope.cmd,function(success1) {
        if (success1) {
          appApi.configSave(function(success2) {
            if (success2) {
              util.addAlert({ type: 'success', msg: 'Command '+$scope.cmd.name+' has been saved!' });
              setTimeout(function() {
                $state.go("Settings");
              }, 1500);
            } else {
              util.addAlert({ type: 'danger', msg: 'Error saving '+$scope.cmd.name });
            }
          });
        } else {
          util.addAlert({ type: 'danger', msg: 'Error saving '+$scope.cmd.name });
        }
      });
    };
  }
]);
