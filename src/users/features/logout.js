import AuthService from '../../auth/service.js';

async function logout(req, res)
{
	AuthService.logout(req);
	res.status(200).json();
}

export const url = '/api/users/logout';
export const action = [ logout ];
