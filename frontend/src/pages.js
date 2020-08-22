import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MenuPage from './menu/page.js';
import RecipeSearchPage from './recipe-search/page.js';

import './page.css';

export default class Pages extends React.Component
{
	render()
	{
		return (
			<div>
					<MenuPage />
				<div className="page-menu">
				</div>
				<div className="page-content">
					<Router>
						<Switch>
							<Route exact path="/">
								<RecipeSearchPage />
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
