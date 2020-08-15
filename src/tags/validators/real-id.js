import TagsService from '../service.js';

export default async function validate(id)
{
	var tag = null;

	try {
		tag = await TagsService.getById(id);
	} catch(e) {
		throw new Error('Invalid id');
	}

	if(tag == null)
		throw new Error('Tag does not exist');
	return true;
}
