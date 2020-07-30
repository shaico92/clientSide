import React from 'react'
import classes from './Order.css'

const order=props=>(
    <div className={classes.Order}>
        <p>Ingridients : {/*props.ingridients*/}</p>
        <p>Price<strong>USD : {props.price}</strong></p>
    </div>
)

export default order;