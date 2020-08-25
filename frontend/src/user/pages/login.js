import React from 'react';
import { withRouter } from 'react-router-dom';

import Page from '../../page.js';

import FormTextComponent from '../../forms/components/text.js';
import FormPasswordComponent from '../../forms/components/password.js';

class UserLoginPage extends Page
{
	async componentDidMount()
	{
		this.setState({
			error: null,
			value: 'test@email.com',
		});

		var self = this;
		setTimeout(function() {
			self.setState({
				value: 'jnormantransactions@gmail.com',
				error: 'I have a problem with this guy',
			});
		}, 5000);
	}

	render()
	{
		return (
			<div>
				<FormTextComponent
					id={ 'email' }
					label={ 'Email' }
					required={ true }
					placeholder={ 'example@email.com' }

					value={ this.state.value }
					error={ this.state.error }
				/>
				<FormPasswordComponent
					id={ 'password' }
					label={ 'Password' }
					required={ true }
					placeholder={ 'eatadick69' }

					value={ this.state.value }
					error={ this.state.error }
				/>
			</div>
		);
	}
}

export default withRouter(UserLoginPage);
