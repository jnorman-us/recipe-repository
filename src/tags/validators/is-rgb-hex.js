export default async function validate(hex)
{
	const regex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
	const match = regex.exec(hex);

	if(match !== null)
	{
		return true;
	}
	throw new Error('Not in hex format');
}
