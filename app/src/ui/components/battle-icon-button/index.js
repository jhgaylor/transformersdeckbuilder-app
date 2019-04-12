import React, { Component } from 'react';

import BattleIcon from '../battle-icon/index.js';

export default class BattleIconButton extends Component {
	render() {
		let {enabled, color, text, handleToggle} = this.props
		let buttonColor = enabled ? "primary" : "danger"
		let classNames = `battle-icon-button btn btn-${buttonColor}`
		return (
			<div className={classNames} onClick={handleToggle} >
				<BattleIcon color={color} text={text} />
			</div>
		);
	}
}