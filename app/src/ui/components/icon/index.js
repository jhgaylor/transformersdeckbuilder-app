import React, { Component } from 'react';

export default class Icon extends Component {
	render() {
		let iconClass = `icon-${this.props.icon}`
		return (
			<span className={iconClass} title={this.props.icon}></span>
		);
	}
}
