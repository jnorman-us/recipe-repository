import UsersService from '../../users/service.js';

export default async function auth(req, res, next)
{
	const user_id = req.session.user_id;

	if(user_id == null)
	{
		req.logged_in = false;
		return next();
	}

	var user = await UsersService.getById(user_id);

	if(user == null)
	{
		req.logged_in = false;
		return next();
	}
	else
	{
		req.logged_in = true;
		req.user = user;
		return next();
	}
}
