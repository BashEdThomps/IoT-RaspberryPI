PiApp.controller('Landing',
	['$state','$stateParams','$controller','$http','$scope','$rootScope' ,
	function($state, $stateParams, $controller, $http, $scope, $rootScope)
	{
    $controller('PiApp', {$scope: $scope});

		// Client Function Definitions ---------------------------------------------

		$scope.gpioSet = function(pinNum, state)
		{
			$scope.setGpioPinValueApi(pinNum,state,function(success)
			{
				if (success)
				{
					$scope.getPinByNumber($scope.pinList,pinNum,function(pin)
					{
						pin.state = state;
					});
				}
			});
		};

		$scope.executeSerialCommand = function(command)
		{
			$scope.executeSerialCommandApi(command,function(res)
			{
				if (res)
				{
					$scope.addAlert({ type: 'success', msg: 'Successuly executed '+command+'!.' });
				}
				else
				{
					$scope.addAlert({ type: 'danger', msg: 'Error executing '+command+'. Please try again!.' });
				}
			});
		};

		$scope.executeGpioScriptButton = function(scriptName)
		{
			$scope.executeGpioScriptApi(scriptName,function(resp)
			{
				if (res)
				{
					$scope.addAlert({ type: 'success', msg: 'Successuly executed '+scriptName+'!.' });
				}
				else
				{
					$scope.addAlert({ type: 'danger', msg: 'Error executing '+scriptName+'. Please try again!.' });
				}
			});
		};

		// API Calls ---------------------------------------------------------------

		$scope.getSerialEnabledApi(function(en)
		{
			$scope.ui.serialEnabled = en;

			if ($scope.ui.serialEnabled)
			{
				$scope.getSerialData();
			}
		});

		$scope.getGpioListApi(function(list)
		{
			$scope.pinList = list;
		});

		$scope.getGpioScriptsListApi(function(scriptList)
		{
			$scope.gpioScriptList = scriptList;
		});
	}
]);
