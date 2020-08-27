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

		this.state.values = {
			email: 'test',
			password: 'rest1'
		};

		this.state.errors = {
			email: null,
			password: null,
		};
	}

	async componentDidMount()
	{
		var self = this;

		setTimeout(function() {
			self.setState({
				values: {
					email: 'bruh@gmail.com',
					password: 'bruh@gmail.com',
				},
				errors: {
					email: 'yikes',
					password: 'yiiikes'
				},
			});
		}, 5000);
	}

	async handleSubmit()
	{

	}

	handleChange(data)
	{
		this.state.values[data.id] = data.value;
	}

	render()
	{
		console.log(this.state);
		return (
			<div>
				<FormComponent onSubmit={ this.handleSubmit.bind(this) }>
					<FormTextComponent
						id={ 'email' }
						label={ 'Email' }
						required={ true }
						placeholder={ 'example@email.com' }
						onChange={ this.handleChange.bind(this) }

						value={ this.state.values.email }
						error={ this.state.errors.email }
					/>
					<FormPasswordComponent
						id={ 'password' }
						label={ 'Password' }
						required={ true }
						placeholder={ 'password123' }
						onChange={ this.handleChange.bind(this) }

						value={ this.state.values.password }
						error={ this.state.errors.password }
					/>
				</FormComponent>
			</div>
		);
	}
}

export default withRouter(UserLoginPage);
