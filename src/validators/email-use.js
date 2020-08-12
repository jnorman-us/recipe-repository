import UsersService from '../users/service.js';

export default async function validate(email)
{
	const user = await UsersService.getByEmail(email);

	if(user != null)
		throw new Error('Email is already in use!');
	return true;
}
