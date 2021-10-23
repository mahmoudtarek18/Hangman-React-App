import './App.css';
import Figure from './components/Figure';
import Header from './components/Header';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import {showNotification as show} from './helpers/helpers';
import { useEffect, useState } from 'react';
import Popup from './components/Popup';
import Notification from './components/Notification';


const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

 
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters =>
              [...currentLetters, letter]);
          } else {
             show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters =>
              [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeydown);
    
    return () => window.removeEventListener('keydown',handleKeydown )
  }, [correctLetters, wrongLetters, playable]);



  const playAgain = () => {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    selectedWord = words[Math.floor(Math.random() * words.length)];
  }
  
  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
