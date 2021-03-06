import React from 'react';

const Word = ({selectedWord, correctLetters}) => {
    return (
        <div className="word" id="word">
            {
                selectedWord.split('').map(
                    (letter, i) => (
                        <span key={i} className="letter">
                            {correctLetters.includes(letter) ? letter : ''}
                        </span>
                    )
                )
            }
       </div> 
    )
}

export default Word;