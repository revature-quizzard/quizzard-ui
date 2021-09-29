import { useState, useEffect, useRef } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { createGame, deleteGame, updateGame } from '../../graphql/mutations';
import { onCreateGame, onDeleteGame, onUpdateGame } from '../../graphql/subscriptions';
import { getGame, listGames } from '../../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'redux';
import { Button } from 'react-bootstrap';
import { GraphQLTime } from 'graphql-iso-date';

Amplify.configure(config);

function Game() {

    // This method creates a game object and inserts it into DynamoDB
  const CreateGame = async () => {
    // console.log(testGameName, testGameDesc);
    // if (testGameName === '' || testGameDesc === '') return;

    try {
        const newPlayer = {
            id: '1',
            username: 'newuser',
            answered: false,
            answered_correctly: false,
            answered_at: new Date().toISOString(),
            points: 0
        }
        const game = {name: 'testGameName2', match_state: 0, players: [newPlayer]};
        console.log(game)
        await API.graphql(graphqlOperation(createGame, {input: game}));
        console.log('Game successfully created', game)
    } catch (err) {
      console.log('Error creating game ', err);
    }
  }

    return (
        <div className="App">
        <header className="App-header">
            Hello React!
            <br></br>
            <br></br>
            <br></br>
            <Button onClick={CreateGame} >Create New Game</Button>
        </header>
        </div>
  );
}

export default Game;