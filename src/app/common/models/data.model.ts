export interface ec2Item {
	name: 			string
	owner: 			string
	deparment: 		string
	id: 			string
	keyname: 		string
	environment: 	string
}

export interface chefItem {
	name: 			string
	platform: 		string
	environment: 	string
	recipes: 		string[]
	roles: 			string[]
}
