import React, { Component } from 'react';

import DismissableAlert from '../dismissable-alert/index.js'

export default class FirstDeckCTA extends Component {
	render(){
		return (
			<DismissableAlert color="primary">
				We noticed you haven't made a deck yet. You can make a deck by clicking the button that says "Create New Deck".
			</DismissableAlert>
		);
	}
}
