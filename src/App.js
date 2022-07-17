import classes from './App.module.css';
import Word from './components/Word/Word';
import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import { MainContext } from './context';

function App() {
  const wordTest = ["m", "u", "r", "a", "t"]
  const wordAmount = 6;
  const [turn, setTurn] = useState(0);
  const [getWord, setGetWord] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [language, setLanguage] = useState("tr")
  const [theme, setTheme] = useState('light');


  let url = "https://3.68.135.14/api/word/" + language + "/5/1"
  useEffect(() => {

    fetch("https://3.68.135.14/api/word/" + language + "/5/1")
      .then(response => response.json())
      .then(data =>
        setGetWord(data.words[0].split("")))
  }, [language])

  const data = {
    language,
    setLanguage,
    theme,
    setTheme
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
          {gameOver && <div>Tebrikler</div>}
          {getWord}
        </div>
      </div>

    </MainContext.Provider>
  );
}

export default App;
