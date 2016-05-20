sap.ui.controller("view.Input", { 

	onInit : function() {

		// set model
    	var model = new sap.ui.model.json.JSONModel({});
		this.getView().setModel(model);
	},
	
	validate: function() {
		
		var name = this.byId("ITEM").getValue();
		var nameValid = (name && name.length > 0);
		this.byId("ITEM").setValueState((nameValid) ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error);
		
		return nameValid ;
	},
	
	getResultItem : function() {
		var result = this.getView().getModel().getData();
		if (!result.ITEM_ID) {
			result.ITEM_ID = '0000000000';
		}
		if (!result.ITEM_IMAGE_URL) {
			result.ITEM_IMAGE_URL = "img/newS.png";
		}
		return result;
	},
	
	setResultItem: function(existingItem) {
		var data = (existingItem === undefined) ? {} : existingItem;
		this.getView().getModel().setData(data);
	}
});