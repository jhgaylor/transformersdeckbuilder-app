import React, { Component } from 'react';
import { _ } from 'underscore';

import BattleIcon from '../battle-icon/index.js';
import CardWithImage from '../card-with-image/index.js';

import { Mutation } from "react-apollo";

import { TTCGMutations, TTCGUpdaters } from '../../../api/graphql.js';

export default class CardSearchCollapsable extends Component {
	constructor(props) {
    super(props);

    this.handleChangeCharacterType = this.handleChangeCharacterType.bind(this);
    this.handleChangeSearchName = this.handleChangeSearchName.bind(this);
    this.handleChangeSearchName = this.handleChangeSearchName.bind(this);
    this.handleChangeHasStarsSelector = this.handleChangeHasStarsSelector.bind(this);
    this.handleChangeBoldSelector = this.handleChangeBoldSelector.bind(this);
    this.handleChangeToughSelector = this.handleChangeToughSelector.bind(this);
    this.handleChangePierceSelector = this.handleChangePierceSelector.bind(this);
    this.handleChangeBraveSelector = this.handleChangeBraveSelector.bind(this);
    this.handleChangeStealthSelector = this.handleChangeStealthSelector.bind(this);
    this.handleChangePlanSelector = this.handleChangePlanSelector.bind(this);
    this.handleChangeNoBattleIconSelector = this.handleChangeNoBattleIconSelector.bind(this);
    this.handleChangeOrangeBattleIconSelector = this.handleChangeOrangeBattleIconSelector.bind(this);
    this.handleChangeBlueBattleIconSelector = this.handleChangeBlueBattleIconSelector.bind(this);
    this.handleChangeWhiteBattleIconSelector = this.handleChangeWhiteBattleIconSelector.bind(this);
    this.handleChangeGreenBattleIconSelector = this.handleChangeGreenBattleIconSelector.bind(this);
    this.handleChangeTypeSelector = this.handleChangeTypeSelector.bind(this);
    this.handleChangeCombinerSelector = this.handleChangeCombinerSelector.bind(this);
    this.handleChangeTripleChangerSelector = this.handleChangeTripleChangerSelector.bind(this);
    this.handleChangeWave2Selector = this.handleChangeWave2Selector.bind(this);

    this.state = {
      name: "",
      no_battle_icons: false,
      blue_battle_icons: false,
      orange_battle_icons: false,
      white_battle_icons: false,
      green_battle_icons: false,
      bold: false,
      tough: false,
      pierce: false,
      brave: false,
      stealth: false,
      combiner: false,
      tripleChanger: false,
      type: null,
      characterTypes: [],
      hasStars: false,
      wave2: false,
    };
  }

  handleChangeCharacterType(e) {
    let targetCharacterType = e.target.value;
    let include = e.target.checked;
    if(include) {
      this.setState({
        characterTypes: this.state.characterTypes.concat([targetCharacterType])
      })
    } else {
      this.setState({
        characterTypes: this.state.characterTypes.filter((t) => t !== targetCharacterType)
      })
    }
  }

  handleChangeSearchName(e){
    this.setState({
      name: e.target.value
    });
  }

  handleChangeNoBattleIconSelector(e){
    this.setState({no_battle_icons: e.target.checked})
  }

  handleChangeBoldSelector(e){
    this.setState({bold: e.target.checked})
  }

  handleChangeToughSelector(e){
    this.setState({tough: e.target.checked})
  }

  handleChangePierceSelector(e){
    this.setState({pierce: e.target.checked})
  }

  handleChangePlanSelector(e){
    this.setState({plan: e.target.checked})
  }

  handleChangeBraveSelector(e){
    this.setState({brave: e.target.checked})
  }

  handleChangeStealthSelector(e){
    this.setState({stealth: e.target.checked})
  }

  handleChangeOrangeBattleIconSelector(e){
    this.setState({orange_battle_icons: e.target.checked})
  }

  handleChangeBlueBattleIconSelector(e){
    this.setState({blue_battle_icons: e.target.checked})
  }

  handleChangeWhiteBattleIconSelector(e){
    this.setState({white_battle_icons: e.target.checked})
  }

  handleChangeGreenBattleIconSelector(e){
    this.setState({green_battle_icons: e.target.checked}) 
  }

  handleChangeCombinerSelector(e){
    this.setState({combiner: e.target.checked})
  }

  handleChangeTripleChangerSelector(e){
    this.setState({tripleChanger: e.target.checked}) 
  }

  handleChangeHasStarsSelector(e){
    this.setState({hasStars: e.target.checked})  
  }

  handleChangeWave2Selector(e){
    this.setState({wave2: e.target.checked})   
  }

  handleChangeTypeSelector(e){
    let newValue = e.target.value;
    if (newValue === "null") {
      newValue = null;
    }
    this.setState({type: newValue})
  }

	render() {
    let {deckCards, cardKind, cards, deck} = this.props;

    let cardToCount = deckCards.reduce((acc, next) => {
      acc[next.card.name] = next.count;
      return acc;
    }, {})

    cards = cards.filter((card) => {
      let re = new RegExp(this.state.name, "i");
      return card.name.match(re)
    })

    cards = cards.filter((card) => {
      return card.kind === cardKind
    })
    
    if (this.state.no_battle_icons) {
      cards = cards.filter((card) => {
        return (
          card.white_battle_icons === 0 &&
          card.orange_battle_icons === 0 &&
          card.blue_battle_icons === 0 &&
          card.green_battle_icons === 0
        )
      })
    }
    if (this.state.blue_battle_icons) {
      cards = cards.filter((card) => {
        return card.blue_battle_icons > 0
      })
    }
    if (this.state.orange_battle_icons) {
      cards = cards.filter((card) => {
        return card.orange_battle_icons > 0
      })
    }
    if (this.state.white_battle_icons) {
      cards = cards.filter((card) => {
        return card.white_battle_icons > 0
      })
    }
    if (this.state.green_battle_icons) {
      cards = cards.filter((card) => {
        return card.green_battle_icons > 0
      })
    }
    if (this.state.hasStars) {
      cards = cards.filter((card) => {
        return card.stars != null && card.stars > 0
      })
    }
    if (this.state.tough) {
      cards = cards.filter((card) => {
        return card.tough > 0
      })
    }
    if (this.state.bold) {
      cards = cards.filter((card) => {
        return card.bold > 0
      })
    }
    if (this.state.pierce) {
      cards = cards.filter((card) => {
        return card.pierce > 0
      })
    }
    if (this.state.plan) {
      cards = cards.filter((card) => {
        return card.plan > 0
      })
    }
    if (this.state.brave) {
      cards = cards.filter((card) => {
        return card.brave
      })
    }
    if (this.state.stealth) {
      cards = cards.filter((card) => {
        return card.stealth
      })
    }
    if (this.state.combiner) {
      cards = cards.filter((card) => {
        return card.combiner_mode_attack != null
      })
    }
    if (this.state.tripleChanger) {
      cards = cards.filter((card) => {
        return card.alt2_mode_attack != null
      })
    }
    if (this.state.wave2) {
      cards = cards.filter((card) => {
        return card.collector_set.startsWith("Wave 2")
      })
    }
    if (this.state.characterTypes.length > 0) {
      cards = cards.filter((card) => {
        const overlap = _.intersection(card.type_tags, this.state.characterTypes)
        return overlap.length === this.state.characterTypes.length
      })
    }
    if (this.state.type && this.props.cardKind === "battle") {
      cards = cards.filter((card) => {
        return card.type === this.state.type
      })
    }
    let searchResults = cards.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    })
    let cardElements = searchResults.map((card) => {
      let cardCount = cardToCount[card.name] || 0;
      let cardKey = card.name+"-"+card.collector_set
      return (
        <CardSearchCollapsableCard
          key={cardKey}
          card={card}
          deck={deck}
          count={cardCount}
          onAddCard={this.props.onAddCard}
          onRemoveCard={this.props.onRemoveCard}
          />
      )
    });

		return (
      <div className="card-discovery-panel">
  			<div className="row">
          <div className="col">
            Name: <input
                    type="text"
                    name="searchName"
                    id="searchName"
                    placeholder="search for a name"
                    value={this.state.name}
                    onChange={this.handleChangeSearchName}
                    />
          </div>
        </div>
        {
          this.props.cardKind === "character" ? null :
          <div className="row">
            <div className="col">
              <BattleIcon color="orange" /><input
                type="checkbox"
                checked={this.state.orange_battle_icons}
                onChange={this.handleChangeOrangeBattleIconSelector}
              />
            </div>
            <div className="col">
              <BattleIcon color="blue" /><input
                type="checkbox"
                checked={this.state.blue_battle_icons}
                onChange={this.handleChangeBlueBattleIconSelector}
              />
            </div>
            <div className="col">
              <BattleIcon color="white" /><input
                type="checkbox"
                checked={this.state.white_battle_icons}
                onChange={this.handleChangeWhiteBattleIconSelector}
              />
            </div>
            <div className="col">
              <BattleIcon color="green" /><input
                type="checkbox"
                checked={this.state.green_battle_icons}
                onChange={this.handleChangeGreenBattleIconSelector}
              />
            </div>
            <div className="col">
              <BattleIcon color="none" /><input
                type="checkbox"
                checked={this.state.no_battle_icons}
                onChange={this.handleChangeNoBattleIconSelector}
              />
            </div>
          </div>
        }
        {
          this.props.cardKind === "character" ? null :
          <div className="row">
            <div className="col">
              <p>
                Has Stars<input
                  type="checkbox"
                  checked={this.state.hasStars}
                  onChange={this.handleChangeHasStarsSelector}
                />
              </p>
            </div>
          </div>
        }
        <div className="row">
          <div className="col">
            Tough<input
              type="checkbox"
              checked={this.state.tough}
              onChange={this.handleChangeToughSelector}
            />
          </div>
          <div className="col">
            Bold<input
              type="checkbox"
              checked={this.state.bold}
              onChange={this.handleChangeBoldSelector}
            />
          </div>
          <div className="col">
            Pierce<input
              type="checkbox"
              checked={this.state.pierce}
              onChange={this.handleChangePierceSelector}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            Plan<input
              type="checkbox"
              checked={this.state.plan}
              onChange={this.handleChangePlanSelector}
            />
          </div>
          <div className="col">
            Brave<input
              type="checkbox"
              checked={this.state.brave}
              onChange={this.handleChangeBraveSelector}
            />
          </div>
          <div className="col">
            Stealth<input
              type="checkbox"
              checked={this.state.stealth}
              onChange={this.handleChangeStealthSelector}
            />
          </div>
          <div className="col">
            Wave 2 Only<input
              type="checkbox"
              checked={this.state.wave2}
              onChange={this.handleChangeWave2Selector}
            />
          </div>
        </div>
        {
          this.props.cardKind === "battle" ? null :
          <div className="row">
            <div className="col">
              <p>
                Leader<input
                  type="checkbox"
                  value="Leader"
                  checked={!! this.state.characterTypes.find((t) => t === "Leader")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Dinobot<input
                  type="checkbox"
                  value="Dinobot"
                  checked={!! this.state.characterTypes.find((t) => t === "Dinobot")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Plane<input
                  type="checkbox"
                  value="Plane"
                  checked={!! this.state.characterTypes.find((t) => t === "Plane")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Combiner<input
                  type="checkbox"
                  checked={this.state.combiner}
                  onChange={this.handleChangeCombinerSelector}
                />
              </p>
              <p>
                Triple Changer<input
                  type="checkbox"
                  checked={this.state.tripleChanger}
                  onChange={this.handleChangeTripleChangerSelector}
                />
              </p>
            </div>
            <div className="col">
              <p>
                Insecticon<input
                  type="checkbox"
                  value="Insecticon"
                  checked={!! this.state.characterTypes.find((t) => t === "Insecticon")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Car<input
                  type="checkbox"
                  value="Car"
                  checked={!! this.state.characterTypes.find((t) => t === "Car")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Motorcycle<input
                  type="checkbox"
                  value="Motorcycle"
                  checked={!! this.state.characterTypes.find((t) => t === "Motorcycle")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Titan<input
                  type="checkbox"
                  value="Titan"
                  checked={!! this.state.characterTypes.find((t) => t === "Titan")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Guardian<input
                  type="checkbox"
                  value="Guardian"
                  checked={!! this.state.characterTypes.find((t) => t === "Guardian")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
            </div>
            <div className="col">
              <p>
                Truck<input
                  type="checkbox"
                  value="Truck"
                  checked={!! this.state.characterTypes.find((t) => t === "Truck")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Tank<input
                  type="checkbox"
                  value="Tank"
                  checked={!! this.state.characterTypes.find((t) => t === "Tank")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Spaceship<input
                  type="checkbox"
                  value="Spaceship"
                  checked={!! this.state.characterTypes.find((t) => t === "Spaceship")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Predacon<input
                  type="checkbox"
                  value="Predacon"
                  checked={!! this.state.characterTypes.find((t) => t === "Predacon")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Dreadwing<input
                  type="checkbox"
                  value="Dreadwing"
                  checked={!! this.state.characterTypes.find((t) => t === "Dreadwing")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
            </div>
            <div className="col">
              <p>
                Aerialbot<input
                  type="checkbox"
                  value="Aerialbot"
                  checked={!! this.state.characterTypes.find((t) => t === "Aerialbot")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Helicopter<input
                  type="checkbox"
                  value="Helicopter"
                  checked={!! this.state.characterTypes.find((t) => t === "Helicopter")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Constructicon<input
                  type="checkbox"
                  value="Constructicon"
                  checked={!! this.state.characterTypes.find((t) => t === "Constructicon")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Stunticon<input
                  type="checkbox"
                  value="Stunticon"
                  checked={!! this.state.characterTypes.find((t) => t === "Stunticon")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
            </div>
            <div className="col">
              <p>
                Melee<input
                  type="checkbox"
                  value="Melee"
                  checked={!! this.state.characterTypes.find((t) => t === "Melee")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Ranged<input
                  type="checkbox"
                  value="Ranged"
                  checked={!! this.state.characterTypes.find((t) => t === "Ranged")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Specialist<input
                  type="checkbox"
                  value="Specialist"
                  checked={!! this.state.characterTypes.find((t) => t === "Specialist")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
              <p>
                Sentinel<input
                  type="checkbox"
                  value="Sentinel"
                  checked={!! this.state.characterTypes.find((t) => t === "Sentinel")}
                  onChange={this.handleChangeCharacterType}
                />
              </p>
            </div>
          </div>
        }
        {
          this.props.cardKind === "character" ? null :
          <div className="row">
            <div className="col">
              <p>
                Either <input
                  type="radio"
                  value="null"
                  checked={this.state.type === null}
                  onChange={this.handleChangeTypeSelector}
                />
              </p>
              <p>
                Upgrade <input
                  type="radio"
                  value="Upgrade"
                  checked={this.state.type === "Upgrade"}
                  onChange={this.handleChangeTypeSelector}
                />
              </p>
              <p>
                Action <input
                  type="radio"
                  value="Action"
                  checked={this.state.type === "Action"}
                  onChange={this.handleChangeTypeSelector}
                />
              </p>
            </div>
          </div>
        }


        <div className="cards-container">
          {cardElements}
        </div>

      </div>
    )
	}
}

class CardSearchCollapsableCard extends Component {
  render(){
    let { card, deck } = this.props;
    let cardCount = this.props.count;
    let maxCardCount = card.kind === "character" ? 1 : 3;
    let controllers = _.range(0, maxCardCount+1).map((i) => {
      return <CardSearchCollapsableCardCountController
        key={`${card.name}-${card.collector_set}-${i}`}
        targetCount={i}
        currentCount={cardCount}
        card={card}
        deck={deck}
        />
    })
    return (
      <div className="row add-card-row">
        <div className="col">
          <CardWithImage card={card} />
        </div>
        <div className="col">
          {controllers}
        </div>
      </div>
    )
  }
}

class CardSearchCollapsableCardCountController extends Component {
  constructor(props) {
    super(props);
    this.makeCountChangeHandler = this.makeCountChangeHandler.bind(this);
  }

  makeCountChangeHandler(count, mutate) {
    let {deck, card} = this.props;
    return (e) => {
      e.preventDefault()
      mutate({
        variables: {
          id: deck.id,
          card_name: card.name,
          count,
        }
      });
    }
  }
  render() {
    let {targetCount, currentCount} = this.props;
    let selected = (targetCount === currentCount);
    let classNames = ["card-count-controller"]
    if (selected) {
      classNames.push("selected")
    }
    return (
      <Mutation mutation={TTCGMutations.SET_DECK_LIST_ENTRY_COUNT} update={TTCGUpdaters.updateCacheWithDeckListEntry}>
      {mutate => (
        <span className={classNames.join(" ")} onClick={this.makeCountChangeHandler(targetCount, mutate)}>
          {targetCount}
        </span>
      )}
      </Mutation>
    )
  }
}

export { CardSearchCollapsableCardCountController }
