import React from 'react';
import { Query } from "react-apollo";
import WithCachedUser from '../WithCachedUser/index.js'

import DeckListPage from '../../components/deck-list-page/index.js';

import { TTCGQueries } from '../../../api/graphql.js';

function RenderWithApolloData(props) {
  return ({ loading, error, data, networkStatus }) => {
    // console.log("myDeckListPage", loading, error, data, networkStatus)
    if (error) return `Error!: ${error}`;
    const decks = data.decks || [];
    // console.log("myDeckListPage props", props)
    return (
      <WithCachedUser>
        <DeckListPage {...props} loading={loading} decks={decks} />
      </WithCachedUser>
    )
  }
}

export default function ComposeDeckListPage(props) {
  // TODO: stats.stars needs a backend field
  let query = TTCGQueries.GET_DECK_LIST_PAGE;
  let queryParameters = {
    show_public: true
  }
  return (
    <Query query={query} pollInterval={60*1000} variables={queryParameters}>
      {RenderWithApolloData(props)}
    </Query>
  )
}
