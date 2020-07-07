import "./app/assets/styles/style.css";
import * as angular from "angular";
let app : angular.IModule = angular.module("testTenat",[]);

interface IARow {
	[index: number]: IRow;
};

interface IRow {
	section: string;
	view: boolean;
	edit: boolean;
	remove: boolean;
};

interface ITRow {
	view: boolean;
	edit: boolean;
	remove: boolean;
};

app.controller("windowController", ["$scope", function($scope) {
	if (localStorage.getItem("settings")) {
		$scope.rows = JSON.parse(localStorage.getItem("settings") || '[]');
	} else {
		let rows: IARow = [
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
	let iTRow: ITRow = {
		view: false,
		edit: false,
		remove: false,
	}
	$scope.checkAll = iTRow;

	let emptyRow: IRow = {section: "", view: false, edit: false, remove: false}

	checkIfAllSelectedFunction("view", emptyRow);
	checkIfAllSelectedFunction("edit", emptyRow);
	checkIfAllSelectedFunction("remove", emptyRow);

    $scope.selectAll = function(data: string) {
		for (let i = 0; i < amount; i++) {
			$scope.rows[i][data] = $scope.checkAll[data];
		}
	};

	$scope.checkIfAllSelected = function(data: string, row : IRow) {
		checkIfAllSelectedFunction(data, row);
	};

	function checkIfAllSelectedFunction(data: string, row : IRow) {
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
