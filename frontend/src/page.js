import React from 'react';

export default class Page extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			mobile: false,
		};
	}

	componentWillReceiveProps(props)
	{
		this.setState({
			mobile: props.mobile,
		});
	}

	redirectToLogin()
	{
		this.props.history.push('/login');
	}

	redirectToIndex()
	{
		this.props.history.push('/');
	}
}
