const Messages = {
  // Local (client-only) collection
  collection: [],

  getUnseenMessages() {
    return this.collection;
  },

  flash(content, type) {
    type = (typeof type === 'undefined') ? 'error': type;
    // Store errors in the local collection
    return []
  },

  markAsSeen(messageId) {
    console.log("mark as seen", messageId);
    return;
  },

  clear(messageId) {
    return;
  },

  clearSeen() {
    return;
  }
};
export default Messages;
