import classes from './App.module.css';
import Word from './components/Word/Word';
import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import { MainContext } from './context';

function App() {
  const wordAmount = 6;
  const [turn, setTurn] = useState(0);
  const [getWord, setGetWord] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') !== null ? localStorage.getItem('language') : "tr")
  const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : "light");

  const fetchWord = () => {
    fetch("https://3.68.135.14/api/word/" + language + "/5/1")
      .then(response => response.json())
      .then(data =>
        setGetWord(data.words[0].split("")))
  }

  useEffect(() => {
    //fetchWord()
    playAgain()
  }, [language])

  const data = {
    language,
    setLanguage,
    theme,
    setTheme
  }

  //reset state and fetch new word
  const playAgain = () => {
    setGetWord(fetchWord)
    setGameOver(false)
    setTurn(0)
  }

  return (
    <MainContext.Provider value={data} >
      <div className={`${classes.light} ${theme === "dark" && classes.dark}`}>
        <Header />
        <div >
          {
            Array.from(Array(wordAmount).keys()).map((temp, index) => {
              return <Word word1={getWord} key={index} turn={turn} order={index} setTurn={setTurn} gameOver={gameOver} setGameOver={setGameOver} />
            })
          }
          <div className={classes.congrats}>

            {gameOver &&
              <>
                <div className={classes.textSuccess}>
                  Tebrikler<br />
                  Kelimeyi buldunuz
                </div>
                <button className={classes.playAgainSuccess} onClick={playAgain}>Tekrar Oyna </button>
              </>
            }
            {
              (turn === wordAmount && gameOver === false)
              &&
              <>
                <div className={classes.textFail}>
                  Kelimeyi bulamadınız<br />
                  Kelime: {getWord}
                </div>
                <button className={classes.playAgainFail} onClick={playAgain}>Tekrar Oyna </button>
              </>
            }
            {console.log(getWord)}

          </div>
        </div>
      </div>

    </MainContext.Provider>
  );
}

export default App;
