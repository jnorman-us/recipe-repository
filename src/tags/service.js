import DatabaseService from '../database/service.js';

import Tag from './tag.js';

export default class TagsService
{
	static model;

	static async initialize()
	{
		Tag.initialize(TagsService);

		TagsService.model = DatabaseService.createModel('Tag', Tag);
	}

	static async create(data)
	{
		return await TagsService.model.create(data);
	}

	static async getById(id)
	{
		return await TagsService.model.findOne({
			_id: id,
		});
	}
}
