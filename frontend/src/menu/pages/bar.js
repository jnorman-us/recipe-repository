import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Page from '../../page.js';

import RecipeSearchBarComponent from '../../recipes/components/recipe-search-bar';

import '../../styles/menu.css';

export default class MenuBarPage extends Page
{
	async componentDidMount()
	{
	}

	render()
	{
		const mobile = this.state.mobile;

		const menu = `menu ${ mobile ? 'menu-mobile' : '' }`;
		const text_recipe = mobile ? 'R' : "Recipe";
		const text_repo = mobile ? 'R' : "Repo";

		return (
			<div className={ menu }>
				<div className="menu-content">
					<div className="menu-logo">
						<div className="menu-logo-recipe">{ text_recipe }</div>
						<div className="menu-logo-repo">{ text_repo }</div>
					</div>
					<div className="menu-search">
						<RecipeSearchBarComponent mobile={ mobile } />
					</div>
				</div>
			</div>
		);
	}
}
