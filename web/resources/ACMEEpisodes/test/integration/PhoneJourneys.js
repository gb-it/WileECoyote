jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"com/sap/devs/wile/test/integration/NavigationJourneyPhone",
		"com/sap/devs/wile/test/integration/NotFoundJourneyPhone",
		"com/sap/devs/wile/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});