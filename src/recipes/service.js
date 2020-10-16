import DatabaseService from '../database/service.js';

import Recipe from './recipe.js';
import Instruction from './types/instruction.js';

export default class RecipesService
{
	static model;

	static async initialize()
	{
		Recipe.initialize(RecipesService);

		// add all of the new schema types first
		DatabaseService.addSchemaType(Instruction, 'Instruction');

		RecipesService.model = DatabaseService.createModel('Recipe', Recipe);
	}

	static async create(data)
	{
		return await RecipesService.model.create(data);
	}

	static async getById(id)
	{
		return await RecipesService.model.findOne({
			_id: id,
		});
	}

	static async searchByName(search, result_limit)
	{
		const regex = new RegExp(search);

		return await RecipesService.model.find({
			name: {
				$regex: regex,
				$options: 'i',
			}
		}).limit(result_limit);
	}

	static async getRandom(result_limit)
	{
		return await RecipesService.model.aggregate([{
			$sample: { size: result_limit },
		}]);
	}

	static async delete(id)
	{
		return await RecipesService.model.deleteOne({
			_id: id,
		});
	}

	static async edit(id, data)
	{
		return await RecipesService.model.findOneAndUpdate({
			_id: id,
		}, data);
	}
}
