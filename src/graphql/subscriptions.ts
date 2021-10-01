/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateGameById = /* GraphQL */ `
  subscription OnUpdateGameById($id: ID!) {
    onUpdateGameById(id: $id) {
      id
      name
      matchState
      questionIndex
      capacity
      host
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      name
      matchState
      questionIndex
      capacity
      host
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      name
      matchState
      questionIndex
      capacity
      host
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      name
      matchState
      questionIndex
      capacity
      host
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
