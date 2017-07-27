export interface ec2Item {
	id:				string
	name: 			string
	owner: 			string
	deparment: 		string
	instanceId:		string
	privateIP:		string
	environment: 	string
	managedByChef:	string
}

export interface chefItem {
	id:				string
	name: 			string
	platform: 		string
	environment: 	string
	secure: 		string
	roles: 			string
	adressIP:		string
}
