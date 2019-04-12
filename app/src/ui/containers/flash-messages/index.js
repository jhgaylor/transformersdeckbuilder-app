import React from 'react';
import FlashMessages from '../../components/flash-messages/index.js';
import Messages from '../../../api/flash-messages/index.js';

// TODO: add reactivity back to flash messages
export default function ComposeFlashMessages() {
  let ComposedComponent = FlashMessages;
  let messages = Messages.getUnseenMessages()
  return (
    <ComposedComponent messages={messages}/>
  )
}
