import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component{
    
  
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients={} 
    //     let price=0;
    //     for( let param of query.entries()){
    //         if(param[0]==='price'){
    //             price=param[1]

    //         }
    //         else{
    //             ingredients[param[0]]= +param[1]
    //         }
           
    //     }
    //     this.setState({ingredients:ingredients, totalPrice: price})

    // }

    cancelButtonHandler=()=>{
        this.props.history.goBack('/');
    }
    continueButtonHnadler=()=>{
        this.props.history.replace('checkout/contact-data');
    }
    render(){
        let  summary =<Redirect to="/"/>
         
        if(this.props.ings){
            let purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary=
            <div>
            {purchasedRedirect}
            <CheckoutSummary 
            ingredients={this.props.ings} 
            clickedCancel={this.cancelButtonHandler}
                clickedContinue={this.continueButtonHnadler}
            />
            <Route path={this.props.match.path+'/contact-data'} render={(props )=>(
                <ContactData ingredients={this.props.ings} totalprice={this.props.toprice}{...this.props}/>)}/>
                </div>
        }
        return(
            
            <div>
                {summary}
                
            </div>
        )
    }
}


const mapStatetoProps = state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        toprice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}


export default connect(mapStatetoProps)(Checkout);