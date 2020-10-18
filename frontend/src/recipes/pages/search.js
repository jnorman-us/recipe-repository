import React from 'react';
import FA from 'react-fontawesome';
import CountUp from 'react-countup';
import { Container } from 'react-bootstrap';

import Page from '../../page.js';

import RecipeCardComponent from '../components/recipe-card.js';
import randomRecipeWorker from '../workers/random-recipes';
import recipeSearchWorker from '../workers/recipe-search';
import recipeCountWorker from '../workers/recipe-count';

import '../../styles/recipe-search.css';

export default class RecipeSearchComponent extends Page
{
	constructor(props)
	{
		super(props);

		this.search_query = '';
		this.recipes = new Map();
		this.recipe_count = 0;
	}

	async componentDidMount()
	{
		this.setState({
			initial_loading: true,
			input_focused: false,
			searching: false,
			search_loading: false,
		});

		const recipe_count = await recipeCountWorker();

		this.recipe_count = recipe_count;

		this.setState({
			initial_loading: false,
		});
	}

	async handleChange(e)
	{
		this.search_query = e.target.value;
	}

	async handleKeyDown(e)
	{
		if(e.key === "Enter")
		{
			if(this.search_query == "")
			{
				this.setState({
					searching: false,
					search_loading: false,
				});
			}
			else
			{
				this.setState({
					searching: true,
					search_loading: true,
				});

				const recipes = await recipeSearchWorker(this.search_query);
				this.recipes.clear();

				for(var recipe of recipes)
				{
					this.recipes.set(recipe.id, recipe);
				}

				this.setState({
					search_loading: false,
				});
			}
		}
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
		var mobile = this.state.mobile;
		var initial_loading = this.state.initial_loading;
		var input_focused = this.state.input_focused;
		var searching = this.state.searching;
		var search_loading = this.state.search_loading;

		var recipe_search_content = `recipe-search-content ${ mobile ? 'recipe-search-content-mobile' : '' } ${ searching ? 'recipe-search-content-searching' : '' }`;

		var recipe_search_header_count = this.recipe_count;
		var recipe_search_bar = `recipe-search-bar ${ input_focused ? 'recipe-search-bar-focused' : '' }`;
		var recipe_search_bar_input_placeholder = !initial_loading;

		var recipe_search_results = [];
		for(var [id, recipe] of this.recipes)
		{
			recipe_search_results.push(
				<div key={ id }>
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
								onKeyDown={ this.handleKeyDown.bind(this) }
								onFocus={ this.handleFocus.bind(this) }
								onBlur={ this.handleBlur.bind(this) }
								placeholder={ "test" }
							/>
						</div>
						<> { searching &&
							<div className="recipe-search-results">
								<Container responsive="true">
									{ recipe_search_results }
								</Container>
							</div>
						} </>
					</div>
				</div>
			</div>
		);
	}
}
