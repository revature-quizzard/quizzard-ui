import { useState, useEffect, useRef } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { createGame, deleteGame, updateGame } from '../../graphql/mutations';
import { onCreateGame, onDeleteGame, onUpdateGame } from '../../graphql/subscriptions';
import { getGame, listGames } from '../../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'redux';

Amplify.configure(config);

function Game() {

    return (
        <div className="App">
        <header className="App-header">
            Hello React!
            <br></br>
            <br></br>
            <br></br>
        </header>
        </div>
  );
}

export default Game;