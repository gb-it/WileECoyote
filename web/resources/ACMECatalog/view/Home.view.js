
sap.ui.jsview("view.Home", { 

	getControllerName: function() {
		return "view.Home";
	},
	
	createContent : function(oCon) {
		
		this.page = new sap.m.Page({
			title : "ACME Catalog",
			content : []
		});
		
		// create list
		this.list = new sap.m.List({
			mode: "{local>/mode}",
			includeItemInSelection : "{local>/inBatch}",
			select : [ oCon.listSelect, oCon ],
			"delete" : [ oCon.listDelete, oCon ]
		});
		this.list.bindAggregation("items", {
			path: "/ACMECatalog",
			sorter : new sap.ui.model.Sorter("ITEM", false),
			template : new sap.m.StandardListItem({
				title : "{ITEM}",
				icon : "{ITEM_IMAGE_URL}",
				iconInset : false,
				iconDensityAware : false,
				description : {
					path : "ITEM_ID"
				},
				press : [ oCon.itemPress, oCon ],
				type : {
					path : "local>/inEdit",
					formatter : function(inEdit) {
						return (inEdit) ? sap.m.ListType.Inactive : sap.m.ListType.Active;
					}
				}
			})
		});
		
		// create create dialog
		this.inputCreate = sap.ui.xmlview("inputCreate", "view.Input");
		this.createDialog = new sap.m.Dialog({
			title : "New ACME Item",
			stretch: jQuery.device.is.phone,
			content : [
				this.inputCreate
			],
			leftButton : new sap.m.Button({
				text : "Done",
				press : [ oCon.createDialogConfirm, oCon ]
			}),
			rightButton : new sap.m.Button({
				text : "Cancel",
				press : [ oCon.createDialogCancel, oCon ]
			})
		});
		
		// create buttons
		this.createButton = new sap.m.Button({
			icon : "sap-icon://add",
			visible : {
				path : "local>/inEdit",
				formatter : function(inEdit) { return !inEdit; }
			},
			press : [ oCon.createButtonPress, oCon ]
		});
		this.editQuickDelButton = new sap.m.Button({
			text : {
				path : "local>/inEdit",
				formatter : function(inEdit) { return (inEdit) ? "Done" : "Edit"; }
			},
			type : {
				path : "local>/inEdit",
				formatter : function(inEdit) { return (inEdit) ? sap.m.ButtonType.Accept : sap.m.ButtonType.Default; }
			},
			press : [ oCon.editQuickDelButtonPress, oCon ]
		});
		this.editBatchButton = new sap.m.Button({
			text : {
				path : "local>/inEdit",
				formatter : function(inEdit) { return (inEdit) ? "Done" : "Edit"; }
			},
			type : {
				path : "local>/inEdit",
				formatter : function(inEdit) { return (inEdit) ? sap.m.ButtonType.Accept : sap.m.ButtonType.Default; }
			},
			press : [ oCon.editBatchButtonPress, oCon ]
		});

		this.batchDeleteButton = new sap.m.Button({
			icon : "sap-icon://delete",
			enabled : false,
			visible : false,
			press : [ oCon.batchDeleteButtonPress, oCon ]
		});
		
		// place buttons depending on the mode
		this.page.addContent(this.list);
		this.page.addHeaderContent(this.createButton);
				
		return this.page;
	}
});