import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Jumbotron} from 'reactstrap'
import {formatImageName} from '../helpers.js';
import DismissableAlert from '../dismissable-alert/index.js'

function getCharactersForDeck(deck) {
	return deck.cards.filter((card) => {
		return card && card.kind === "character"
	})
}

export default class Home extends Component {
	render() {
		let { user } = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let beginnersDeckCharacterImages = null
		let beginnersDeck = this.props.beginnerSection.deck
		let beginnersDeckLink = ""
		if (beginnersDeck) {
			beginnersDeckLink = `/decks/${beginnersDeck.id}`
			const characterCards = beginnersDeck.cards.filter((card) => {
				return card.kind === "character"
			})
			beginnersDeckCharacterImages = characterCards.map((card) => {
				let imageName = formatImageName(card.name)
				let imageUrl = `/images/${imageName}-alt.png`
				if (card.combiner_mode_attack != null) {
					imageUrl = `/images/${imageName}-combiner.png`
				}
				return (
					<div className="col beginners-deck-character" key={card.name}>
						<img alt={card.name} src={imageUrl} />
					</div>
				)
			})
		}
		let recentDecks = this.props.recentDecks.map((deck) => {
			let characterCards = getCharactersForDeck(deck)
			let characters = characterCards.map((card) => {
				let imageName = formatImageName(card.name)
				let imageUrl = `/images/${imageName}-alt.png`
				if (card.combiner_mode_attack != null) {
					imageUrl = `/images/${imageName}-combiner.png`
				}
				return (
					<div className="col" key={imageUrl}>
						<img alt={card.name} src={imageUrl} />
					</div>
				)
			})
			if (characters.length === 0) {
				characters = (
					<div className="col">
						<p>No characters specified yet.</p>
					</div>
				)
			}
			let deckUrl = `/decks/${deck.id}`
			return (
				<div key={deck.name} className="deck">
					<div className="row">
						<div className="col">
							<h3>
								<Link to={deckUrl}>{deck.name}</Link>
							</h3>
						</div>
					</div>
					<div className="row">
						{characters}
					</div>
				</div>
			)
		})

		let editorDeck1 = this.props.editorsPicks.one || {};
		let editorDeck1CharacterImages = [];
		let editorDeck1Link = ""
		if (editorDeck1.name) {
			editorDeck1Link = `/decks/${editorDeck1.id}`
			let editorDeck1CharacterCards = getCharactersForDeck(editorDeck1)
			editorDeck1CharacterImages = editorDeck1CharacterCards.map((card) => {
				let imageName = formatImageName(card.name)
				let imageUrl = `/images/${imageName}-alt.png`
				if (card.combiner_mode_attack != null) {
					imageUrl = `/images/${imageName}-combiner.png`
				}
				return (
					<div className="col beginners-deck-character" key={card.name}>
						<img alt={card.name} src={imageUrl} />
					</div>
				)
			})
		}
		
		let editorDeck2 = this.props.editorsPicks.two || {};
		let editorDeck2CharacterImages = [];
		let editorDeck2Link = ""
		if (editorDeck2.name) {
			editorDeck2Link = `/decks/${editorDeck2.id}`
			let editorDeck2CharacterCards = getCharactersForDeck(editorDeck2)
			editorDeck2CharacterImages = editorDeck2CharacterCards.map((card) => {
				let imageName = formatImageName(card.name)
				let imageUrl = `/images/${imageName}-alt.png`
				if (card.combiner_mode_attack != null) {
					imageUrl = `/images/${imageName}-combiner.png`
				}
				return (
					<div className="col beginners-deck-character" key={card.name}>
						<img alt={card.name} src={imageUrl} />
					</div>
				)
			})
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<DismissableAlert color="primary">
							New to the game? Check out <a target="_blank" rel="noopener noreferrer" href="https://www.reddit.com/r/TransformersTCG/comments/96yewv/new_players_here_is_everything_you_need_to_know/">this getting started material</a>
						</DismissableAlert>
					</div>
				</div>

				<Jumbotron>
					<div className="row">
						{beginnersDeckCharacterImages}
					</div>
	        <hr className="my-2" />

					<div className="row text-center">
						<div className="col">
								<h1>
									<Link to={beginnersDeckLink}>View the Official Starter Deck</Link>
								</h1>
						</div>
					</div>
				</Jumbotron>

				<div className="row">
					<div className="col">
						<h2>Build New Deck</h2>
						<p>Stuck? Unsure? Tired of playing the same thing but don’t know what else to do? Don’t panic. We have the perfect tool for you!</p>
						{ 
							amLoggedIn ?
							<div>
								<h3>
									<Link to="/decks">Create a Deck</Link>
								</h3>
							</div>
							:
							<div>
								<h3>
									<Link to="/signup">Sign Up</Link>
								</h3>
								<p>then</p>
								<h3>
									<Link to="/login">Sign In</Link>
								</h3>
							</div>
						}
						
					</div>
					<div className="col">
						<h2>Recent Decks</h2>
						<div className="recent-decks">
							{recentDecks}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<hr />
					</div>
				</div>

				<div className="row">
					<div className="col text-center">
						<h2>
							Highlighted Matchup
						</h2>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<h3>
							{editorDeck1.name}
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p><strong>Description:</strong> {editorDeck1.description}</p>
						<p><Link to={editorDeck1Link}>See Full Deck List</Link></p>
					</div>
				</div>
				<div className="row">
					{editorDeck1CharacterImages}
				</div>

				<div className="row">
					<div className="col text-center">
						<hr />
						<h1>vs</h1>
						<hr />
					</div>
				</div>

				<div className="row">
					<div className="col">
						<h3>
							{editorDeck2.name}
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p><strong>Description:</strong> {editorDeck2.description}</p>
						<p><Link to={editorDeck2Link}>See Full Deck List</Link></p>
					</div>
				</div>
				<div className="row">
					{editorDeck2CharacterImages}
				</div>
			</div>
		)
	}
}
