/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateGameInput = {
  id?: string | null,
  name: string,
  match_state?: number | null,
  question_index?: number | null,
  capacity?: number | null,
};

export type ModelGameConditionInput = {
  name?: ModelStringInput | null,
  match_state?: ModelIntInput | null,
  question_index?: ModelIntInput | null,
  capacity?: ModelIntInput | null,
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
  match_state?: number | null,
  question_index?: number | null,
  capacity?: number | null,
  set?: Set | null,
  players?:  Array<Player | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type Set = {
  __typename: "Set",
  id: string,
  name: string,
  creator: string,
  card_list?:  Array<Card | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type Card = {
  __typename: "Card",
  id: string,
  question: string,
  answer?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Player = {
  __typename: "Player",
  id: string,
  username: string,
  answered: boolean,
  answered_at: string,
  answered_correctly: boolean,
  points?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateGameInput = {
  id: string,
  name?: string | null,
  match_state?: number | null,
  question_index?: number | null,
  capacity?: number | null,
};

export type DeleteGameInput = {
  id: string,
};

export type CreateSetInput = {
  id?: string | null,
  name: string,
  creator: string,
};

export type ModelSetConditionInput = {
  name?: ModelStringInput | null,
  creator?: ModelStringInput | null,
  and?: Array< ModelSetConditionInput | null > | null,
  or?: Array< ModelSetConditionInput | null > | null,
  not?: ModelSetConditionInput | null,
};

export type UpdateSetInput = {
  id: string,
  name?: string | null,
  creator?: string | null,
};

export type DeleteSetInput = {
  id: string,
};

export type CreatePlayerInput = {
  id?: string | null,
  username: string,
  answered: boolean,
  answered_at: string,
  answered_correctly: boolean,
  points?: number | null,
};

export type ModelPlayerConditionInput = {
  username?: ModelStringInput | null,
  answered?: ModelBooleanInput | null,
  answered_at?: ModelStringInput | null,
  answered_correctly?: ModelBooleanInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelPlayerConditionInput | null > | null,
  or?: Array< ModelPlayerConditionInput | null > | null,
  not?: ModelPlayerConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdatePlayerInput = {
  id: string,
  username?: string | null,
  answered?: boolean | null,
  answered_at?: string | null,
  answered_correctly?: boolean | null,
  points?: number | null,
};

export type DeletePlayerInput = {
  id: string,
};

export type CreateCardInput = {
  id?: string | null,
  question: string,
  answer?: string | null,
};

export type ModelCardConditionInput = {
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
};

export type UpdateCardInput = {
  id: string,
  question?: string | null,
  answer?: string | null,
};

export type DeleteCardInput = {
  id: string,
};

export type ModelGameFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  match_state?: ModelIntInput | null,
  question_index?: ModelIntInput | null,
  capacity?: ModelIntInput | null,
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

export type ModelSetFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  creator?: ModelStringInput | null,
  and?: Array< ModelSetFilterInput | null > | null,
  or?: Array< ModelSetFilterInput | null > | null,
  not?: ModelSetFilterInput | null,
};

export type ModelSetConnection = {
  __typename: "ModelSetConnection",
  items?:  Array<Set | null > | null,
  nextToken?: string | null,
};

export type ModelPlayerFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  answered?: ModelBooleanInput | null,
  answered_at?: ModelStringInput | null,
  answered_correctly?: ModelBooleanInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelPlayerFilterInput | null > | null,
  or?: Array< ModelPlayerFilterInput | null > | null,
  not?: ModelPlayerFilterInput | null,
};

export type ModelPlayerConnection = {
  __typename: "ModelPlayerConnection",
  items?:  Array<Player | null > | null,
  nextToken?: string | null,
};

export type ModelCardFilterInput = {
  id?: ModelIDInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type ModelCardConnection = {
  __typename: "ModelCardConnection",
  items?:  Array<Card | null > | null,
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
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSetMutationVariables = {
  input: CreateSetInput,
  condition?: ModelSetConditionInput | null,
};

export type CreateSetMutation = {
  createSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSetMutationVariables = {
  input: UpdateSetInput,
  condition?: ModelSetConditionInput | null,
};

export type UpdateSetMutation = {
  updateSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSetMutationVariables = {
  input: DeleteSetInput,
  condition?: ModelSetConditionInput | null,
};

export type DeleteSetMutation = {
  deleteSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePlayerMutationVariables = {
  input: CreatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type CreatePlayerMutation = {
  createPlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePlayerMutationVariables = {
  input: UpdatePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type UpdatePlayerMutation = {
  updatePlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePlayerMutationVariables = {
  input: DeletePlayerInput,
  condition?: ModelPlayerConditionInput | null,
};

export type DeletePlayerMutation = {
  deletePlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
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
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
      match_state?: number | null,
      question_index?: number | null,
      capacity?: number | null,
      set?:  {
        __typename: "Set",
        id: string,
        name: string,
        creator: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      players?:  Array< {
        __typename: "Player",
        id: string,
        username: string,
        answered: boolean,
        answered_at: string,
        answered_correctly: boolean,
        points?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSetQueryVariables = {
  id: string,
};

export type GetSetQuery = {
  getSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSetsQueryVariables = {
  filter?: ModelSetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSetsQuery = {
  listSets?:  {
    __typename: "ModelSetConnection",
    items?:  Array< {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetPlayerQueryVariables = {
  id: string,
};

export type GetPlayerQuery = {
  getPlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPlayersQueryVariables = {
  filter?: ModelPlayerFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlayersQuery = {
  listPlayers?:  {
    __typename: "ModelPlayerConnection",
    items?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCardQueryVariables = {
  id: string,
};

export type GetCardQuery = {
  getCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCardsQueryVariables = {
  filter?: ModelCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCardsQuery = {
  listCards?:  {
    __typename: "ModelCardConnection",
    items?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
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
      match_state?: number | null,
      question_index?: number | null,
      capacity?: number | null,
      set?:  {
        __typename: "Set",
        id: string,
        name: string,
        creator: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      players?:  Array< {
        __typename: "Player",
        id: string,
        username: string,
        answered: boolean,
        answered_at: string,
        answered_correctly: boolean,
        points?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
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
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    id: string,
    name: string,
    match_state?: number | null,
    question_index?: number | null,
    capacity?: number | null,
    set?:  {
      __typename: "Set",
      id: string,
      name: string,
      creator: string,
      card_list?:  Array< {
        __typename: "Card",
        id: string,
        question: string,
        answer?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    players?:  Array< {
      __typename: "Player",
      id: string,
      username: string,
      answered: boolean,
      answered_at: string,
      answered_correctly: boolean,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSetSubscription = {
  onCreateSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSetSubscription = {
  onUpdateSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSetSubscription = {
  onDeleteSet?:  {
    __typename: "Set",
    id: string,
    name: string,
    creator: string,
    card_list?:  Array< {
      __typename: "Card",
      id: string,
      question: string,
      answer?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlayerSubscription = {
  onCreatePlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlayerSubscription = {
  onUpdatePlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePlayerSubscription = {
  onDeletePlayer?:  {
    __typename: "Player",
    id: string,
    username: string,
    answered: boolean,
    answered_at: string,
    answered_correctly: boolean,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCardSubscription = {
  onCreateCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCardSubscription = {
  onUpdateCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCardSubscription = {
  onDeleteCard?:  {
    __typename: "Card",
    id: string,
    question: string,
    answer?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
