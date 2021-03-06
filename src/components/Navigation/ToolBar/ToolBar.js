import React from 'react'

import classes from './ToolBar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolBar=(props)=>{
    return <header className={classes.ToolBar}> 
        <DrawerToggle clicked={props.clicked}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
       <NavigationItems isAuthenticated={props.isAuth} /></nav>
    </header>

}

export default toolBar;