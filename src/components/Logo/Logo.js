import React from 'react'

import BurgerLogo from '../../assets/imgs/burger-logo.png'

import classes from './Logo.css'
const logo =props=>(
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={BurgerLogo} alt='{null}'/>
        </div>
)


export default logo;