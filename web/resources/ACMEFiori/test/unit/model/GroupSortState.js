sap.ui.define([
		"com/sap/devs/wile/model/GroupSortState",
		"sap/ui/model/json/JSONModel"
	], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("").length, 1, "The sorting by  returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("ITEM").length, 1, "The sorting by ITEM returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("").length, 1, "The group by  returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to  if the user groupes by ", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by ITEM and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "");

		this.oGroupSortState.sort("ITEM");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});