import React from 'react'
import classes from './Header.module.css'
import { MainContext, useContext } from '../../context'

const Header = () => {

    const { language, setLanguage, theme, setTheme } = useContext(MainContext)

    const changeLanguage = () => {
        let change = language === "tr" ? "en" : "tr"
        setLanguage(change)
        localStorage.setItem('language', change);

    }
    const changeTheme = () => {
        let change = (theme === 'light' ? 'dark' : 'light')
        setTheme(change);
        localStorage.setItem('theme', change);
    };

    return (
        <div className={classes.container}>
            <div style={{ flexGrow: 1 }}></div>
            <div className={classes.logo}>
                WORDLE
            </div>
            <div className={classes.others} >
                <div onClick={changeLanguage}>
                    {language === "tr" ? "TR" : "EN"}
                </div>
                <div onClick={changeTheme}>
                    {theme === "light" ? "Light" : "Dark"}
                </div>
            </div>
        </div>
    )
}

export default Header