async function apiPostWildcard(req, res)
{
	return res.status(404).send();
}

export const url = '/api/*';
export const rules = [];
export const action = [ apiPostWildcard ];
