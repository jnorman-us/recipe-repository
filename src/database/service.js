import Mongoose from 'mongoose';

import ConfigService from '../config/service.js';

export default class DatabaseService
{
	static async initialize()
	{
		Mongoose.connect(ConfigService.get('mongodb_url'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		Mongoose.set('useFindAndModify', false);
	}

	static createModel(name, wrapperClass)
	{
		var mongooseSchema = new Mongoose.Schema(wrapperClass.schema);
		mongooseSchema.loadClass(wrapperClass);

		return Mongoose.model(name, mongooseSchema);
	}
}
