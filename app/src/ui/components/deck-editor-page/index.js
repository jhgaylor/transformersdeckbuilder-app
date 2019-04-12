import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import { Button, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Icon from '../icon/index.js';
import { _ } from 'underscore';
import CardSearchCollapsable, { CardSearchCollapsableCardCountController } from '../card-search-collapsable/index.js'
import BattleIcon from '../battle-icon/index.js';
import {BoldToughRatio, BattleIconsRatio, RarityRatio, BattleIconsPerBattle, TypeRatio, SubTypeRatio} from '../charts/index.js';
import CardWithImage from '../card-with-image/index.js';
import {iconify} from '../helpers.js';
import { Mutation } from "react-apollo";
import { TTCGQueries, TTCGMutations, TTCGUpdaters } from '../../../api/graphql.js';

export default class DeckEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggleBattleCardCollapsable = this.handleToggleBattleCardCollapsable.bind(this);
    this.handleToggleCharacterCardCollapsable = this.handleToggleCharacterCardCollapsable.bind(this);

    this.state = {
    	battleCardsCollasableOpen: false,
    	characterCardsCollasableOpen: false,
    };
  }

	handleToggleBattleCardCollapsable(){
		let newValue = ! this.state.battleCardsCollasableOpen;
		this.setState({
			battleCardsCollasableOpen: newValue
		})
	}

	handleToggleCharacterCardCollapsable(){
		let newValue = ! this.state.characterCardsCollasableOpen;
		this.setState({
			characterCardsCollasableOpen: newValue
		})
	}

	render() {
		console.log("render deck editor page", this.props)
		let {deck, user, allCards} = this.props;
		if (! deck || ! deck.name) {
			return null
		}
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;

		let deckCardsByName = deck.cards.reduce((acc, next) => {
      if (acc[next.name] !== undefined) {
        return acc
      }
      acc[next.name] = next
      return acc
    }, {})
    let deckCardCountsByName = _.countBy(deck.cards, function(card) {
      return card.name;
    });
    let deckCards = Object.keys(deckCardCountsByName).map((name) => {
      return {
        card: deckCardsByName[name],
        count: deckCardCountsByName[name]
      }
    })
		let starCount = deck.cards.reduce((acc, card) => {
			const currentStars = card.stars || 0
			return acc + currentStars
		}, 0);

		let numberOfBattleCards = deck.stats.breakdowns.battle

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<h1>
							<DeckNameController deck={deck} user={user} />
							{
								amLoggedIn ? <DeckCopyController deck={deck} /> : null
							}
							{
								amDeckOwner ?
								<span>
									<DeckPublicityController deck={deck} />
								</span>
								: null
							}

						</h1>
						<p>Description:</p>
						<DeckDescriptionController deck={deck} user={user} />
					</div>
				</div>

				<DeckStatsCharts deckId={deck.id} user={user} />

				<div className="row">
					<div className="col">
						<h3>
							Characters
							<span>
								{
								amDeckOwner ?
								<Button onClick={this.handleToggleCharacterCardCollapsable}>{this.state.characterCardsCollasableOpen ? "Close" : "Add Character"}</Button>
								: null
								}
								<span className="float-right">
									{starCount} / 25 <span className="icon-star"/>
								</span>
							</span>
						</h3>
						{
							! this.state.characterCardsCollasableOpen ? null :
							<CardSearchCollapsable
								deck={deck}
								cards={allCards}
								cardKind="character"
								deckCards={deckCards}
								/>
						}
						{ this.renderCharacterCardsTable() }
					</div>
				</div>

				<div className="row">
					<div className="col">
						<h3>
							Battle Cards
							<span>
								{
								amDeckOwner ?
								<Button onClick={this.handleToggleBattleCardCollapsable}>{this.state.battleCardsCollasableOpen ? "Close" : "Add Card"}</Button>
								: null
								}
								<span className="float-right">
									{numberOfBattleCards} / 40
								</span>
							</span>
						</h3>
						{
							! this.state.battleCardsCollasableOpen ? null :
							<CardSearchCollapsable
								cards={allCards}
								deck={deck}
								cardKind="battle"
								deckCards={deckCards}
								/>
						}
						{ this.renderBattleCardsTable() }
					</div>
				</div>
			</div>
		)
	}

	renderCharacterCardsTable(){
		let {deck, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;
		let characterCards = deck.cards.filter((card) => {
			return card.kind === "character"
		})
		let characterCardsByName = characterCards.reduce((acc, next) => {
			if (acc[next.name] !== undefined) {
				return acc
			}
			acc[next.name] = next
			return acc
		}, {})
		let characterCardCountsByName = _.countBy(characterCards, function(card) {
		  return card.name;
		});
		let characterDeckCards = Object.keys(characterCardCountsByName).map((name) => {
			return {
				card: characterCardsByName[name],
				count: characterCardCountsByName[name]
			}
		})
		let characterTableData = characterDeckCards
		let characterTableColumns = [{
			text: "Name",
			dataField: "card.name",
			formatter: (cell, row) => {
				let card = row.card;
				return (
					<CardWithImage card={card} />
				);
			},
			sort: true,
		}, {
			text: "Stars",
			dataField: "card.stars",
			sort: true,
			headerFormatter: () => {
				return <Icon icon="star"/>
			}
		}, {
			text: "Type",
			dataField: "card.type",
			sort: true,
			formatter: (cell, row) => {
				let name = cell;
				let typeParts = name.split("//");
				let altTypes = typeParts.shift().trim().split(",").map(iconify)
				let botTypes = typeParts.shift().trim().split(",").map(iconify)
				return (
					<p>
						<span className="text-nowrap">Alt: {altTypes}</span><br />
						<span className="text-nowrap">Bot: {botTypes}</span>
					</p>
				);
			},
		}, {
			text: "Alt",
			dataField: "card._alt",
			formatter: (cell, row) => {
				let card = row.card;
				return (
					<div>
						<p>{card.alt_mode_attack} <Icon icon="attack" />/ {card.health} <Icon icon="health" />/ {card.alt_mode_armor} <Icon icon="armor" /></p>
						<p>{card.alt_mode_text}</p>
						{ card.alt2_mode_attack == null ? null :
							<span>
								<hr style={{backgroundColor: "white"}}/>
								<p>{card.alt2_mode_attack} <Icon icon="attack" />/ {card.health} <Icon icon="health" />/ {card.alt2_mode_armor} <Icon icon="armor" /></p>
								<p>{card.alt2_mode_text}</p>
							</span>
						}
					</div>
				);
			},
		}, {
			text: "Bot",
			dataField: "card._bot",
			formatter: (cell, row) => {
				let card = row.card;
				return (
					<div>
						<p>{card.bot_mode_attack} <Icon icon="attack" />/ {card.health} <Icon icon="health" />/ {card.bot_mode_armor} <Icon icon="armor" /></p>
						<p>{card.bot_mode_text}</p>
					</div>
				);
			}
		}, {
			text: "Actions",
			dataField: "card._actions",
			formatter: (cell, row) => {
				let card = row.card;
				if (! amDeckOwner) {
					return null
				}
				return (
					<DeckCardRemovalController deck={deck} card={card} />
				);
			}
		}];
		return (
			<BootstrapTable
				keyField="card.name"
				data={characterTableData}
				columns={characterTableColumns}
				classes="card-table"
				/>
		)
	}

	renderBattleCardsTable() {
		let {deck, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;
		let battleCards = deck.cards.filter((card) => {
			return card.kind === "battle"
		})
		let battleCardsByName = battleCards.reduce((acc, card) => {
			if (acc[card.name] !== undefined) {
				return acc
			}
			acc[card.name] = card
			return acc
		}, {})
		let battleCardCountsByName = _.countBy(battleCards, function(card) {
		  return card.name;
		});
		let battleDeckCards = Object.keys(battleCardCountsByName).map((name) => {
			return {
				card: battleCardsByName[name],
				count: battleCardCountsByName[name]
			}
		})
		let battleTableData = battleDeckCards;
		let battleTableColumns = [{
			text: "Name",
			dataField: "card.name",
			sort: true,
			classes: "name-column",
			formatter: (cell, row) => {
				let card = row.card;
				return (
					<CardWithImage card={card} />
				);
			},
		}, {
			text: "Type",
			dataField: "card.type",
			sort: true,
      formatter: (cell, row) => {
        let card = row.card;
        return (
          <div>
            <p>{card.type}</p>
            <p>{card.subtype}</p>
          </div>
        );
      },
		}, {
			text: "Stars",
			dataField: "card.stars",
			sort: true,
			headerFormatter: () => {
				return <Icon icon="star"/>
			}
		}, {
			text: "Orange Battle Icons",
			dataField: "card.orange_battle_icons",
			sort: true,
			headerClasses: "battle-icon-column",
			headerFormatter: (col, index) => {
				return <BattleIcon color="orange" />
			},
		}, {
			text: "Blue Battle Icons",
			dataField: "card.blue_battle_icons",
			sort: true,
			headerClasses: "battle-icon-column",
			headerFormatter: (col, index) => {
				return <BattleIcon color="blue" />
			},
		}, {
			text: "White Battle Icons",
			dataField: "card.white_battle_icons",
			sort: true,
			headerClasses: "battle-icon-column",
			headerFormatter: (col, index) => {
				return <BattleIcon color="white" />
			},
		}, {
			text: "Green Battle Icons",
			dataField: "card.green_battle_icons",
			sort: true,
			headerClasses: "battle-icon-column",
			headerFormatter: (col, index) => {
				return <BattleIcon color="green" />
			},
		}, {
			text: "Text",
			dataField: "card.text",
			sort: true,
		}, {
			text: "#",
			dataField: "count",
			sort: true,
			formatter: (cell, row, i, extra) => {
				let card = row.card;
        let cardCount = row.count;
				if (! extra.amDeckOwner) {
					return (<div>{cardCount}</div>)
				}
        let maxCardCount = card.kind === "character" ? 1 : 3;
        let controllers = _.range(0, maxCardCount+1).map((i) => {
  				return (
  					<CardSearchCollapsableCardCountController
              key={`${card.name}-table-${i}`}
              targetCount={i}
              currentCount={cardCount}
              card={card}
              deck={deck}
            />
  				);
        });
        return (<div>{controllers}</div>);
      },
      formatExtraData: {
      	amDeckOwner: amDeckOwner
      }
		}]
		return (
			<BootstrapTable
				keyField="card.name"
				data={battleTableData}
				columns={battleTableColumns}
				classes="card-table"
				/>
		)
	}
}

DeckEditor.propTyes = {
	id: PropTypes.string.isRequired,
	deck: PropTypes.object.isRequired,
}

function DeckPublicityController({deck}) {
	return (
		<Mutation mutation={TTCGMutations.EDIT_DECK_PUBLICITY}>
			{mutate => (
				<Button onClick={e => {
					mutate({variables: {id: deck.id, is_public: ! deck.is_public}})
				}}>
					{deck.is_public ? "Make Private" : "Make Public"}
				</Button>
			)}
		</Mutation>
	)
}

class DeckNameController extends Component {

	constructor(props, context) {
    super(props, context);
    this.handleChangeName = this.handleChangeName.bind(this);
		this.handleToggleNameEditMode = this.handleToggleNameEditMode.bind(this);
  	this.makeHandleSaveDeckName = this.makeHandleSaveDeckName.bind(this);
    this.state = {
    	nameEditMode: false,
    	name: props.deck.name,
    };
  }

	makeHandleSaveDeckName(mutate) {
		let {deck} = this.props;
		return (e) => {
			e.preventDefault();
	    const newName = this.state.name
			mutate({variables: {
				id: deck.id,
				name: newName,
			}})
			this.setState({
				nameEditMode: false,
			})
		}
	}

	handleChangeName(e) {
		e.preventDefault()
		this.setState({
			name: e.target.value,
		})
	}

	handleToggleNameEditMode(e) {
		e.preventDefault()
		this.setState({
			nameEditMode: !this.state.nameEditMode,
		})
	}

	render() {
		const {nameEditMode} = this.state;
		return (
			<Mutation mutation={TTCGMutations.EDIT_DECK_NAME}>
				{mutate => {
						return nameEditMode ? this.renderEditMode(mutate) : this.renderViewMode()
					}
				}
			</Mutation>
		)
	}

	renderEditMode(mutate) {
		const {deck} = this.props;
		return (
			<span>
				<Input
				  type="textbox"
				  name="name"
				  id="name"
				  ref="nameInput"
				  value={deck.name}
				  onChange={this.handleChangeName}
				  />
				<Button onClick={this.makeHandleSaveDeckName(mutate)}>
					 Save
				</Button>
				<Button onClick={this.handleToggleNameEditMode}>
					 Cancel Name Change
				</Button>
			</span>
		)
	}

	renderViewMode() {
		const {deck, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;
		return (
			<span>
				<span>{deck.name}</span>
				{
					amDeckOwner ? 
					<Button onClick={this.handleToggleNameEditMode}>
					  Edit Name
					</Button>
					: null
				}
			</span>
		)
	}  
}

class DeckDescriptionController extends Component {
	constructor(props, context) {
    super(props, context);
    this.makeHandleChangeDeckDescription = this.makeHandleChangeDeckDescription.bind(this);
  }

	makeHandleChangeDeckDescription(mutate) {
		return (e) => {
			let {deck} = this.props;
			e.preventDefault();
			const description = e.target.value;
			mutate({variables: {
				id: deck.id,
				description: description,
			}})
			this.setState({
				nameEditMode: false,
			})
		}
	}


	render() {
		const {deck, user} = this.props;
		const amLoggedIn = (user && user.email && user.email !== "");
		let amDeckOwner = amLoggedIn && user.id === deck.owner_id;
		return (
			<Mutation mutation={TTCGMutations.EDIT_DECK_DESCRIPTION}>
				{mutate => {
						return amDeckOwner ? this.renderEditMode(mutate) : this.renderViewMode()
					}
				}
			</Mutation>
		)
	}

	renderEditMode(mutate) {
		let {deck} = this.props;
		return (
			<DeckDescriptionEditor
				handleChange={this.makeHandleChangeDeckDescription(mutate)}
				deck={deck}
				/>
		)
	}

	renderViewMode() {
		let {deck} = this.props;
		return (
			<DeckDescription deck={deck} />
		)
	}
}

class DeckDescriptionEditor extends Component {
	render() {
		let { deck } = this.props;
		if (! deck.name) {
			return null;
		}
	  return (
	  	<Input
	  	  type="textarea"
	  	  name="text"
	  	  id="description"
	  	  onBlur={this.props.handleChange}
	  	  defaultValue={deck.description}
	  	  placeholder="Description"
	  	  rows="5"
	  	  />
	  	)
	}
}

class DeckDescription extends Component {
	render() {
		let {deck} = this.props
		let description = deck.description || ""

		let descriptionParts = description.split('\n')
	
		let descriptionElements = descriptionParts.map((item, key) => {
		  return (
		    <span key={key}>
		      {item}
		      <br/>
		    </span>
		  )
		})
	
		return (
			<p>{descriptionElements}</p>
		)
	}
}

class DeckCardRemovalController extends Component {
	render() {
		let {deck, card} = this.props
		let variables = {
			id: deck.id,
			card_name: card.name,
			count: 0,
		}
		return (
			<Mutation mutation={TTCGMutations.SET_DECK_LIST_ENTRY_COUNT} update={TTCGUpdaters.updateCacheWithDeckListEntry}>
			{mutate => (
				<Button onClick={(e) => {mutate({variables})}}>
					Remove
				</Button>
			)}
			</Mutation>
		)
	}
}

class DeckCopyController extends Component {
	render() {
		const { deck } = this.props;

		let variables = {
			id: deck.id
		}

		return (
			<Mutation mutation={TTCGMutations.COPY_DECK} update={TTCGUpdaters.updateCacheWithCopiedDeck}>
			{mutate => (
				<Button onClick={(e) => {mutate({variables})}}>Copy</Button>
			)}
			</Mutation>
		)
	}
}

function RenderDeckStatsCharts({deckId}) {
  return ({ loading, error, data, refetch }) => {
    // console.log("deck editor page", loading, error, data)
    if (error) return `Error!: ${error}`;
    let {deck} = data;
    if (loading || ! deck ) return null
		console.log("render stats chart subpart")
		let numberOfBoldCards = deck.stats.breakdowns.bold
		let numberOfToughCards = deck.stats.breakdowns.tough
		let numberOfArmorCards = deck.stats.breakdowns.armor
		let numberOfUtilityCards = deck.stats.breakdowns.utility
		let numberOfWeaponCards = deck.stats.breakdowns.weapon
		let numberOfUpgradeCards = deck.stats.breakdowns.upgrade
		let numberOfActionCards = deck.stats.breakdowns.action

		let orange_battle_icons_per_battle = deck.stats.battleIcons.perBattle.orange;
		let blue_battle_icons_per_battle = deck.stats.battleIcons.perBattle.blue;
		let white_battle_icons_per_battle = deck.stats.battleIcons.perBattle.white;
		let green_battle_icons_per_battle = deck.stats.battleIcons.perBattle.green;
		let blank_cards_per_battle = deck.stats.battleIcons.perBattle.none;

		let orange_battle_icons = deck.stats.battleIcons.total.orange
		let blue_battle_icons = deck.stats.battleIcons.total.blue
		let white_battle_icons = deck.stats.battleIcons.total.white
		let green_battle_icons = deck.stats.battleIcons.total.green
		let cards_without_battle_icons = deck.stats.battleIcons.total.none;
		console.log("green cards", green_battle_icons)
		let rarities = deck.stats.rarities;
		
		return (
			<div>
				<div className="row">
					<div className="col">
						<h4 className="text-center">Battle Icons</h4>
						<BattleIconsRatio key="battle-deck-pips-ratio"
							blue={blue_battle_icons}
							orange={orange_battle_icons}
							white={white_battle_icons}
							green={green_battle_icons}
							none={cards_without_battle_icons}
							/>
					</div>
					<div className="col">
						<h4 className="text-center">Battle Icons Per Battle</h4>
						<BattleIconsPerBattle key="battle-deck-pips-per-battle"
							white={white_battle_icons_per_battle}
							blue={blue_battle_icons_per_battle}
							orange={orange_battle_icons_per_battle}
							green={green_battle_icons_per_battle}
							none={blank_cards_per_battle}
							/>
					</div>
					<div className="col">
						<h4 className="text-center">Bold / Tough</h4>
						<BoldToughRatio key="battle-deck-bold-tough-ratio"
							bold={numberOfBoldCards}
							tough={numberOfToughCards}
							/>
					</div>
				</div>

				<div className="row">
					<div className="col">
						<h4 className="text-center">Rarities</h4>
						<RarityRatio key="battle-deck-rarity-ratio"
							common={rarities['c'] || 0}
							uncommon={rarities['u'] || 0}
							rare={rarities['r'] || 0}
							superRare={rarities['sr'] || 0}
							/>
					</div>
					<div className="col">
						<h4 className="text-center">Actions / Upgrades</h4>
						<TypeRatio key="battle-deck-type-ratio"
							action={numberOfActionCards}
							upgrade={numberOfUpgradeCards}
							/>
					</div>
					<div className="col">
						<h4 className="text-center">Weapon / Armor / Utility</h4>
						<SubTypeRatio key="battle-deck-subtype-ratio"
							armor={numberOfArmorCards}
							utility={numberOfUtilityCards}
							weapon={numberOfWeaponCards}
							/>
					</div>
				</div>
			</div>
		)
  }
}

function DeckStatsCharts(props) {
  let { deckId } = props;
  let query = TTCGQueries.GET_DECK_STATS;
  let queryParameters = {
    id: deckId
  }
  return (
    <Query query={query} pollInterval={60*1000} variables={queryParameters}>
      {RenderDeckStatsCharts(props)}
    </Query>
  )
}
