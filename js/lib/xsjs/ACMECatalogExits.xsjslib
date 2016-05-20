/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0, no-use-before-define: 0, no-redeclare: 0*/
"use strict";
$.import("xsjs", "session");
var SESSIONINFO = $.xsjs.session;

/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/
function itemsCreate(param){
	var after = param.afterTableName;    
	
	//Get Input New Record Values
	var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");	 
	var Items = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "Details");
	pStmt.close();

	//Get Next Catalog ID Number
	var pStmt = param.connection.prepareStatement("select \"sap.devs.demo.Wile.data::ACMEItemId\".NEXTVAL from dummy"); 
	var rs = pStmt.executeQuery();
	var ItemId = "";
	while (rs.next()) {
		ItemId = rs.getString(1);
	}
	pStmt.close();
	
	for( var i = 0; i<2; i++){
		var pStmt;
		if(i<1){
			pStmt = param.connection.prepareStatement("insert into \"sap.devs.demo.Wile.data::MasterData.ACMEItem\" values(?,?)" );	
			pStmt.setString(1, ItemId.toString());
			pStmt.setString(2, Items.Details[0].ITEM.toString());	
			pStmt.executeUpdate();
			pStmt.close();
			
		}else{
			pStmt = param.connection.prepareStatement("TRUNCATE TABLE \"" + after + "\" " );
			pStmt.executeUpdate();
			pStmt.close();
			
			pStmt = param.connection.prepareStatement("insert into \"" + after + "\" values(?,?,?,?)" );		
			pStmt.setString(1, ItemId.toString());
			pStmt.setString(2, Items.Details[0].ITEM.toString());	
			pStmt.setString(3, "");	
			pStmt.setString(4, "");	
			pStmt.executeUpdate();
			pStmt.close();
		}


	}
	
}


/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/
function itemsUpdate(param){
	var after = param.afterTableName;
	var before = param.beforeTableName;
	
	//Get Input New Record Values
	var	pStmt = param.connection.prepareStatement("select * from \"" + after + "\"");	 
	var Items = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "Details");
	pStmt.close();


	//Update Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement("update \"sap.devs.demo.Wile.data::MasterData.ACMEItem\" SET ITEM = ? where ITEM_ID = ?" );	
	pStmt.setString(1, Items.Details[0].ITEM.toString());
	pStmt.setString(2, Items.Details[0].ITEM_ID.toString());	
	pStmt.executeUpdate();
	pStmt.close();

}


/**
@param {connection} Connection - The SQL connection used in the OData request
@param {beforeTableName} String - The name of a temporary table with the single entry before the operation (UPDATE and DELETE events only)
@param {afterTableName} String -The name of a temporary table with the single entry after the operation (CREATE and UPDATE events only)
*/
function itemsDelete(param){
	var before = param.beforeTableName;
	
	//Get Input New Record Values
	var	pStmt = param.connection.prepareStatement("select * from \"" + before + "\"");	 
	var Items = SESSIONINFO.recordSetToJSON(pStmt.executeQuery(), "Details");
	pStmt.close();


	//Update Record into DB Table and Temp Output Table
	pStmt = param.connection.prepareStatement("DELETE FROM \"sap.devs.demo.Wile.data::MasterData.ACMEItem\" WHERE ITEM_ID = ?" );	
	pStmt.setString(1, Items.Details[0].ITEM_ID.toString());
	pStmt.executeUpdate();
	pStmt.close();
	
}

