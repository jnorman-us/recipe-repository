import React from 'react';

import '../../styles/recipe-card.css';

export default class RecipeCardComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.recipe = props.recipe;
	}

	render()
	{
		return (
			<div className="recipe-card">
				{ JSON.stringify(this.recipe) }
			</div>
		);
	}
}
