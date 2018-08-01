/// <reference path="definition.ts" />


var generatedBedrijfTest = {
	"objdefinitions": [
		{
			"attributes": [],
			"passiveAttributes": [],
			"referencedAttributes": [],
			"_id": "5b50c4c043d90e109cccfc75",
			"name": "persoon"
		},
		{
			"attributes": [],
			"passiveAttributes": [],
			"referencedAttributes": [],
			"_id": "5b50c4ed43d90e109cccfc76",
			"name": "bedrijf"
		},
		{
			"attributes": [],
			"passiveAttributes": [],
			"referencedAttributes": [],
			"_id": "5b50c50643d90e109cccfc77",
			"name": "persoonWerktBijBedrijf"
		}
	],
	"attributes": [
		{
			"_id": "5b50c54743d90e109cccfc78",
			"name": "name",
			"belongsToObject": "5b50c4c043d90e109cccfc75",
			"dataType": "text"
		},
		{
			"_id": "5b50c56f43d90e109cccfc79",
			"name": "homeless",
			"belongsToObject": "5b50c4c043d90e109cccfc75",
			"dataType": "boolean"
		},
		{
			"_id": "5b50c57843d90e109cccfc7a",
			"name": "birthday",
			"belongsToObject": "5b50c4c043d90e109cccfc75",
			"dataType": "date"
		},
		{
			"_id": "5b50c57e43d90e109cccfc7b",
			"name": "lengte",
			"belongsToObject": "5b50c4c043d90e109cccfc75",
			"dataType": "number"
		},
		{
			"_id": "5b50c58443d90e109cccfc7c",
			"name": "vriend",
			"belongsToObject": "5b50c4c043d90e109cccfc75",
			"dataType": "pointer",
			"pointsToObject": "5b50c4c043d90e109cccfc75",
			"filterOnAttribute": null,
			"usingOwnColumn": null
		},
		{
			"_id": "5b50cb3b43d90e109cccfc7d",
			"name": "name",
			"belongsToObject": "5b50c4ed43d90e109cccfc76",
			"dataType": "text"
		},
		{
			"_id": "5b50cb4443d90e109cccfc7e",
			"name": "branch",
			"belongsToObject": "5b50c4ed43d90e109cccfc76",
			"dataType": "text"
		},
		{
			"_id": "5b50cb9e43d90e109cccfc7f",
			"name": "werknemer",
			"belongsToObject": "5b50c50643d90e109cccfc77",
			"dataType": "pointer",
			"pointsToObject": "5b50c4c043d90e109cccfc75",
			"filterOnAttribute": null,
			"usingOwnColumn": null
		},
		{
			"_id": "5b50cbb043d90e109cccfc80",
			"name": "werkgever",
			"belongsToObject": "5b50c50643d90e109cccfc77",
			"dataType": "pointer",
			"pointsToObject": "5b50c4ed43d90e109cccfc76",
			"filterOnAttribute": null,
			"usingOwnColumn": null
		},
		{
			"_id": "5b50cbb943d90e109cccfc81",
			"name": "salaris",
			"belongsToObject": "5b50c50643d90e109cccfc77",
			"dataType": "number"
		},
		{
			"_id": "5b50cbec43d90e109cccfc82",
			"name": "rating",
			"belongsToObject": "5b50c4ed43d90e109cccfc76",
			"dataType": "number"
		}
	]
}