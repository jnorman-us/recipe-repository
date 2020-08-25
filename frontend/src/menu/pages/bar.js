import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Page from '../../page.js';

import RecipeSearchComponent from '../../recipes/components/search.js';

import '../../styles/menu.css';

export default class MenuBarPage extends Page
{
	async componentDidMount()
	{

	}

	render()
	{
		console.log(this.state.mobile);

		return (
			<div className={ `menu ${ this.state.mobile ? 'menu-mobile' : '' }`}>
				<Container fluid className="px-0">
					<Row>
						<Col xs={ 4 } md={ 3 }>
							<div className='menu-logo' />
						</Col>
						<Col xs={ 4 } md={ 6 }>
							<RecipeSearchComponent />
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
