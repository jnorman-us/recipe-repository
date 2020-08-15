import Test from './test.js';

export default class CreateUsersTest extends Test
{
	constructor()
	{
		super(1);
	}

	async run(requester)
	{
		const register1_response = await requester.post('/users/register', {
			email: "jnormantransactions@gmail.com",
			password: "bruhlord",
			display_name: "Joseph Norman"
		});

		console.log(register1_response)
		this.success = true;
	}
}
