import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit'

import DeckDiscoveryController from '../deck-discovery-controller/index.js'
import DeckList from '../../containers/deck-list/index.js'
import FirstDeckCTA from '../first-deck-cta/index.js'
import NewDeck from '../new-deck/index.js'

export default class DeckListPage extends Component {
	constructor(props) {
    super(props);

    this.handleChangeFilters = this.handleChangeFilters.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);

    this.state = {
      filters: {
      	colors: [],
      	characterTypes: []
      },
      sort: {},
    };
  }

  handleChangeFilters(newFilters) {
  	this.setState({
  		filters: newFilters
  	})
  }

  handleChangeSort(newSort) {
  	this.setState({
  		sort: newSort
  	})
  }

  renderLoadingIndicator() {
		return (
			<div className="loading-indicator">
				<Spinner name="ball-clip-rotate-multiple" color="#ffaf38"/> 
			</div>
		)
	}

	render() {
		let {loading} = this.props;
		return (
			<div className="container deck-list-page">
				{ 
					loading ? 
					this.renderLoadingIndicator()
					: this.renderMain()
				}
			</div>
		)
	}

	renderMain() {
		let {decks, loading, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let myDecks = decks.filter((deck) => {
			return amLoggedIn && user.id === deck.owner_id;
		})
		let renderFirstDeckCTA = (! loading) && amLoggedIn && myDecks.length === 0
		// console.log("rendering deck list page decks", decks, amLoggedIn, loading, renderFirstDeckCTA)
		return (
			<div>
				{ 
					amLoggedIn ? null :
					<div>
						<h2><Link to="/signup">Sign Up</Link> or <Link to="/login">Sign In</Link> to manage your own decks</h2>
						<h3>Or check out the decks created by other users below</h3>
					</div>
				}
				{ renderFirstDeckCTA ? <FirstDeckCTA /> : null }
				{ amLoggedIn ? <NewDeck /> : null }
				<DeckDiscoveryController 
					filters={this.state.filters}
					sort={this.state.sort}
					onChangeFilters={this.handleChangeFilters}
					onChangeSort={this.handleChangeSort}
					/>
				<DeckList decks={decks} user={user} filters={this.state.filters} sort={this.state.sort}/>
			</div>
		)
	}
}
