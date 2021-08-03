import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const logOut= ()=>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout= (expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut())

        },expirationTime)

    }
}

export const authSuccess =(token,userID)=>{
    return{
        type:  actionTypes.AUTH_SUCCESS,
        IDtoken: token,
        userID: userID
    }
}

export const authFailed= (error)=>{
    return{
        type: actionTypes.AUTH_FAILED,
        error:error
    }
}

export const auth =(email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password: password,
            returnSecureToken:true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCT4wRhGFF8ovSPVCqegF6w0bZAXcZmwb8'
        if(!isSignup){
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCT4wRhGFF8ovSPVCqegF6w0bZAXcZmwb8'
        }
        axios.post(url,authData)
        .then(res=>{
            console.log(res);
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFailed(err));
        })
    }
}