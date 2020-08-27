import React from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

export default class FormComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.onSubmit = props.onSubmit;

		this.state = {
			submitting: false,
		};
	}

	async handleSubmit(e)
	{
		e.preventDefault();

		this.setState({
			submitting: true,
		});

		await this.onSubmit();

		this.setState({
			submitting: false,
		});
	}

	render()
	{
		return (
			<Form onSubmit={ this.handleSubmit.bind(this) }>
				{ this.props.children }

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
