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
			<div>
				
			</div>
		);
	}
}
