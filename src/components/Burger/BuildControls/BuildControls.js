import React from "react";

import classes from './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'

import Aux from '../../../hoc/Auxillary/Auxillary'
const controls=[
    {label : 'Salad', type: 'salad'},
    {label : 'Bacon', type: 'bacon'},
    {label : 'Cheese', type: 'cheese'},
    // {label : 'Pickels', type: 'pickels'},
    {label : 'Meat', type: 'meat'}
];

const buildControls = props=>(
    <Aux>
<div className={classes.BuildControls}>

<p>Current Price : <strong>{props.prices.toFixed(2)}</strong></p>

{controls.map(el=>{
 return   <BuildControl 
 remove={()=>props.ingridientsDeduct(el.type)} 
 added={()=>props.ingridientsAdded(el.type)} 
 key={el.label} 
 type={el.type} 
 ingridientLabel={el.label}
 disabled = {props.disabled[el.type]}
 
 


 />
 
 
})



}





    
<button className={classes.OrderButton} onClick={props.order}  disabled={!props.purchasable}>ORDER NOW</button>

<button className={classes.Reset} onClick={props.removeAll} >Reset Burger</button>
</div>

</Aux>

)


export default buildControls;