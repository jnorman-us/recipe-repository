import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './menu.css';

export default class MenuPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			mobile: false,
		};

		this.componentWillReceiveProps(props);
	}

	componentWillReceiveProps(props)
	{
		console.log(props);

		this.setState({
			mobile: props.mobile,
		});
	}

	async componentDidMount()
	{

	}

	render()
	{
		return (
			<div className={ `menu ${ this.state.mobile ? 'menu-mobile' : '' }`}>
				<Container fluid className="px-0">
					<Row>
						<Col>
							<div className='menu-logo' />
						</Col>
						<Col>
							Search
						</Col>
						<Col>
							Account
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
