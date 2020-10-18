import postWorker from '../../workers/post.js';

export default async function recipeSearchWorker(query)
{
	const response = await postWorker('/api/recipes/search', {
		query: query,
	});

	if(response.status === 200)
	{
		return response.body;
	}
	return [];
}
