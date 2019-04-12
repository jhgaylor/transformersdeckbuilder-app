import React from 'react';
import Icon from './icon/index.js';
import { Badge } from 'reactstrap';

export function formatImageName(name) {
	let imageName = name.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '-').toLowerCase();
	return imageName
}

export function iconify(text) {
	text = text.toLowerCase().trim()
	return (
		<Icon key={text} icon={text}/>
	)
}

export function badgify(text) {
	text = text.trim()
	return (
		<Badge key={text}>{text}</Badge>
	)
}