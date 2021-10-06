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
        placing
        streak
        points
        pointsEarned
        afk
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
        placing
        streak
        points
        pointsEarned
        afk
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
        placing
        streak
        points
        pointsEarned
        afk
      }
      createdAt
      updatedAt
    }
  }
`;
