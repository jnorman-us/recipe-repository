export default class Test
{
	constructor(test_num)
	{
		this.num = test_num;

		this.success = false;
		this.message = null;
	}

	async run(requester)
	{
		throw 'Test.run() is not implemented';
	}
}
