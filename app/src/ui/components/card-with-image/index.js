import React, { Component } from 'react';
import Icon from '../icon/index.js';
import {formatImageName} from '../helpers.js';
export default class CardWithImageHover extends Component {
	constructor(props) {
    super(props);
    this.handleToggleVisible = this.handleToggleVisible.bind(this);
    this.state = {
        visible: false
    };
  }

  handleToggleVisible() {
  	let current = this.state.visible;
    this.setState({visible: ! current});
  }

	render() {
		let {card} = this.props
		if (! card) {
			return null;
		}
		if (card.kind === "character") {
			return this.renderCharacter()
		}
		return this.renderBattleCard()
	}

	renderCharacter() {
		let {card} = this.props
		let name = card.name;
		let nameParts = name.split("//");
		let primaryName = nameParts.shift().trim()
		let secondaryName = nameParts.shift().trim()
		let cardClass = card.class.toLowerCase().trim()

		let imageName = formatImageName(name)
		let altImageUrl = `/images/${imageName}-alt.png`
		let botImageUrl = `/images/${imageName}-bot.png`
		let combinerImageUrl = `/images/${imageName}-combiner.png`
		let imageUrls = [altImageUrl, botImageUrl];
		if (card.combiner_mode_attack != null) {
			imageUrls = [combinerImageUrl]
		}
		// console.log("imageUrl", imageUrls)
		return (
			<div className="card-preview-label" key={card.id}>
				<span	onClick={this.handleToggleVisible}>
					{primaryName} <Icon icon={cardClass}/>
				</span><br/>
				<p className="text-nowrap" onClick={this.handleToggleVisible}>
					{secondaryName}
				</p>
        {this.state.visible ? <ImagePreview handleClose={this.handleToggleVisible} urls={imageUrls} /> : null}
			</div>
		);
	}

	renderBattleCard() {
		let {card} = this.props
		let name = card.name;
		let imageName = formatImageName(name)
		let imageUrls = [`/images/${imageName}.png`]
		// console.log("imageUrl", imageUrls)
		return (
			<div className="card-preview-label" key={card.id}>
				<span onClick={this.handleToggleVisible}>{name}</span>
        {this.state.visible ? <ImagePreview key={card.name} handleClose={this.handleToggleVisible} urls={imageUrls} /> : null}
			</div>
		);
	}
}

class ImagePreview extends Component {
	render() {
		let {urls, handleClose, key} = this.props;
		let imgs = urls.map((url) => {
			console.log("img url", url)
			return (
				<div key={url}>
					<img alt={key} key={url} src={url} />
				</div>
			);
		})
		return (
			<div className="card-image-tooltip" onClick={handleClose}>
				<div className="card-image-tooltip-contents">
					<div>{"\u00a0"}</div>
					{imgs}
					<div>{"\u00a0"}</div>
				</div>
			</div>
		)
	}
}