import React from 'react';
import HomePage from '../../components/home-page/index.js';
import { Query } from "react-apollo";
import WithCachedUser from '../WithCachedUser/index.js';

import { TTCGQueries } from '../../../api/graphql.js';

function RenderWithApolloData(props) {
  return ({ loading, error, data, networkStatus }) => {
    // console.log("myDeckListPage", loading, error, data, networkStatus)
    if (error) return `Error!: ${error}`;
    const recentDecks = data.recentDecks || [];
    const highlightedDecks = data.highlightedDecks || [];

    const beginnerSection = {
      deck: highlightedDecks.find((deck) => (deck.highlight_tag === "beginner")) 
    }

    const editorsPicks = {
      one: highlightedDecks.find((deck) => (deck.highlight_tag === "editor1")),
      two: highlightedDecks.find((deck) => (deck.highlight_tag === "editor2")) 
    }

    // console.log("home page props", beginnerSection, editorsPicks)
    return (
      <WithCachedUser>
        <HomePage {...props} loading={loading} beginnerSection={beginnerSection} editorsPicks={editorsPicks} recentDecks={recentDecks} />
      </WithCachedUser>
    )
  }
}

export default function ComposeHomePage(props) {
  let query = TTCGQueries.GET_HOMEPAGE_DATA;
  let queryParameters = {
    tags: ["beginner", "editor1", "editor2"],
    limit: 5,
  }
  return (
    <Query query={query} pollInterval={60*1000} variables={queryParameters}>
      {RenderWithApolloData(props)}
    </Query>
  )
}
