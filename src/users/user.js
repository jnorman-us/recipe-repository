import PasswordHash from 'password-hash';

import DatabaseObject from '../database/database-object.js';

export default class User extends DatabaseObject
{
	static schema = {
		display_name: String,
		email: String,
		password: String,
		admin: Boolean,
	};

	static Service = null;

	static initialize(service)
	{
		User.Service = service;
	}

	constructor(object)
	{
		super(object, User.schema);
	}

	checkPassword(password)
	{
		return PasswordHash.verify(password, this.password);
	}

	static hashPassword(password)
	{
		return PasswordHash.generate(password);
	}
}
