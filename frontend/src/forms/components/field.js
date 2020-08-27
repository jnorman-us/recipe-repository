import React from 'react';

export default class FormFieldComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.id = props.id;
		this.label = props.label;
		this.required = props.required;
		this.placeholder = props.placeholder;

		this.onChange = props.onChange;

		this.state = {
			error: null,
			value: '',
		};
	}

	async componentDidMount()
	{
		this.componentWillReceiveProps(this.props);
	}

	componentWillReceiveProps(props)
	{
		const value = props.value;
		const error = props.error;

		this.setState({
			value: value,
			error: error,
		});

		this.onChange({
			id: this.id,
			value: this.props.value,
		});
	}

	handleChange(e)
	{
		throw 'FormFieldComponent.handleChange() was not overriden';
	}
}
