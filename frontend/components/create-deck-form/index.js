// @flow
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import CreateDeckFormComponent from './create-deck-form-component'
import { USER_DECKS } from '../dashboard'
import { GET_DECK } from '../../pages/deck'

const CREATE_DECK = gql`
  mutation CreateDeck ($name: String!, $authorId: ID!) {
    createDeck(name: $name, authorId: $authorId) {
      id,
      name,
      author {
        id,
        name
      }
    }
  }
`

export default compose(
  graphql(CREATE_DECK, {
    name: 'CreateDeckMutation',
    options: ({ user }) => ({
      update: (store, { data: { createDeck } }) => {
        const deck = {
          ...createDeck,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }

        const userDecksData = store.readQuery({
          query: USER_DECKS,
          variables: {
            userId: user.id
          }
        })

        userDecksData.allDecks.push(deck)
        userDecksData.allDecks.sort((a, b) => a.name.localeCompare(b.name))

        store.writeQuery({
          query: USER_DECKS,
          variables: {
            userId: user.id
          },
          data: userDecksData
        })

        store.writeQuery({
          query: GET_DECK,
          variables: {
            name: createDeck.name
          },
          data: {
            Deck: {
              ...createDeck,
              createdAt: Date.now(),
              updatedAt: Date.now()
            }
          }
        })
      }
    })
  })
)(CreateDeckFormComponent)
