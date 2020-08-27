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

		this.state = {
			submitting: false,
			form_error: null,
			values: props.values,
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
			form_error: null,
		});

		const response = await postWorker(this.url, this.state.values);

		var form_error = null;

		if(response.status === 422)
		{
			form_error = response.body;
		}
		else if(response.status === 500)
		{
			form_error = 'Internal Server Error';
		}
		else if(response.status === 403)
		{
			form_error = 'Forbidden';
		}
		else if(response.status === 401)
		{
			form_error = 'Unauthorized';
		}
		else if(response.status === 404)
		{
			form_error = 'Not Found';
		}
		else
		{

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
				<> { this.state.form_error != null &&
					<Alert variant="danger">
						{ JSON.stringify(this.state.form_error) }
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
							error={ null }
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
