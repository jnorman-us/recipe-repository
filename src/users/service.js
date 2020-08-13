import DatabaseService from '../database/service.js';

import User from './user.js';

export default class UsersService
{
	static model;

	static async initialize()
	{
		User.initialize(UsersService);

		UsersService.model = DatabaseService.createModel('User', User);
	}

	static async create(data)
	{
		return await UsersService.model.create(data);
	}

	static async edit(id, data)
	{
		return await UsersService.model.findOneAndUpdate({
			_id: id,
		}, data);
	}

	static async getById(id)
	{
		return await UsersService.model.findOne({
			_id: id,
		});
	}

	static async getByEmail(email)
	{
		return await UsersService.model.findOne({
			email: email,
		});
	}

	static async searchByDisplayName(search, result_limit)
	{
		const regex = new RegExp(search);

		return await UsersService.model.find({
			display_name: {
				$regex: regex,
				$options: 'i',
			}
		}).limit(result_limit);
	}
}
