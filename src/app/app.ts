import * as Is from "./is.ts";
import * as angular from "angular";

export function init() {
	
	let app : angular.IModule = angular.module("testTenat",[]);

	app.controller("windowController", ["$scope", function($scope) {
		if (localStorage.getItem("settings")) {
			$scope.rows = JSON.parse(localStorage.getItem("settings") || '[]');
		} else {
			let rows: Is.IARow = [
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
			$scope.rows = rows;
		}
		const amount : number = $scope.rows.length;
		let iTRow: Is.ITRow = {
			view: false,
			edit: false,
			remove: false,
		}
		$scope.checkAll = iTRow;

		let emptyRow: Is.IRow = {section: "", view: false, edit: false, remove: false}

		checkIfAllSelectedFunction("view", emptyRow);
		checkIfAllSelectedFunction("edit", emptyRow);
		checkIfAllSelectedFunction("remove", emptyRow);

		$scope.selectAll = function(data: string) {
			for (let i = 0; i < amount; i++) {
				$scope.rows[i][data] = $scope.checkAll[data];
			}
		};

		$scope.checkIfAllSelected = function(data: string, row : Is.IRow) {
			checkIfAllSelectedFunction(data, row);
		};

		function checkIfAllSelectedFunction(data: string, row : Is.IRow) {
			let b : number = 0;
			for (let i = 0; i < amount; i++) {
				if ($scope.rows[i][data] == true) b++;
			}
			if (b == amount) {
				$scope.checkAll[data] = true;
			} else {
				$scope.checkAll[data] = false;
			}

			if (row.section.length != 0 && !row.view) {
				row.edit = false;
				row.remove = false;
				checkIfAllSelectedFunction("edit", emptyRow);
				checkIfAllSelectedFunction("remove", emptyRow);
			}
		}

		$scope.save = function() {
			var forSaving : string = "[";
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

}