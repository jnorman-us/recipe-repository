import React from 'react';
import CountUp from 'react-countup';
import { Container } from 'react-bootstrap';

import Page from '../../page.js';

import RecipeCardComponent from '../components/recipe-card.js';
import RecipeSearchBarComponent from '../components/recipe-search-bar';

import recipeCountWorker from '../workers/recipe-count';

import '../../styles/search.css';

export default class RecipeSearchPage extends Page
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
			searching: false,
			search_loading: false,
		});

		this.recipe_count = await recipeCountWorker();

		this.setState({
			initial_loading: false,
		});
	}

	async handleSearch(query)
	{
		console.log(query);
	}

	render()
	{
		var mobile = this.state.mobile;
		var searching = this.state.searching;

		var search_content = `search-content ${ mobile ? 'search-content-mobile' : '' } ${ searching ? 'search-content-searching' : '' }`;

		var search_header_count = this.recipe_count;

		var search_results = [];
		for(var [id, recipe] of this.recipes)
		{
			search_results.push(
				<div key={ id }>
					<RecipeCardComponent
						recipe={ recipe }
					/>
				</div>
			);
		}

		return (
			<div>
				<div className="search-background" />
				<div className="page-content">
					<div className={ search_content }>
						<div className="search-header">
							Search&nbsp;
								<CountUp
									end={ search_header_count }
									duration={ 2 }
									separator={ "," }
								/> Recipes
						</div>
						<RecipeSearchBarComponent
							placeholder="Chicken"
							searching="false"
							onSearch={ this.handleSearch.bind(this) }
						/>
						<> { searching &&
							<div className="search-results">
								<Container responsive="true">
									{ search_results }
								</Container>
							</div>
						} </>
					</div>
				</div>
			</div>
		);
	}
}
