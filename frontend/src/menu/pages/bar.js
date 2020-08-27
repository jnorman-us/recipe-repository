import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Page from '../../page.js';

import RecipeSearchComponent from '../../recipes/components/search.js';

import getWorker from '../../workers/get.js';
import postWorker from '../../workers/post.js';

import '../../styles/menu.css';

export default class MenuBarPage extends Page
{
	async componentDidMount()
	{
		this.setState({
			user: null,
		});

		const response = await getWorker('/api/users/me');
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
