import "./app/assets/styles/style.css";
import * as angular from "angular";
let app = angular.module("testTenat",[]);

app.controller("windowController", ["$scope", function($scope) {
	if (localStorage.getItem("settings")) {
		var elem = JSON.parse(localStorage.getItem("settings") || '{}');
		$scope.rows = elem;
	} else {
		$scope.rows = [
			{
				section: "Calendar",
				view: false,
				edit: false,
				remove: false
			},{
				section: "Profile",
				view: false,
				edit: false,
				remove: false
			},{
				section: "Property",
				view: false,
				edit: false,
				remove: false
			},{
				section: "Contacts",
				view: false,
				edit: false,
				remove: false
			},
		];
	}
	let amount = $scope.rows.length;
	$scope.checkAll = {
		view: false,
		edit: false,
		remove: false,
	}
	checkIfAllSelectedFunction("view");
	checkIfAllSelectedFunction("edit");
	checkIfAllSelectedFunction("remove");

    $scope.selectAll = function(data: string) {
		for (let i = 0; i < amount; i++) {
			$scope.rows[i][data] = $scope.checkAll[data];
		}
	};

	$scope.checkIfAllSelected = function(data: string) {
		checkIfAllSelectedFunction(data);
	};

	function checkIfAllSelectedFunction(data: string) {
		let b = 0;
		for (let i = 0; i < amount; i++) {
			if ($scope.rows[i][data] == true) b++;
		}
		if (b == amount) {
			$scope.checkAll[data] = true;
		} else {
			$scope.checkAll[data] = false;
		}
	}

	$scope.save = function() {
		var forSaving = "[";
		for (let i = 0; i < amount; i++) {
			forSaving += JSON.stringify({
				section: $scope.rows[i].section,
				view: $scope.rows[i].view,
				edit: $scope.rows[i].edit,
				remove: $scope.rows[i].remove
			});
			if (i != amount - 1) {
				forSaving += ","
			}
		};
		localStorage.setItem("settings", forSaving + "]");
	}
}])
