import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../../page.js';

import FormComponent from '../../forms/components/form.js'
import FormTextComponent from '../../forms/components/text.js';
import FormPasswordComponent from '../../forms/components/password.js';

class UserLoginPage extends Page
{
	constructor(props)
	{
		super(props);

		this.fields = [{
			field: FormTextComponent,
			id: 'email',
			label: 'Email',
			required: true,
			placeholder: 'example@email.com',
		}, {
			field: FormPasswordComponent,
			id: 'password',
			label: 'Password',
			required: true,
			placeholder: 'password123',
		}];

		this.values = {
			email: '',
			password: '',
		};
	}

	handleSuccess(body)
	{
		this.redirectToIndex();
	}

	handleUnauthorized()
	{
		this.redirectToIndex();
	}

	handleForbidden()
	{
		return 'Incorrect email or password';
	}

	render()
	{
		return (
			<div>
				<FormComponent
					url={ '/api/users/login' }
					fields={ this.fields }
					values={ this.values }
					onSuccess={ this.handleSuccess.bind(this) }
					onUnauthorized={ this.handleUnauthorized.bind(this) }
					onForbidden={ this.handleForbidden.bind(this) }
				/>
			</div>
		);
	}
}

export default withRouter(UserLoginPage);
