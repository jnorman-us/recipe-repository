import Requester from './requester.js';
import CreateUsersTest from './tests/1-create-users-test.js';

(async function main()
{
	const tests = [
		new CreateUsersTest(),
	];

	const requester = new Requester();

	for(const test of tests)
	{
		await test.run(requester);

		if(test.success)
		{
			console.log(`Passed #${ test.num }`);
		}
		else
		{
			console.log(`Failed #${ test.num }: ${ test.message}`);
		}
	}
})();
