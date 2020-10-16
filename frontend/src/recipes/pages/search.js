import React from 'react';
import FA from 'react-fontawesome';

import Page from '../../page.js';

import randomRecipeWorker from '../workers/random-recipes';

import '../../styles/recipe-search.css';

export default class RecipeSearchComponent extends Page
{
	constructor(props)
	{
		super(props);

		this.recipes = new Map();
	}

	async componentDidMount()
	{
		this.setState({
			recipes_loading: true,
		});

		const recipes = await randomRecipeWorker();

		this.setState({
			recipes_loading: false,
		});
	}

	render()
	{
		var mobile = this.state.mobile;

		var recipe_search_content = `recipe-search-content ${ mobile ? 'recipe-search-content-mobile' : '' }`;
		return (
			<div>
				<div className="recipe-search-background" />
				<div className="page-content">
					<div className={ recipe_search_content }>
						<div className="recipe-search-header">
							Search 1,243 Recipes
						</div>
						<div className="recipe-search-bar">
							<FA
								name="search"
								className="recipe-search-bar-icon"
							/>
							<input type="text" className="recipe-search-bar-input" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
