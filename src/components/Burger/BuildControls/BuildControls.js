import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css'


const controls=[
    {label:'Salad',type: 'salad'},
    {label:'Meat',type: 'meat'},
    {label:'Cheese',type: 'cheese'},
    {label:'Bacon',type: 'bacon'}
]

const buildControls =(props)=>{
    return(
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>Rs. {props.totalPrice.toFixed(2)}</strong></p>
             {controls.map(ctrl=>{
                 return <BuildControl 
                 key={ctrl.label} 
                 label={ctrl.label} 
                 added={()=>props.ingredientAdded(ctrl.type)}
                 removed={()=>props.ingredientremoved(ctrl.type)}
                 disabled={props.disabled[ctrl.type]}
                 />
             })}
             <button className={classes.OrderButton} disabled={!props.purchasable}
             onClick={props.ordered}>Order Now!</button>
        </div>
         
    );
}

export default buildControls; 