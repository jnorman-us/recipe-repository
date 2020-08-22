import UsersService from '../service.js';

import auth from '../../auth/features/auth.js';
import loggedIn from '../../auth/features/logged-in.js';

async function me(req, res)
{
	return res.status(200).json({
		me: req.user.safe,
	});
}

export const url = '/api/users/me';
export const action = [ auth, loggedIn, me ];
