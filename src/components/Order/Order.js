import React from 'react'
import classes from './Order.css'

const order=props=>{
    const _ingridients=[];
    
    for (let ingridientsName in props.ingridients) {

        _ingridients.push({
            name : ingridientsName,
            amount : props.ingridients[ingridientsName]
        });
        
        
    }
    const ingridinetsOutput=_ingridients.map(ig=>{
    return <span className={classes.Ingridients}>{ig.name}({ig.amount})</span>
    })
    return(
        <div className={classes.Order}>
            <p>Ingridients : {ingridinetsOutput}</p>
            <p>Price<strong> : USD {props.price}</strong></p>
        </div>
    )
}

export default order;