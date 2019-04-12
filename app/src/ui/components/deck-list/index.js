import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeckListPageItem from '../../components/deck-list-page-item/index.js'

export default class DeckList extends Component {
	render() {
		let {decks, user} = this.props;
		let deckListItems = decks.map((deck) => {
			return (
				<DeckListPageItem key={deck.id} deck={deck} user={user}/>
			)
		})
		return (
			<div>
				<div>
					{deckListItems}
				</div>
			</div>
		)
	}
}

DeckList.propTyes = {
	decks: PropTypes.array.isRequired,
}
