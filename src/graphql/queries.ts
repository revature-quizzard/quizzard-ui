/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      match_state
      question_index
      capacity
      host
      set {
        id
        name
        creator
        card_list {
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
        answered_at
        answered_correctly
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
        match_state
        question_index
        capacity
        host
        set {
          id
          name
          creator
        }
        players {
          id
          username
          answered
          answered_at
          answered_correctly
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
        match_state
        question_index
        capacity
        host
        set {
          id
          name
          creator
        }
        players {
          id
          username
          answered
          answered_at
          answered_correctly
          points
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
