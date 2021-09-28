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
      set {
        id
        name
        creator
        card_list {
          id
          question
          answer
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      players {
        id
        username
        answered
        answered_at
        answered_correctly
        points
        createdAt
        updatedAt
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
        set {
          id
          name
          creator
          createdAt
          updatedAt
        }
        players {
          id
          username
          answered
          answered_at
          answered_correctly
          points
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSet = /* GraphQL */ `
  query GetSet($id: ID!) {
    getSet(id: $id) {
      id
      name
      creator
      card_list {
        id
        question
        answer
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listSets = /* GraphQL */ `
  query ListSets(
    $filter: ModelSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        creator
        card_list {
          id
          question
          answer
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      username
      answered
      answered_at
      answered_correctly
      points
      createdAt
      updatedAt
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        answered
        answered_at
        answered_correctly
        points
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      question
      answer
      createdAt
      updatedAt
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        question
        answer
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
        set {
          id
          name
          creator
          createdAt
          updatedAt
        }
        players {
          id
          username
          answered
          answered_at
          answered_correctly
          points
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
