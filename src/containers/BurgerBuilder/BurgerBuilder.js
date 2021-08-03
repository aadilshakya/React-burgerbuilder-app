import React,{ Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxilliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilder from '../../store/actions/index'



class BurgerBuilder extends Component{
    state={
        
        purchasable: false,
        purchasing: false,
        loading:false
    }
    componentDidMount(){
        this.props.onInitIngredients()
        
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients= {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount; 
        const priceAddition = this.props.toprice[type];
        const newPrice = this.props.toprice+ priceAddition;

        this.setState({ingredients: updatedIngredients,totalPrice: newPrice})
         this.updatePurchaseable(updatedIngredients);
    }

    updatePurchaseable(ingredients){
        const sum= Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum+el

        },0)
        return sum>0
    }

    updatePurschase=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler= ()=>{
        this.props.onInitPurchased();
        
        // const queryParams=[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString= queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout'
        })

       

    }

    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return
        }
        const updatedCount = oldCount-1;
        const updatedIngredients= {
            ...this.state.ingredients
        };
        updatedIngredients[type]= updatedCount; 
        const pricededuct = this.props.toprice[type];
        const newPrice = this.props.toprice- pricededuct;

        this.setState({ingredients: updatedIngredients,totalPrice: newPrice})
        this.updatePurchaseable(updatedIngredients);

    }

    render(){
        const disableInfo={
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key]<=0
        }
        let orderSummary = null
        

        let burgerino=<Spinner/>

        if(this.props.ings){
            burgerino =( <Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls
                    totalPrice={this.props.toprice}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientremoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                        purchasable={this.updatePurchaseable(this.props.ings)}
                        ordered={this.updatePurschase}
                    /> 
        

        </Aux>
            );
        orderSummary =<OrderSummary ingredients={this.props.ings} 
        cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            totalPrice={this.props.toprice}
        />

            
        }
        if(this.state.loading){
            orderSummary= <Spinner/>

        }
          
       
        return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalclose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerino}
            </Aux>
        );
    }
}

const mapStatetoProps= state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        toprice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    } 
}
const mapDispatchToProps= dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch(burgerBuilder.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(burgerBuilder.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(burgerBuilder.initIngredients()),
        onInitPurchased: ()=>dispatch(burgerBuilder.purchaseInit())
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));