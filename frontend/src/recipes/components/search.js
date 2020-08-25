import React from 'react';
import FA from 'react-fontawesome';

import '../../styles/recipesearchbar.css';

export default class RecipeSearchComponent extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			open: false,
		};

		this.insideRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount()
	{
		document.addEventListener('mousedown', this.handleClick);
	}

	componentWillUnmount()
	{
		document.removeEventListener('mousedown', this.handleClick);
	}


	handleClick(e)
	{
		if(this.insideRef && !this.insideRef.current.contains(e.target))
		{
			this.closeMenu();
		}
		else
		{
			this.openMenu();
		}
	}

	openMenu()
	{
		this.setState({
			open: true,
		});
	}

	closeMenu()
	{
		this.setState({
			open: false,
		});
	}

	render()
	{
		const open = this.state.open;

		const open_searchbar = open ? 'recipesearchbar-open' : '';
		const open_input = open ? 'recipesearchbar-input-open' : '';

		return (
			<div className={ `recipesearchbar ${ open_searchbar }` } ref={ this.insideRef }>
				<FA
					name='search'
					className='recipesearchbar-icon'
				/>
				<input
					type='text'
					className={ `recipesearchbar-input ${ open_input }` }
				/>
			</div>
		);
	}
}
