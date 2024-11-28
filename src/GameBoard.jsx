import { useState } from 'react';
import Dialog from './Dialog'
import './GameBoard.css'

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
  ];

const GameBoard = () => {
    const [cells, setCells] = useState(Array(9).fill(null)); // Checking purposes
    const [currentPlayer, setCurrentPlayer] = useState('playerX');
    const [winner, setWinner] = useState(null)
    const [isGameOver, setIsGameOver] = useState(false);
    
    const togglePlayer = () => {
        setCurrentPlayer((previousPlayer) => previousPlayer === 'playerX' ? 'playerO' : 'playerX');
    };
    const checkWinner = (updatedCells) => {
        return winningCombinations.some((combination) => 
            combination.every(index => updatedCells[index] === (currentPlayer))
        );
    };

    const handleCellClick = (index) => {
        if (cells[index] || isGameOver) return; // Clicked already! Do nothing.

        const updatedCells = [...cells];
        updatedCells[index] = currentPlayer;
        setCells(updatedCells);
        

        if (checkWinner(updatedCells)) {
            console.log('hello')
            setWinner(currentPlayer);
            setIsGameOver(true);
        } else if (!updatedCells.includes(null)) {
            setWinner('draw');
            setIsGameOver(true);
        } else {
            togglePlayer();
        }
    };

    
    const restartGame = () => {
        setCells(Array(9).fill(null)); // Reset all cells
        setCurrentPlayer("playerX"); // Reset to playerX
        setWinner(null); // Clear the winner
        setIsGameOver(false);
    };

    return (
        <>
            <Dialog isOpen={isGameOver} winner={winner} onClose={restartGame} />
            <div className={`game-board ${currentPlayer === 'playerX' ? 'player__active--playerX' : 'player__active--playerO'}`}>
                {cells.map((cell, index) => (
                <div
                    key={index}
                    className={`game-board__cell ${
                        cell === "playerX" ? "game-board__cell--playerX" : ""
                    } ${
                        cell === "playerO" ? "game-board__cell--playerO" : ""
                    }`}
                    onClick={() => handleCellClick(index)}
                ></div>
                ))}
            </div>
      </>
    )
}

export default GameBoard
