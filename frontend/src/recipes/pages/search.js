import React from 'react';
import FA from 'react-fontawesome';
import CountUp from 'react-countup';
import { SpringGrid, makeResponsive } from 'react-stonecutter';

import Page from '../../page.js';

import RecipeCardComponent from '../components/recipe-card.js';
import randomRecipeWorker from '../workers/random-recipes';
import recipeCountWorker from '../workers/recipe-count';

import '../../styles/recipe-search.css';

export default class RecipeSearchComponent extends Page
{
	constructor(props)
	{
		super(props);

		this.recipes = new Map();
		this.recipe_count = 0;
	}

	async componentDidMount()
	{
		this.setState({
			recipes_loading: true,
			input_focused: false,
		});

		const recipe_count = await recipeCountWorker();
		const recipes = await randomRecipeWorker();

		this.recipe_count = recipe_count;
		for(const recipe of recipes)
		{
			this.recipes.set(recipe.id, recipe);
		}

		this.setState({
			recipes_loading: false,
		});
	}

	async handleChange(e)
	{
		console.log(e.target.value);
	}

	async handleFocus(e)
	{
		this.setState({
			input_focused: true,
		});
	}

	async handleBlur(e)
	{
		this.setState({
			input_focused: false,
		});
	}

	render()
	{
		const Grid = makeResponsive(SpringGrid, { default_columns: 2 })

		var mobile = this.state.mobile;
		var recipes_loading = this.state.recipes_loading;
		var input_focused = this.state.input_focused;

		var recipe_search_content = `recipe-search-content ${ mobile ? 'recipe-search-content-mobile' : '' }`;

		var recipe_search_header_count = this.recipe_count;
		var recipe_search_bar = `recipe-search-bar ${ input_focused ? 'recipe-search-bar-focused' : '' }`;
		var recipe_search_bar_input_placeholder = !recipes_loading;

		var recipe_search_results = [];
		for(var recipe of this.recipes)
		{
			recipe_search_results.push(
				<div key={ recipe.id }>
					<RecipeCardComponent
						recipe={ recipe }
					/>
				</div>
			);
		}

		return (
			<div>
				<div className="recipe-search-background" />
				<div className="page-content">
					<div className={ recipe_search_content }>
						<div className="recipe-search-header">
							Search&nbsp;
								<CountUp
									end={ recipe_search_header_count }
									duration={ 2 }
									separator={ "," }
								/> Recipes
						</div>
						<div className={ recipe_search_bar }>
							<FA
								name="search"
								className="recipe-search-bar-icon"
							/>
							<input
								type="text"
								className="recipe-search-bar-input"
								onChange={ this.handleChange.bind(this) }
								onFocus={ this.handleFocus.bind(this) }
								onBlur={ this.handleBlur.bind(this) }
								placeholder={ "test" }
							/>
						</div>
						<div className="recipe-search-results">
							<Grid

							>
								{ recipe_search_results }
							</Grid>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
