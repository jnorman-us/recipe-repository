export default async function get(url)
{
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
		}
	});

	var body = null;

	try {
		body = await response.json();

		console.log(body);
	} finally {
		return {
			status: response.status,
			body: body,
		};
	}
}
