import getWorker from '../../workers/get.js';

export default async function randomRecipeWorker()
{
	const response = await getWorker('/api/recipes/count');

	if(response.status == 200)
	{
		return response.body;
	}
	return -1;
}
