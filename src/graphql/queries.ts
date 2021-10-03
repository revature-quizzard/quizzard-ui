/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      matchState
      questionIndex
      capacity
      host
      questionTimer
      set {
        id
        name
        creator
        cardList {
          id
          question
          correctAnswer
          multiAnswers
        }
      }
      players {
        id
        username
        answered
        answeredAt
        answeredCorrectly
        points
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        matchState
        questionIndex
        capacity
        host
        questionTimer
        set {
          id
          name
          creator
        }
        players {
          id
          username
          answered
          answeredAt
          answeredCorrectly
          points
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const gameByName = /* GraphQL */ `
  query GameByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    gameByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        matchState
        questionIndex
        capacity
        host
        questionTimer
        set {
          id
          name
          creator
        }
        players {
          id
          username
          answered
          answeredAt
          answeredCorrectly
          points
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
