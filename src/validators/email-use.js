import UsersService from '../users/service.js';

export default async function validate(email)
{
	const user = await UsersService.getByEmail(email);

	return user == null;
}
