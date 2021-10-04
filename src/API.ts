/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  id?: string | null,
  name: string,
  matchState: number,
  questionIndex: number,
  capacity: number,
  host: string,
  questionTimer: number,
  set: SetInput,
  players: Array< PlayerInput | null >,
};

export type SetInput = {
  id: string,
  name: string,
  creator: string,
  cardList: Array< CardInput | null >,
};

export type CardInput = {
  id: string,
  question: string,
  correctAnswer: string,
  multiAnswers: Array< string | null >,
};

export type PlayerInput = {
  id: string,
  username: string,
  answered: boolean,
  answeredAt: string,
  answeredCorrectly: boolean,
  placing: number,
  streak: number,
  points: number,
};

export type ModelGameConditionInput = {
  name?: ModelStringInput | null,
  matchState?: ModelIntInput | null,
  questionIndex?: ModelIntInput | null,
  capacity?: ModelIntInput | null,
  host?: ModelStringInput | null,
  questionTimer?: ModelIntInput | null,
  and?: Array< ModelGameConditionInput | null > | null,
  or?: Array< ModelGameConditionInput | null > | null,
  not?: ModelGameConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Game = {
  __typename: "Game",
  id: string,
  name: string,
  matchState: number,
  questionIndex: number,
  capacity: number,
  host: string,
  questionTimer: number,
  set: Set,
  players:  Array<Player | null >,
  createdAt: string,
  updatedAt: string,
};

export type Set = {
  __typename: "Set",
  id: string,
  name: string,
  creator: string,
  cardList:  Array<Card | null >,
};

export type Card = {
  __typename: "Card",
  id: string,
  question: string,
  correctAnswer: string,
  multiAnswers: Array< string | null >,
};

export type Player = {
  __typename: "Player",
  id: string,
  username: string,
  answered: boolean,
  answeredAt: string,
  answeredCorrectly: boolean,
  placing: number,
  streak: number,
  points: number,
};

export type UpdateGameInput = {
  id: string,
  name?: string | null,
  matchState?: number | null,
  questionIndex?: number | null,
  capacity?: number | null,
  host?: string | null,
  questionTimer?: number | null,
  set?: SetInput | null,
  players?: Array< PlayerInput | null > | null,
};

export type DeleteGameInput = {
  id: string,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  matchState?: ModelIntInput | null,
  questionIndex?: ModelIntInput | null,
  capacity?: ModelIntInput | null,
  host?: ModelStringInput | null,
  questionTimer?: ModelIntInput | null,
  and?: Array< ModelGameFilterInput | null > | null,
  or?: Array< ModelGameFilterInput | null > | null,
  not?: ModelGameFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelGameConnection = {
  __typename: "ModelGameConnection",
  items?:  Array<Game | null > | null,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateGameMutationVariables = {
  input: CreateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameMutationVariables = {
  input: UpdateGameInput,
  condition?: ModelGameConditionInput | null,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameMutationVariables = {
  input: DeleteGameInput,
  condition?: ModelGameConditionInput | null,
};

export type DeleteGameMutation = {
  deleteGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGameConnection",
    items?:  Array< {
      __typename: "Game",
      id: string,
      name: string,
      matchState: number,
      questionIndex: number,
      capacity: number,
      host: string,
      questionTimer: number,
      set:  {
        __typename: "Set",
        id: string,
        name: string,
        creator: string,
      },
      players:  Array< {
        __typename: "Player",
        id: string,
        username: string,
        answered: boolean,
        answeredAt: string,
        answeredCorrectly: boolean,
        placing: number,
        streak: number,
        points: number,
      } | null >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GameByNameQueryVariables = {
  name?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GameByNameQuery = {
  gameByName?:  {
    __typename: "ModelGameConnection",
    items?:  Array< {
      __typename: "Game",
      id: string,
      name: string,
      matchState: number,
      questionIndex: number,
      capacity: number,
      host: string,
      questionTimer: number,
      set:  {
        __typename: "Set",
        id: string,
        name: string,
        creator: string,
      },
      players:  Array< {
        __typename: "Player",
        id: string,
        username: string,
        answered: boolean,
        answeredAt: string,
        answeredCorrectly: boolean,
        placing: number,
        streak: number,
        points: number,
      } | null >,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnUpdateGameByIdSubscriptionVariables = {
  id: string,
};

export type OnUpdateGameByIdSubscription = {
  onUpdateGameById?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameByIdSubscriptionVariables = {
  id: string,
};

export type OnDeleteGameByIdSubscription = {
  onDeleteGameById?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    questionTimer: number,
    set:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      cardList:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        correctAnswer: string,
        multiAnswers: Array< string | null >,
      } | null >,
    },
    players:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answeredAt: string,
      answeredCorrectly: boolean,
      placing: number,
      streak: number,
      points: number,
    } | null >,
    createdAt: string,
    updatedAt: string,
  } | null,
};
