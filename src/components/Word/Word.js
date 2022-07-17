import React, { useEffect, useState, useCallback } from 'react'
import classes from "./Word.module.css"

const Word = ({ word1, turn, order, setTurn, setGameOver, gameOver }) => {
    const [input, setInput] = useState(["", "", "", "", ""])

    const [stateOfWord, setStateOfWord] = useState([null, null, null, null, null])



    const checkFull = () => {
        for (let i = 0; i < 5; i++) {
            if (input[i] === "") {
                return false
            }
        }
        return true
    }

    const addLetter = (e) => {
        let copyInput = input

        if (e.key === "Backspace") {
            for (let i = 4; i > -1; i--) {
                if (copyInput[i] !== "") {
                    copyInput[i] = ""
                    break
                }
            }
            setInput([...copyInput])
        }

        else if (e.key === "Enter" && checkFull()) {
            checkWord()
            checkOver()
            setTurn(turn => turn + 1)
        }

        else {
            if (/[a-zşçğöüı]/i.test(e.key) && e.key.length === 1) {
                for (let i = 0; i < 5; i++) {
                    if (copyInput[i] === "") {
                        copyInput[i] = e.key
                        break
                    }
                }
                setInput([...copyInput])
            }
        }
    }

    useEffect(() => {
        if (turn === order && !gameOver) {
            window.addEventListener('keydown', addLetter);

            return () => {
                window.removeEventListener('keydown', addLetter)
            }
        }
    }, [turn, word1])

    const checkOver = () => {
        for (let i = 0; i < 5; i++) {
            if (stateOfWord[i] !== 1) {
                return false
            }
        }
        setGameOver(true)
        return true
    }

    const checkWord = () => {
        let copyState = stateOfWord


        for (let i = 0; i < 5; i++) {
            if (input[i] === word1[i]) {
                copyState[i] = 1
            }
            else if (word1.includes(input[i])) {
                // if (copyState[word1.indexOf(input[i])] === 1) {
                //     console.log("murat")
                //     copyState[i] = -1
                // }
                // else

                copyState[i] = 0

                // console.log(word1.indexOf(input[i]))
            }
            else {
                copyState[i] = -1
            }
        }
        setStateOfWord([...copyState])

    }

    return (
        <div className={classes.container} >

            {input.map((letter, index) => {
                return (
                    <div key={index} className={
                        `${classes.word} ${input[index] !== "" && classes.activeWord} 
                        ${stateOfWord[index] === 1 && classes.green}
                        ${stateOfWord[index] === 0 && classes.gray}
                        ${stateOfWord[index] === -1 && classes.red}`
                    }>{input[index].toLocaleUpperCase('tr-TR')}</div>
                )
            })}
        </div>
    )
}

export default Word