import React from 'react';
import { Form } from 'react-bootstrap';

import FormFieldComponent from './field.js';

export default class FormPasswordComponent extends FormFieldComponent
{
	handleChange(e)
	{
		this.setState({
			value: e.target.value,
		});

		this.onChange({
			id: e.target.id,
			value: e.target.value,
		});
	}

	render()
	{
		return (
			<Form.Group controlId={ this.id }>
				<Form.Label> { this.label } </Form.Label>
				<Form.Control
					name={ this.id }
					type="password"
					placeholder={ this.placeholder }
					required={ this.required }
					onChange={ this.handleChange.bind(this) }
					value={ this.state.value }
					isInvalid={ this.state.error != null }
				/>
				<> { this.state.error != null &&
					<Form.Control.Feedback type="invalid">
						{ this.state.error }
					</Form.Control.Feedback>
				} </>
			</Form.Group>
		);
	}
}
