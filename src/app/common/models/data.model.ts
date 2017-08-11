export interface ec2Item {
	id:				string
	name: 			string
	owner: 			string
	deparment: 		string
	environment: 	string
	instanceId:		string
	platform:		string
	privateIP:		string
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

export interface chefUser {
	id:				string
	name: 			string
}

export interface chefContainer {
	chefItems: 		chefItem[]
	chefUsers:		chefUser[]
}
