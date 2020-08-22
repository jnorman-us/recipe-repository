import TagsService from '../service.js';

async function getTag(req, res)
{
	const tag_id = req.query.id;

	if(tag_id != null)
	{
		try {
			const tag = await TagsService.getById(tag_id);

			return res.status(
				tag != null ? 200 : 404,
			).json({
				tag: tag.safe,
			});
		} catch(err) {
			return res.status(422).send();
		};
	}
	return res.status(422).send();
}

export const url = '/api/tags';
export const action = [ getTag ];
