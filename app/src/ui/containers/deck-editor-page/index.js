import React from 'react';
import { Query } from "react-apollo";
import WithCachedUser from '../WithCachedUser/index.js'

import DeckEditor from '../../components/deck-editor-page/index.js';

import { TTCGQueries } from '../../../api/graphql.js';

function RenderWithApolloData(props) {
  return ({ loading, error, data }) => {
    // console.log("deck editor page", loading, error, data)
    if (error) return `Error!: ${error}`;

    const {deck, cards} = data;
    return (
      <WithCachedUser>
        <DeckEditor {...props} loading={loading} allCards={cards} deck={deck} inventoryItems={[]}  />
      </WithCachedUser>
    )
  }
}

export default function ComposeDeckListPage(props) {
  let { match } = props;
  let deckId = match.params.id;
  let query = TTCGQueries.GET_DECK;
  let queryParameters = {
    id: deckId
  }
  return (
    <Query query={query} pollInterval={60*1000} variables={queryParameters}>
      {RenderWithApolloData(props)}
    </Query>
  )
}
