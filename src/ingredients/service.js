import DatabaseService from '../database/service.js';

import Ingredient from './ingredient.js';

export default class IngredientsService
{
	static model;

	static async initialize()
	{
		Ingredient.initialize(IngredientsService);

		IngredientsService.model = DatabaseService.createModel('Ingredient', Ingredient);
	}

	static async create(data)
	{
		return await IngredientsService.model.create(data);
	}

	static async edit(id, data)
	{
		return await IngredientsService.model.findOneAndUpdate({
			_id: id,
		}, data);
	}

	static async getById(id)
	{
		return await IngredientsService.model.findOne({
			_id: id,
		});
	}

	static async searchByName(search, result_limit)
	{
		return await IngredientsService.model.find({
			name: {
				$regex: new RegExp("/" + search + "/g"),
				$options: 'i',
			}
		}).limit(result_limit);
	}
}
