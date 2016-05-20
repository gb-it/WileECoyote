sap.ui.controller("view.Update", {

	onInit : function() {
		// subscribe to onBeforeShow events
		this.getView().addEventDelegate({
			onBeforeShow : jQuery.proxy(function(evt) {
				this.onBeforeShow(evt);
			}, this)
		});
	}, 
	
	onBeforeShow : function(evt) {
		this.byId("inputView").getController().setResultItem(evt.data);
		this.byId("inputView").getController().validate();
		this.byId("image").setSrc(evt.data.ITEM_IMAGE_URL);
	},
	
	updateItem : function(updatedItem) {
		var oModel = sap.ui.getCore().getModel();
		
		oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});
		var oParams = {};
		oParams.fnSuccess = function(){  sap.ui.getCore().getEventBus().publish("nav", "back");
		                                 sap.m.MessageToast.show("Update successful");};
		oParams.fnError = function(){sap.m.MessageToast.show("Update failed");};
		oParams.bMerge = false;
		delete updatedItem.__metadata;
		oModel.update("/ACMECatalog('"+updatedItem.ITEM_ID+"')", updatedItem, oParams);
		
	},
	
	cancelButtonPress : function() {
		sap.ui.getCore().getEventBus().publish("nav", "back");
	},
	
	doneButtonPress : function() {
		var inputUpdateController = this.byId("inputView").getController();
		var valid = inputUpdateController.validate();
		if (valid) {
			var resultItem = inputUpdateController.getResultItem();
			this.updateItem(resultItem);
		}
	}
});