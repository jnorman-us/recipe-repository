import Path from 'path';

import AppService from '../service.js';
import ConfigService from '../../config/service.js';

async function frontendWildcard(req, res)
{
	if(AppService.production == true)
	{
		return res.status(200).sendFile(Path.join(ConfigService.get('build_path'), 'index.html'));
	}
	return res.status(404).send();
}

export const url = '/*';
export const action = [ frontendWildcard ];
