export default async function isAdmin(req, res, next)
{
	if(req.user.admin == true)
	{
		return next();
	}
	return res.status(401).json();
}
