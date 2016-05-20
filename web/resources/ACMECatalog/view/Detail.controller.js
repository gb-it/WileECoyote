jQuery.sap.require("sap.m.MessageToast"); 

sap.ui.controller("view.Detail", {

	onInit : function() {
		// subscribe to onBeforeShow events
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	},
	
	onBeforeShow : function(evt) {
		if (evt.data.context) {
			this.getView().setBindingContext(evt.data.context);
		}
	},
	
	navButtonPress : function(evt) {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	updateButtonPress : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "Update",
			data : this.getView().getBindingContext().getObject()
		});
	},
	
	
	deleteButtonPress : function(evt) {
		
		// nav virtual
		sap.ui.getCore().getEventBus().publish("nav", "virtual");
		
		// show confirmation dialog
		sap.m.MessageBox.show(
			"Do you really want to delete this catalog item?",
			sap.m.MessageBox.Icon.QUESTION,
			"Confirmation",
			[sap.m.MessageBox.Action.CANCEL, sap.m.MessageBox.Action.DELETE],
			jQuery.proxy(function(oAction) {
				
				if (sap.m.MessageBox.Action.CANCEL === oAction) {
				
					// remove virtual state if dialog not closed by browser history
					sap.ui.getCore().getEventBus().publish("nav", "back");
				
				} else if (sap.m.MessageBox.Action.DELETE === oAction) { 
					
					// update model
					var view = this.getView();
					var itemId = view.getBindingContext().getObject().ITEM_ID;					
					
					var oModel = sap.ui.getCore().getModel();
					var oParams = {};
					oParams.fnSuccess = function(){
						view.setBindingContext(undefined);
						sap.ui.getCore().getEventBus().publish("nav", "to", {
							id : "Home",
							data : {}
						});
						sap.m.MessageToast.show("Delete successful"); };
					oParams.fnError = function(){sap.m.MessageToast.show("Delete failed");};
					oParams.bMerge = true;					
					oModel.remove("/ACMECatalog('"+itemId+"')", oParams);
				
				}
			}, this)
		);
	}
});