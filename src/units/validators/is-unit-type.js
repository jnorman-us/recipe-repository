import UnitsService from '../service.js';

export default async function validate(unit_type)
{
	if(UnitsService.isType(unit_type))
	{
		return true;
	}
	throw new Error('Not a valid unit_type');
}
