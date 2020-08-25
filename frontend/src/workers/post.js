export default async function post(url, data)
{
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		}
	});

	return {
		status: response.status,
		body: await response.json(),
	};
}
