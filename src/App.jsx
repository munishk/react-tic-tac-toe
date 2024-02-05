import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

import { useState } from "react"

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const PLAYERS = {
    'X' : 'Player 1',
    'O' : 'Player 2'
};

/**
 * Method to derive active player from game turns.
 * @param {*} gameTurns 
 * @returns 
 */
function deriveActivePlayer(gameTurns) {
    let activePlayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X') {
        activePlayer = 'O';
    }
    return activePlayer;
}

/**
 * Method to derive winner from gameboard state.
 * @param {} gameBoard 
 * @param {*} players 
 * @returns 
 */
function deriveWinner(gameBoard, players) {
    let winner = null;
    WINNING_COMBINATIONS.map(winningCombination => {
        const firstSymbol = gameBoard[winningCombination[0].row][winningCombination[0].col];
        const secondSymbol = gameBoard[winningCombination[1].row][winningCombination[1].col];
        const thirdSymbol = gameBoard[winningCombination[2].row][winningCombination[2].col];
        if(firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol) {
           winner = players[firstSymbol];
        }
    })
    return winner;
}

/**
 * Method to derive game board state from game turns.
 * @param {*} gameTurns 
 * @returns 
 */
function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];
    for(const gameTurn of gameTurns) {
        const {square, playerSymbol} = gameTurn;
        const {row, col} = square;
        gameBoard[row][col] = playerSymbol
    }
    return gameBoard;
}



function App() {
    const [players, setPlayers] = useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);

    //Derive current player from game turns.
    const currentPlayerSymbol = deriveActivePlayer(gameTurns);

    //Update game board
    const gameBoard = deriveGameBoard(gameTurns);
   

    //Check if there is winner
   const winner = deriveWinner(gameBoard, players);

    //Check if there is draw
    const hasDraw = gameTurns.length === 9 && !winner;


   function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
        return {
            ...prevPlayers,
            [symbol] : newName
        }
    })
   }


    function handleSelectSquare(rowIndex, colIndex) {
        setGameTurns((prevGameTurns) => {
            let currentPlayer = deriveActivePlayer(prevGameTurns);
            const updatedGameTurns = [{ square: { row: rowIndex, col: colIndex }, playerSymbol: currentPlayer }, ...prevGameTurns];
            return updatedGameTurns;
        })

    }

    function handleRestart() {
        setGameTurns([]);
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player initialName={players.X} symbol="X" isActive={currentPlayerSymbol === 'X'} onPlayerNameChange={handlePlayerNameChange}/>
                    <Player initialName={players.Y} symbol="O" isActive={currentPlayerSymbol === 'O'} onPlayerNameChange={handlePlayerNameChange}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}
                <GameBoard gameBoard= {gameBoard} onSelectSquare={handleSelectSquare} />
            </div>
            <Log gameTurns={gameTurns} />
        </main>

    )
}

export default App
