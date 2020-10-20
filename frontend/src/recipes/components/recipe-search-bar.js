import React from 'react';
import FontAwesome from 'react-fontawesome';

import '../../styles/recipe-search-bar.css';

export default class RecipeSearchBarComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.search_query = '';
		this.onSearch = props.onSearch;

		this.state = {
			placeholder: '',
			input_focused: false,
			searching: false,
		};
	}

	async componentDidMount()
	{
		this.componentWillReceiveProps(this.props);
	}

	componentWillReceiveProps(props)
	{
		const placeholder = props.placeholder;
		const searching = props.searching;

		this.setState({
			placeholder: placeholder,
			searching: searching,
		});
	}

	handleChange(e)
	{
		this.setState({
			search_query: e.target.value,
		});
	}

	handleKeyDown(e)
	{
		if(e.key === "Enter")
		{
			// some submission
			this.onSearch(this.state.search_query);
		}
	}

	handleBlur()
	{
		this.setState({
			input_focused: false,
		});
	}

	handleFocus()
	{
		this.setState({
			input_focused: true,
		});
	}

	render()
	{
		const input_focused = this.state.input_focused;
		const placeholder = this.state.placeholder;

		var recipe_search_bar = `recipe-search-bar ${ input_focused ? 'recipe-search-bar-focused' : '' }`;

		return (
			<div className={ recipe_search_bar }>
				<FontAwesome
					name="search"
					className="recipe-search-bar-icon"
				/>
				<input
					type="text"
					className="recipe-search-bar-input"
					placeholder={ placeholder }
					onChange={ this.handleChange.bind(this) }
					onKeyDown={ this.handleKeyDown.bind(this) }
					onFocus={ this.handleFocus.bind(this) }
					onBlur={ this.handleBlur.bind(this) }
				/>
			</div>
		);
	}
}
