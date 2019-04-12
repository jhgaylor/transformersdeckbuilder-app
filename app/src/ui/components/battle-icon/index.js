import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class BattleIcon extends Component {
	render() {
		let {color, text} = this.props;
		// our pip won't have a width if it has no content so we add a non breaking space.
		// We use the unicode character so react doesn't escape the html sequence
		// https://stackoverflow.com/questions/24432576/reactjs-render-string-with-non-breaking-spaces
		if (! text) {
			text = "\u00a0"
		}
		let classNames = `battle-icon ${color}`
		return (
			<span className={classNames} title={color}>{text}</span>
		);
	}
}

BattleIcon.propTyes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string,
};
