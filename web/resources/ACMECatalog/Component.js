jQuery.sap.declare("sap.devs.Wile.Component");


sap.ui.core.UIComponent.extend("sap.devs.Wile.Component", {
	init: function(){
		// set global models
		var model = new sap.ui.model.odata.ODataModel('/xsodata/WileECoyote.xsodata', true);
		sap.ui.getCore().setModel(model); 
	          
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
	},
	
	createContent: function() {
     
		var settings = {
				ID: "Wile",
				title: "ACME Catalog",
				description: "ACME Catalog"
			};
		
		var oView = sap.ui.view({
			id: "app",
			viewName: "view.App",
			type: "JS",
			viewData: settings
		});
		
 
		 oView.setModel(sap.ui.getCore().getModel()); 		 
		return oView;
	}
	
	
});