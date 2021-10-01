/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateGameById = /* GraphQL */ `
  subscription OnUpdateGameById($id: ID!) {
    onUpdateGameById(id: $id) {
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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
