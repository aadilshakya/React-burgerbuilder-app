import React, { Component } from 'react';
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component{

    state={
        controls: {
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType:'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
            
        },
        isSignUp:true
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp: !prevState.isSignUp
            }
        })
    }

    inputChangedHandler=(event,controlName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value
            }
        }

        this.setState({controls: updatedControls})
    }
    sumitHandler= (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);


    }
    render(){
        const formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement=>{
            return <Input
                key={formElement.id}
                elementType ={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            />
            
        })

        if (this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.Auth}>
                <form onSubmit={this.sumitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
                <Button btnType="Danger" 
                clicked={this.switchAuthModeHandler}
                > Switch To {this.state.isSignUp?'SignIn':'SignUp'}</Button>

                </form>
            </div>

        );
    }
}
const mapStateToProps=state=>{
    return{
       loading: state.auth.loading 
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onAuth: (email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);