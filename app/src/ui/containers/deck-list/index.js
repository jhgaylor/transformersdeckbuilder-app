import React from 'react';

import DeckList from '../../components/deck-list/index.js';

export default function ComposeDeckListPage({decks, user, filters, sort}) {
  if (filters.characterTypes.length > 0) {
    console.log('requires all of ', filters.characterTypes)
    decks = decks.filter((deck) => {
      let charactersInDeck = deck.cards.filter((card) => {
        return card.kind === "character"
      })
      return filters.characterTypes.filter((type) => {
        return charactersInDeck.find((card) => {
          let tags = card.type_tags.map((tag) => {
            return tag.toLowerCase();
          })
          return tags.includes(type);
        })
      }).length === filters.characterTypes.length
    })
  }

  if (sort.color) {
    decks = decks.sort((a, b) => {
      let a_count = a.stats.battleIcons.compositionPercentage[sort.color]
      let b_count = b.stats.battleIcons.compositionPercentage[sort.color]
      if (a_count < b_count) {
        return 1;
      }
      if (a_count > b_count) {
        return -1;
      }
      return 0;
    })
  }
  return (
    <DeckList user={user} decks={decks}/>
  )
}
