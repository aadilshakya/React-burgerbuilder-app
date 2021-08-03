import React, { Component } from 'react'

import Aux from '../../../hoc/Auxiliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentDidUpdate(){
        console.log("component did update")
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
            return <li key={igKey}>
            <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        })
        return(<Aux>
            <h3> Your Order</h3>
            <p> A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: Rs. {this.props.totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
        </Aux>);
    }
}


export default OrderSummary;