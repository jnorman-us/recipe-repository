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
			email: 'rest',
			password: '',
		};
	}

	async componentDidMount()
	{
		const self = this;
		await (new Promise(function(resolve) {
			setTimeout(function() {
				self.values.email = 'bruh';
				resolve()
			}, 2000);
		}));

		this.setState({
			test: false,
		});
	}

	render()
	{
		return (
			<div>
				<FormComponent
					url={ '/api/users/login' }
					fields={ this.fields }
					values={ this.values }
				/>
			</div>
		);
	}
}

export default withRouter(UserLoginPage);
