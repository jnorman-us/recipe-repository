import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import RecipeSearchPage from './recipes/pages/search.js';
import UserLoginPage from './user/pages/login.js';
import UserLogoutPage from './user/pages/logout.js';

import './styles/page.css';

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
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}

	updateDimensions()
	{
		const width = window.innerWidth;

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
				<Router>
					<Switch>
						<Route exact path="/">
							<RecipeSearchPage mobile={ mobile } />
						</Route>
						<Route exact path="/login">
							<UserLoginPage mobile={ mobile } />
						</Route>
						<Route exact path="/register">login
						</Route>
						<Route exact path="/logout">
							<UserLogoutPage mobile={ mobile } />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}
