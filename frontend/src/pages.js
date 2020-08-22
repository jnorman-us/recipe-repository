import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuPage from './menu/page.js';
import RecipeSearchPage from './recipe-search/page.js';

import Session from './main/session.js';

import './page.css';

export default class Pages extends React.Component
{
	constructor()
	{
		super();

		this.state = {
			mobile: false,
		};
	}

	async componentDidMount()
	{
		await Session.initialize();

		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	updateDimensions()
	{
		const width = window.innerWidth;
		const height = window.innerHeight;

		const mobile_width = 800;

		if(width <= mobile_width && !this.state.mobile)
		{
			this.setState({
				mobile: true,
			});
		}
		else if(width > mobile_width && this.state.mobile)
		{
			this.setState({
				mobile: false,
			});
		}
	}

	render()
	{
		const mobile = this.state.mobile;

		return (
			<div>
				<MenuPage mobile={ mobile } />
				<div className="page-menu" />
				<div className="page-content">
					<Router>
						<Switch>
							<Route exact path="/">
								<RecipeSearchPage mobile={ mobile } />
							</Route>
							<Route exact path="/login">
							</Route>
							<Route exact path="/register">
							</Route>
							<Route exact path="/logout">
							</Route>
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
}
