import React, { Component } from 'react';
import Messages from '../../../api/flash-messages/index.js';

export default class FlashMessages extends Component {
  render() {
    let {messages} = this.props;
    console.log("messages", messages)
    let elements = messages.map((message, index) => {
      return <FlashMessage key={index} message={message} type="primary" />
    });
    return (
      <div className="flash-messages">
        {elements}
      </div>
    );
  }
}

class FlashMessage extends Component {

  componentDidMount() {
    Messages.markAsSeen(this.props.message._id);
    window.setTimeout(() => {
      Messages.clear(this.props.message._id);
    }, 5000)
  }

  render() {
  	let {type, content} = this.props.message;
    return (
      <div className={`alert alert-${type}`} role="alert">
        {content}
      </div>
    )
  }
}
