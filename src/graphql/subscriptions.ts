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
export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateSet = /* GraphQL */ `
  subscription OnCreateSet {
    onCreateSet {
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
export const onUpdateSet = /* GraphQL */ `
  subscription OnUpdateSet {
    onUpdateSet {
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
export const onDeleteSet = /* GraphQL */ `
  subscription OnDeleteSet {
    onDeleteSet {
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
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
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
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
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
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
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
export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
      id
      question
      answer
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard {
    onUpdateCard {
      id
      question
      answer
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard {
    onDeleteCard {
      id
      question
      answer
      createdAt
      updatedAt
    }
  }
`;
