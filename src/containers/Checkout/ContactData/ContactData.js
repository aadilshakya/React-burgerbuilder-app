import React ,{ Component } from 'react';
import Button from '../../../components/UI/Button/Button';
// import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index'

class ContactData extends Component{
    state={
        orderForm:{ 
            name:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: ''
            },
        address:{
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your address'
            },
            value: ''
        },
        email: {
            elementType:'input',
            elementConfig: {
                type: 'text',
                placeholder: 'your email'
            },
            value: ' '
        }},

           
        
    
    }
    orderHandler=(event)=>{
        event.preventDefault();
        // this.setState({loading:true});
        const formData= {};
        for(let formIdentifier in this.state.orderForm){
            formData[formIdentifier]= this.state.orderForm[formIdentifier].value
        }
        // alert("You continued!")
        const order={
            ingredients: this.props.ingredients,
            price: this.props.totalprice,
            orderData: formData
            
         }

         this.props.onOrderBurger(order)
        

    }

    formChangeHandler=(event,inputID)=>{
        const updatedForm ={
            ...this.state.orderForm
        } 
        const updatedFormElement= {...updatedForm[inputID]}

        updatedFormElement.value= event.target.value
        updatedForm[inputID]= updatedFormElement
        this.setState({orderForm:updatedForm})
         
    }
    render(){
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form=(
        <form onSubmit={this.orderHandler}>
        
            
            {formElementArray.map(formElement=>{
                return <Input 
                key={formElement.id}
                elementType ={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                    changed={(event)=>this.formChangeHandler(event,formElement.id)}
                />
            })}
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner/>  
        }
        return(
            <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            
                 {form}
            </div>
        );
    }
}

const mapStatetoProps=state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalprice,
        loading: state.order.loading
    }
}

const mapDispatchToProps= dispatch=>{
    return{
    onOrderBurger:(orderData)=> dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ContactData);