import UnitsService from '../service.js';

export default async function validate(unit)
{
	if(UnitsService.isUnit(unit))
	{
		return true;
	}
	throw new Error('Not a valid unit');
}
