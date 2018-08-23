/// <reference path="definition.ts" />
function readAppdef(appdef:any):AppDef{
	return new AppDef(
		appdef.objdefinitions.map(obj => new ObjDef(obj._id,obj.name,obj.dropdownAttributePointer)),
		appdef.attributes.map(attr => Attribute.makeAttributeFromObject(attr))
	)
}

var persoonbedrijfgenerated = {
	"objdefinitions": [
		{
			"_id": "5b7c9158a5a4792f2ceed2ed",
			"name": "persoon",
			"lastupdate": 1534890435240,
			"dropdownAttributePointer": "5b7c917ea5a4792f2ceed2f0"
		},
		{
			"_id": "5b7c9160a5a4792f2ceed2ee",
			"name": "bedrijf",
			"lastupdate": 1534890563025,
			"dropdownAttributePointer": "5b7c91cea5a4792f2ceed2f4"
		},
		{
			"_id": "5b7c916ba5a4792f2ceed2ef",
			"name": "persoonWerktBijBedrijf",
			"lastupdate": 1534890347736
		}
	],
	"attributes": [
		{
			"_id": "5b7c917ea5a4792f2ceed2f0",
			"belongsToObject": "5b7c9158a5a4792f2ceed2ed",
			"name": "name",
			"dataType": "text",
			"lastupdate": 1534890366904
		},
		{
			"_id": "5b7c9191a5a4792f2ceed2f1",
			"belongsToObject": "5b7c9158a5a4792f2ceed2ed",
			"name": "birthday",
			"dataType": "date",
			"lastupdate": 1534890385455
		},
		{
			"_id": "5b7c919ca5a4792f2ceed2f2",
			"belongsToObject": "5b7c9158a5a4792f2ceed2ed",
			"name": "friend",
			"dataType": "pointer",
			"pointsToObject": "5b7c9158a5a4792f2ceed2ed",
			"lastupdate": 1534890396399
		},
		{
			"_id": "5b7c91aba5a4792f2ceed2f3",
			"belongsToObject": "5b7c9158a5a4792f2ceed2ed",
			"dataType": "number",
			"name": "length",
			"lastupdate": 1534890411328
		},
		{
			"_id": "5b7c91cea5a4792f2ceed2f4",
			"belongsToObject": "5b7c9160a5a4792f2ceed2ee",
			"name": "name",
			"dataType": "text",
			"lastupdate": 1534890446200
		},
		{
			"_id": "5b7c9201a5a4792f2ceed2f6",
			"belongsToObject": "5b7c9160a5a4792f2ceed2ee",
			"name": "branch",
			"dataType": "text",
			"lastupdate": 1534890497800
		},
		{
			"_id": "5b7c9223a5a4792f2ceed2f7",
			"belongsToObject": "5b7c916ba5a4792f2ceed2ef",
			"name": "werknemer",
			"dataType": "pointer",
			"pointsToObject": "5b7c9158a5a4792f2ceed2ed",
			"lastupdate": 1534890531743
		},
		{
			"_id": "5b7c9230a5a4792f2ceed2f8",
			"belongsToObject": "5b7c916ba5a4792f2ceed2ef",
			"name": "werkgever",
			"dataType": "pointer",
			"pointsToObject": "5b7c9160a5a4792f2ceed2ee",
			"lastupdate": 1534890544263
		},
		{
			"_id": "5b7c9239a5a4792f2ceed2f9",
			"belongsToObject": "5b7c916ba5a4792f2ceed2ef",
			"name": "salaris",
			"dataType": "number",
			"lastupdate": 1534890553393
		}
	]
}