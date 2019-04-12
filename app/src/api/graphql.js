import React from 'react';
import gql from "graphql-tag";
import { _ } from 'underscore';

export const UserContext = React.createContext({user: null, userLoading: false, userError: null});

export function UserProvider({user, userLoading, userError, children}) {
  const userCtx = {
    user,
    userLoading,
    userError
  }
  return (
    <UserContext.Provider value={userCtx}>
      {children}
    </UserContext.Provider>
  )
}


export const TTCGUpdaters = {
  logout: (cache) => {
    cache.writeQuery({
      query: TTCGQueries.WHOAMI,
      data: {whoAmI: null},
    })
  },
  updateCacheWithDeckListEntry: (cache, { data: { setCountOfCardInDeck }}) => {
    let deckId = setCountOfCardInDeck.id;
    let cardName = setCountOfCardInDeck.card_name;
    let count = setCountOfCardInDeck.count;

    let cachedData = cache.readQuery({
      query: TTCGQueries.GET_DECK,
      variables: { id: deckId },
    });

    let deck = cachedData.deck
    let cards = cachedData.cards

    let card = cards.find((card) => (card.name === cardName))

    let deckCards = deck.cards.filter((card) => {
      return card.name !== cardName
    })

    _.times(count, (n) => {
      deckCards.push(card)
    })

    deck.cards = deckCards

    deck.stats.breakdowns.battle = deckCards.filter((card) => {
      return card.kind === "battle"
    }).length

    cache.writeQuery({
      query: TTCGQueries.GET_DECK,
      variables: { id: deckId },
      data: { deck, cards },
    });
  },
  // TODO: this could be better... especially since i copy it other places
  updateCacheWithAddedDeck: (cache, { data: { addDeck } }) => {
    let deck = addDeck;
    try {
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false }
      });
      cachedData.decks.push(deck)
      let decks = cachedData.decks
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false },
        data: { decks },
      });
    } catch (err) {
      
    }

    try {
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true }
      });
      cachedData.decks.push(deck)
      let decks = cachedData.decks
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true },
        data: { decks },
      });
    } catch (err) {
      
    }
  },
  // TODO: this could be better... especially since i copy it other places
  updateCacheWithCopiedDeck: (cache, { data: { copyDeck } }) => {
    let deck = copyDeck;
    try {
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false }
      });
      cachedData.decks.push(deck)
      let decks = cachedData.decks
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false },
        data: { decks },
      });
    } catch (err) {
      
    }

    try {
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true }
      });
      cachedData.decks.push(deck)
      let decks = cachedData.decks
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true },
        data: { decks },
      });
    } catch (err) {
      
    }
  },
  // TODO: this could be better... especially since i copy it other places
  updateCacheWithRemovedDeck: (cache, { data: { deleteDeck }}) => {
    try {
      let deckId = deleteDeck.id;
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true },
      });
      let decks = cachedData.decks.filter((deck) => {
        return deck.id !== deckId
      })
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: true },
        data: { decks },
      });
    } catch (err) {
      
    }
    try {
      let deckId = deleteDeck.id;
      let cachedData = cache.readQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false },
      });
      let decks = cachedData.decks.filter((deck) => {
        return deck.id !== deckId
      })
      cache.writeQuery({
        query: TTCGQueries.GET_DECK_LIST_PAGE,
        variables: { show_public: false },
        data: { decks },
      });
    } catch (err) {
      
    }
  },
  updateCacheWithLoginUser: (cache, { data: { login }}) => {
    cache.writeQuery({
      query: TTCGQueries.WHOAMI,
      data: {whoAmI: login},
    })
  },
  updateCacheWithRegisterUser: (cache, { data: { register }}) => {
    cache.writeQuery({
      query: TTCGQueries.WHOAMI,
      data: {whoAmI: register},
    })
  },
}

export const TTCGMutations = {
  ADD_DECK: gql`
    mutation addDeck($name: String!, $is_public: Boolean!) {
      addDeck(input: {name: $name, is_public: $is_public}) {
        id
        name
        owner_id
        created_at
        is_public
        highlight_tag
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
          type
          subtype
          health
          alt_mode_attack
          alt_mode_armor
          bot_mode_attack
          bot_mode_armor
          alt2_mode_attack
          alt2_mode_armor
          alt2_mode_text
          combiner_mode_attack
          combiner_mode_armor
          combiner_mode_text
          alt_mode_text
          bot_mode_text
          text
          stealth
          brave
          plan
          orange_battle_icons
          blue_battle_icons
          white_battle_icons
          green_battle_icons
        }
        stats {
          size
          # stars
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              none
            }
            total {
              blue
              white
              orange
              none
            }
            perBattle {
              blue
              white
              orange
              none
            }
            compositionPercentage {
              blue
              white
              orange
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
    }
  `,
  COPY_DECK: gql`
    mutation copyDeck($id: String!) {
      copyDeck(id: $id) {
        id
        name
        owner_id
        created_at
        is_public
        highlight_tag
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
          type
          subtype
          health
          alt_mode_attack
          alt_mode_armor
          bot_mode_attack
          bot_mode_armor
          alt2_mode_attack
          alt2_mode_armor
          alt2_mode_text
          combiner_mode_attack
          combiner_mode_armor
          combiner_mode_text
          alt_mode_text
          bot_mode_text
          text
          orange_battle_icons
          blue_battle_icons
          white_battle_icons
          green_battle_icons
        }
        stats {
          size
          # stars
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              none
            }
            total {
              blue
              white
              orange
              none
            }
            perBattle {
              blue
              white
              orange
              none
            }
            compositionPercentage {
              blue
              white
              orange
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
    }
  `,
  LOGIN: gql`
    mutation login($email: String!, $password: String!) {
      login(input: {email: $email, password: $password})  {
        id
        email
        created_at
      }
    }
  `,
  LOGOUT: gql`
    mutation logout {
      logout
    }
  `,
  REGISTER: gql`
    mutation register($email: String!, $password: String!) {
      register(input: {email: $email, password: $password})  {
        id
        email
        created_at
      }
    }
  `,
  REMOVE_DECK: gql`
    mutation deleteDeck($id: String!) {
      deleteDeck(id: $id) {
        id
      }
    }
  `,
  EDIT_DECK_PUBLICITY: gql`
    mutation editDeck($id: String!, $is_public: Boolean!) {
      editDeck(id: $id, input: {is_public: $is_public}) {
        id
        is_public
      }
    }
  `,
  EDIT_DECK_NAME: gql`
    mutation editDeck($id: String!, $name: String!) {
      editDeck(id: $id, input: {name: $name}) {
        id
        name
      }
    }
  `,
  EDIT_DECK_DESCRIPTION: gql`
    mutation editDeck($id: String!, $description: String!) {
      editDeck(id: $id, input: {description: $description}) {
        id
        description
      }
    }
  `,
  SET_DECK_LIST_ENTRY_COUNT: gql`
    mutation setCountOfCardInDeck($id: String!, $card_name: String! $count: Int!) {
      setCountOfCardInDeck(id: $id, card_name: $card_name, count: $count) {
        id
        card_name
        count
      }
    }
  `,
}

export const TTCGQueries = {
  WHOAMI: gql`
    {
      whoAmI {
        id
        email
        created_at
      }
    }
  `,
  GET_HOMEPAGE_DATA: gql`
    query GET_HOMEPAGE_DATA($tags: [String!]!, $limit: Int!) {
      recentDecks(filter:{limit: $limit}) {
        id
        description
        name
        owner_id
        created_at
        is_public
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
          type
          subtype
          health
          alt_mode_attack
          alt_mode_armor
          bot_mode_attack
          bot_mode_armor
          alt2_mode_attack
          alt2_mode_armor
          alt2_mode_text
          alt2_mode_text
          combiner_mode_attack
          combiner_mode_armor
          combiner_mode_text
          alt_mode_text
          bot_mode_text
          text
          orange_battle_icons
          blue_battle_icons
          white_battle_icons
          green_battle_icons
        }
        stats {
          size
          # stars
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              none
            }
            total {
              blue
              white
              orange
              none
            }
            perBattle {
              blue
              white
              orange
              none
            }
            compositionPercentage {
              blue
              white
              orange
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
      highlightedDecks(filter: {highlight_tags: $tags}) {
        id
        description
        name
        owner_id
        created_at
        is_public
        highlight_tag
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
          type
          subtype
          health
          alt_mode_attack
          alt_mode_armor
          bot_mode_attack
          bot_mode_armor
          alt2_mode_attack
          alt2_mode_armor
          alt2_mode_text
          combiner_mode_attack
          combiner_mode_armor
          combiner_mode_text
          alt_mode_text
          bot_mode_text
          text
          orange_battle_icons
          blue_battle_icons
          white_battle_icons
          green_battle_icons
        }
        stats {
          size
          # stars
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              none
            }
            total {
              blue
              white
              orange
              none
            }
            perBattle {
              blue
              white
              orange
              none
            }
            compositionPercentage {
              blue
              white
              orange
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
    }
  `,
  GET_DECK_STATS: gql`
    query GET_DECK($id: String!) {
      deck(id: $id) {
        id
        stats {
          size
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              green
              none
            }
            total {
              blue
              white
              orange
              green
              none
            }
            perBattle {
              blue
              white
              orange
              green
              none
            }
            compositionPercentage {
              blue
              white
              orange
              green
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
    }
  `,
  GET_DECK: gql`
    query GET_DECK($id: String!) {
      cards {
        id
        collector_set
        collector_number
        name
        kind
        class
        stars
        type_tags
        type
        subtype
        health
        tough
        pierce
        bold
        stealth
        brave
        plan
        alt_mode_attack
        alt_mode_armor
        bot_mode_attack
        bot_mode_armor
        alt2_mode_attack
        alt2_mode_armor
        alt2_mode_text
        combiner_mode_attack
        combiner_mode_armor
        combiner_mode_text
        alt_mode_text
        bot_mode_text
        text
        orange_battle_icons
        blue_battle_icons
        white_battle_icons
        green_battle_icons
      }

      deck(id: $id) {
        id
        description
        name
        owner_id
        created_at
        is_public
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
          type
          subtype
          health
          alt_mode_attack
          alt_mode_armor
          bot_mode_attack
          bot_mode_armor
          alt2_mode_attack
          alt2_mode_armor
          alt2_mode_text
          combiner_mode_attack
          combiner_mode_armor
          combiner_mode_text
          alt_mode_text
          bot_mode_text
          stealth
          brave
          plan
          text
          orange_battle_icons
          blue_battle_icons
          white_battle_icons
          green_battle_icons
        }
        stats {
          size
          breakdowns {
            battle
          }
        }
      }
    }
  `,
  GET_DECK_LIST_PAGE: gql`
    query GET_DECK_LIST_PAGE($show_public: Boolean!) {
      decks(filter:{show_public: $show_public}) {
        id
        description
        name
        owner_id
        created_at
        is_public
        cards {
          id
          collector_set
          collector_number
          name
          kind
          class
          stars
          type_tags
        }
        stats {
          size
          # stars
          breakdowns {
            character 
            battle
            bold
            tough
            action
            upgrade
            armor
            weapon
            utility
          }
          battleIcons {
            average {
              blue
              white
              orange
              green
              none
            }
            total {
              blue
              white
              orange
              green
              none
            }
            perBattle {
              blue
              white
              orange
              green
              none
            }
            compositionPercentage {
              blue
              white
              orange
              green
              none
            }
          }
          rarities {
            sr
            r
            c
            u
          }
        }
      }
    }
  `
}