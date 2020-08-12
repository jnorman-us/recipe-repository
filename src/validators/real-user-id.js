import UsersService from '../users/service.js';

export default async function validate(id)
{
	var user = null;
	
	try {
		user = await UsersService.getById(id);
	} catch(e) {
		throw new Error('Invalid id');
	}

	if(user == null)
		throw new Error('User does not exist');
	return true;
}
