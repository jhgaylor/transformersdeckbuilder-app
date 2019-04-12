import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BattleIconButton from '../battle-icon-button/index.js';
import IconButton from '../icon-button/index.js';

export default class DeckDiscoveryController extends Component {
	constructor(props) {
    super(props);

    this.makeHandleCharacterTypeToggle = this.makeHandleCharacterTypeToggle.bind(this);
    this.makeHandleColorChange = this.makeHandleColorChange.bind(this);
    this.isSortColor = this.isSortColor.bind(this);
  }

  makeHandleCharacterTypeToggle(character) {
  	let {filters, onChangeFilters} = this.props;
  	character = character.toLowerCase()
  	return (e) => {

	  	let typeExistsInSet = !! filters.characterTypes.find((next) => {
	  		return next === character;
	  	})

	  	if (typeExistsInSet) {
	  		filters.characterTypes = filters.characterTypes.filter((next) => {
	  			return next !== character;
	  		})
	  	} else {
	  		filters.characterTypes.push(character);
	  	}
	  	onChangeFilters(filters)
  	}
  }

  makeHandleColorChange(color) {
  	let {sort, onChangeSort} = this.props;
  	color = color.toLowerCase()
  	return (e) => {
  		sort.color = color
	  	onChangeSort(sort)
  	}
  }

	isCharacterTypeEnabled(character) {
		let {filters} = this.props;
		let exists = !! filters.characterTypes.find((next) => {
			return next === character;
		})
		return exists
	}

	isSortColor(color) {
		let {sort} = this.props;
		return sort.color === color;
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('dinobot')} icon="dinobot" enabled={this.isCharacterTypeEnabled('dinobot')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('spaceship')} icon="spaceship" enabled={this.isCharacterTypeEnabled('spaceship')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('insecticon')} icon="insecticon" enabled={this.isCharacterTypeEnabled('insecticon')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('car')} icon="car" enabled={this.isCharacterTypeEnabled('car')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('tank')} icon="tank" enabled={this.isCharacterTypeEnabled('tank')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('truck')} icon="truck" enabled={this.isCharacterTypeEnabled('truck')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('motorcycle')} icon="motorcycle" enabled={this.isCharacterTypeEnabled('motorcycle')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('plane')} icon="plane" enabled={this.isCharacterTypeEnabled('plane')}/>
					<IconButton handleToggle={this.makeHandleCharacterTypeToggle('titan')} icon="titan" enabled={this.isCharacterTypeEnabled('titan')}/>
					<div className="btn-group" role="group" aria-label="Basic example">
					  <BattleIconButton handleToggle={this.makeHandleColorChange('orange')} enabled={this.isSortColor('orange')} color="orange" text="" />
						<BattleIconButton handleToggle={this.makeHandleColorChange('blue')} enabled={this.isSortColor('blue')} color="blue" text="" />
						<BattleIconButton handleToggle={this.makeHandleColorChange('white')} enabled={this.isSortColor('white')} color="white" text="" />
						<BattleIconButton handleToggle={this.makeHandleColorChange('green')} enabled={this.isSortColor('green')} color="green" text="" />
						<BattleIconButton handleToggle={this.makeHandleColorChange('none')} enabled={this.isSortColor('none')} color="none" text="" />
					</div>
				</div>
			</div>
		)
	}
}

DeckDiscoveryController.propTyes = {
	decks: PropTypes.array.isRequired,
}
