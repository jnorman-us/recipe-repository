import React from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

import postWorker from '../../workers/post.js';

export default class FormComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.url = props.url;
		this.fields = props.fields;
		this.onSuccess = props.onSuccess;
		this.onUnauthorized = props.onUnauthorized;
		this.onForbidden = props.onForbidden;

		this.state = {
			submitting: false,
			form_error: '',
			values: props.values,
			errors: {},
		};
	}

	componentWillReceiveProps(props)
	{
		this.setState({
			values: props.values,
		});
	}

	async handleSubmit(e)
	{
		e.preventDefault();

		this.setState({
			submitting: true,
			form_error: '',
		});

		const response = await postWorker(this.url, this.state.values);

		var form_error = '';

		if(response.status === 422)
		{
			console.log(response.body);
			// per field error
			form_error = JSON.stringify(response.body);
		}
		else if(response.status === 500)
		{
			form_error = 'Internal Server Error';
		}
		else if(response.status === 401)
		{
			return this.onUnauthorized();
		}
		else if(response.status === 403)
		{
			form_error = this.onForbidden();
		}
		else if(response.status === 404)
		{
			form_error = 'Not Found';
		}
		else if(response.status === 200)
		{
			return this.onSuccess(response.body);
		}

		this.setState({
			form_error: form_error,
			submitting: false,
		});
	}

	handleChange(data)
	{
		this.state.values[data.id] = data.value;
	}

	render()
	{
		var self = this;

		return (
			<Form onSubmit={ this.handleSubmit.bind(this) }>
				<> { this.state.form_error !== '' &&
					<Alert variant="danger">
						{ this.state.form_error }
					</Alert>
				} </>
				<> { this.fields.map(function(field) {
					return (
						<field.field
							key={ field.id }
							id={ field.id }
							label={ field.label }
							required={ field.required }
							placeholder={ field.placeholder }
							onChange={ self.handleChange.bind(self) }

							value={ self.state.values[field.id] }
							error={ self.state.errors[field.id] }
						/>
					);
				}) } </>
				<> { this.state.submitting &&
					<Button variant="primary" disabled type="submit" block>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        &nbsp; Submitting
                    </Button>
				} {	!this.state.submitting &&
					<Button variant="primary" type="submit" block>
                        Submit
                    </Button>
				} </>
			</Form>
		);
	}
}
