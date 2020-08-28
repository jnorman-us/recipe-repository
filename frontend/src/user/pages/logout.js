import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../../page.js';

import getWorker from '../../workers/get.js';

class UserLogoutPage extends Page
{
	constructor(props)
	{
		super(props);
	}

	async componentDidMount()
	{
		const response = await getWorker('/api/users/logout');

		if(response.status === 200)
		{
			return this.redirectToLogin();
		}
	}

	render()
	{
		return (
			<div>
				Logging Out...
			</div>
		);
	}
}

export default withRouter(UserLogoutPage);
