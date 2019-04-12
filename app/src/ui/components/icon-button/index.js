import React, { Component } from 'react';
import Icon from '../icon/index.js';

export default class IconButton extends Component {
	render() {
		let {enabled, icon, handleToggle} = this.props
		let buttonColor = enabled ? "primary" : "danger"
		let classNames = `icon-button btn-spaced btn btn-${buttonColor}`
		return (
			<div className={classNames} onClick={handleToggle} >
				<Icon icon={icon} />
			</div>
		);
	}
}