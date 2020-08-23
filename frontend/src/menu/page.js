import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import FA from 'react-fontawesome';


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
						<Col xs={ 4 } md={ 3 }>
							<div className='menu-logo' />
						</Col>
						<Col xs={ 4 } md={ 6 }>
							<div className='menu-search'>
								<FA
									name='search'
									className='menu-search-icon'
								/>
								<input
									type='text'
									className='menu-search-input'
								/>
							</div>
						</Col>
						<Col xs={ 4 } md={ 3 }>
							Account
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
