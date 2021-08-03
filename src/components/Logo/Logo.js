import React from 'react'

import burgerLogo from '../../Assets/Images/BurgerLogo.png'
import classes from './Logo.module.css'

const logo=(props)=>{

   return <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt='Burger Builder'></img>
    </div>

}

export default logo;