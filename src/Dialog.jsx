import React from 'react';
import './Dialog.css';

// eslint-disable-next-line react/prop-types
const Dialog = ({ isOpen, winner, onClose }) => {
    if (!isOpen) return null; // Render nothing if dialog is closed

    return (
        <div className='dialog-overlay'>
            <div className='dialog-content'>
                <h2>
                    {winner === 'draw'
                        ? 'It`s a Draw!'
                        : `${winner === 'playerX' ? 'Player X' : 'Player O'} Wins!`}
                </h2>
                <p>Congratulations! Reset the game to play again.</p>
                <button className='dialog-button' onClick={onClose}>
                    Restart Game
                </button>
            </div>
        </div>
    );
};

export default Dialog;
