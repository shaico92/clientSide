import React from 'react'


import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const navigationItems =props=>(
        
            <ul className={classes.NavigationItems}>
                <NavigationItem active link='/'>Burger Builder</NavigationItem>
                <NavigationItem link='/lol1'>Checkout</NavigationItem>
                
            </ul>
        
)


export default navigationItems;