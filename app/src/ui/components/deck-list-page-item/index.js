import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';
import Messages from '../../../api/flash-messages/index.js';
import { TTCGMutations, TTCGUpdaters } from '../../../api/graphql.js';
import Icon from '../icon/index.js';
import {BattleIconsRatio, TypeRatio} from '../charts/index.js';
import { Mutation } from "react-apollo";

export default class DeckListPageItem extends Component {

	render() {
		let {deck, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;
		let deckPath = `/decks/${deck.id}/`
		// console.log("deck list item", deck)
		const createdDate = new Date(0)
		createdDate.setUTCSeconds(Math.floor(deck.created_at/1000))
		let created = moment(createdDate).fromNow();
		created = created.replace('ago', 'old')
		let characters = deck.cards.filter((card) => {
			return card.kind === "character"
		})
		let stars = deck.cards.reduce((acc, card) => {
			return acc + card.stars
		}, 0)
		let battleCards = deck.cards.filter((card) => {
			return card.kind === "battle"
		})
		let battleCardCount = battleCards.length
		// console.log("deck list item stars", stars)

		let removeButton = (
			<Mutation mutation={TTCGMutations.REMOVE_DECK} update={TTCGUpdaters.updateCacheWithRemovedDeck}>
			  {(mutate, { client, data, loading, called }) => {
			    if (called && ! loading) {
			    	Messages.flash(`Successfully removed ${deck.name}`, 'success')
			    }
			    let confirmMutation = () => {
			    	if(window.confirm("Are you sure?")) {
			    		mutate({
			    			variables: {
			    				id: deck.id
			    			}
			    		})
			    	}
			    }
			    return (
			    	<Button color="danger" onClick={confirmMutation}>Remove</Button>
		    	)
			  }}
			</Mutation>
		)
		let battleIconsRatioKey = `battle-deck-pips-ratio-${deck.name}`
		let typeRatioKey = `battle-deck-type-ratio-${deck.name}`
		return (
			<div key={deck.id} className="deck-list-page-item">
				<div className="row">
					<div className="col">
						<h2><Link to={deckPath}>{deck.name}</Link></h2>
						<p>By: {deck.owner_id.substring(0, 8)}</p>
					</div>
					<div className="col">
						<BattleIconsRatio key={battleIconsRatioKey}
							blue={deck.stats.battleIcons.total.blue}
							green={deck.stats.battleIcons.total.green}
							orange={deck.stats.battleIcons.total.orange}
							white={deck.stats.battleIcons.total.white}
							none={deck.stats.battleIcons.total.none}
							height="100%"
							/>
					</div>
					<div className="col">
						<TypeRatio key={typeRatioKey}
							action={deck.stats.breakdowns.action}
							upgrade={deck.stats.breakdowns.upgrade}
							height="100%"
							/>
					</div>
					<div className="col">
						<p>{battleCardCount} / 40</p>
						<p>{stars} <Icon icon="star"/></p>
						<p>{deck.is_public ? "Shared" : "Private"}</p>
						<p>{created}</p>
					</div>
					<DeckListTeamColumn characters={characters} />
					{ 
						amDeckOwner ?
						<div className="col">
							 {removeButton}
						</div>
						:
						null
					}
				</div>
			</div>
		)
	}
}

class DeckListTeamColumn extends Component {
	render() {
		let characters = this.props.characters.map((card) => {
			let nameParts = card.name.split("//").map((part) => part.trim())
			return (
				<div key={card.name} className="">
					<p className="character-name">{nameParts[0]}</p>
					<p className="character-sub-name">{nameParts[1]}</p>
				</div>
			)
		})
		return (
			<div className="col">
				{characters}
			</div>
		)
	}
}


// class DeckListTeamRow extends Component {
// 	render() {
// 		let characters = this.props.characters.map((card) => {
// 			let nameParts = card.name.split("//").map((part) => part.trim())
// 			return (
// 				<div key={card.name} className="col">
// 					<p className="character-name">{nameParts[0]}</p>
// 					<p className="character-sub-name">{nameParts[1]}</p>
// 				</div>
// 			)
// 		})
// 		return (
// 			<div className="row text-center">
// 				{characters}
// 			</div>
// 		)
// 	}
// }
