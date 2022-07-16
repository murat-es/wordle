import classes from './App.module.css';
import Word from './components/Word/Word';
import React, { useState, useEffect, useLayoutEffect } from 'react'

function App() {
  const word1 = ["i", "y", "i", "c", "e"]
  const wordAmount = 6;
  const [turn, setTurn] = useState(0);
  const [getWord, setGetWord] = useState(["m", "u", "r", "a", "t"]);
  const [gameOver, setGameOver] = useState(false);

  console.log("getWord", getWord)
  useEffect(() => {


    fetch('https://3.68.135.14/api/word/5/1')
      .then(response => response.json())
      .then(data =>
        setGetWord(data.words[0].split("")))
  }, [])


  // useLayoutEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("https://3.68.135.14/api/word/5/1");
  //     const data = await response.json();
  //     setGetWord(data.words[0].split(""));
  //   }
  //   fetchData()
  // }, []);


  return (
    <div className={classes.App}>
      {

        Array.from(Array(wordAmount).keys()).map((temp, index) => {
          return <Word word1={getWord} key={index} turn={turn} order={index} setTurn={setTurn} gameOver={gameOver} setGameOver={setGameOver} />
        })
      }
      {gameOver && <div>Tebrikler</div>}
    </div>
  );
}

export default App;
