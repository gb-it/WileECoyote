jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 ACMECatalog in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/sap/devs/wile/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/sap/devs/wile/test/integration/pages/App",
	"com/sap/devs/wile/test/integration/pages/Browser",
	"com/sap/devs/wile/test/integration/pages/Master",
	"com/sap/devs/wile/test/integration/pages/Detail",
	"com/sap/devs/wile/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.sap.devs.wile.view."
	});

	sap.ui.require([
		"com/sap/devs/wile/test/integration/MasterJourney",
		"com/sap/devs/wile/test/integration/NavigationJourney",
		"com/sap/devs/wile/test/integration/NotFoundJourney",
		"com/sap/devs/wile/test/integration/BusyJourney"
	], function () {
		QUnit.start();
	});
});