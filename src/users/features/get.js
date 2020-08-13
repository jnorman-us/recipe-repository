import UsersService from '../service.js';

async function getUser(req, res)
{
	const user_id = req.query.id;

	if(user_id != null)
	{
		try {
			const user = await UsersService.getById(user_id);

			return res.status(
				user != null ? 200 : 404,
			).json({
				user: user.safe,
			});
		} catch(err) {
			return res.status(422).send();
		};
	}
	return res.status(422).send();
}

export const url = '/users';
export const action = [ getUser ];
