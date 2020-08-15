import Request from 'request';

export default class Requester
{
	constructor()
	{
		this.session = Request.jar();
	}

	get(path)
	{
		const self = this;

		return (new Promise(function(resolve) {
			Request.get({
				url: `http://localhost:8080${ path }`,
				json: true,
				jar: self.session,
			}, function(error, response, body) {
				if(error)
				{
					console.log('Not Connected...')
					process.exit();
				}
				else
				{
					return resolve({
						status: response.statusCode,
						body: body,
					});
				}
			});
		}));
	}

	post(path, body)
	{
		const self = this;

		return (new Promise(function(resolve) {
			Request.post({
				url: `http://localhost:8080${ path }`,
				json: true,
				jar: self.session,
				body: body
			}, function(error, response, body) {
				if(error)
				{
					console.log('Not Connected...')
					process.exit();
				}
				else
				{
					return resolve({
						status: response.statusCode,
						body: body,
					});
				}
			});
		}));
	}
}
