/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
