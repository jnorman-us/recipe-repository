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

	static async createUser(data)
	{
		return await UsersService.model.create(data);
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

	static async searchByDisplayName(search)
	{
		// this will be some smart alg to find the best match for display name...
		// no idea the BEST way to do that, but I can think of bad ways to do it lol
	}
}
