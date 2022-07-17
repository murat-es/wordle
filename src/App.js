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
  const [language, setLanguage] = useState("tr")
  const [theme, setTheme] = useState(localStorage.getItem('theme'));

  const fetchWord = () => {
    fetch("https://3.68.135.14/api/word/" + language + "/5/1")
      .then(response => response.json())
      .then(data =>
        setGetWord(data.words[0].split("")))
  }

  useEffect(() => {
    fetchWord()
  }, [language])

  const data = {
    language,
    setLanguage,
    theme,
    setTheme
  }


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
          {gameOver &&
            <div className={classes.congrats}>
              <div className={classes.text}>
                Tebrikler<br />
                Kelimeyi buldunuz
              </div>
              <button className={classes.playButton} onClick={playAgain}>Tekrar Oyna </button>
            </div>}
          {console.log(getWord)}
        </div>
      </div>

    </MainContext.Provider>
  );
}

export default App;
