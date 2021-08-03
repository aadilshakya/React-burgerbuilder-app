import * as actionTypes from '../actions/actionTypes';

const initialState={
    token:null,
    userID:null,
    error:null,
    loading:false
}

const reducer=(state=initialState,action)=>{
    switch(actionTypes){
        case actionTypes.AUTH_START:
            return{
                ...state,
                error:null,
                loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token: action.IDtoken,
                userID: action.userID,
                error: null,
                loading:false
            }
        case actionTypes.AUTH_FAILED:
            return{
                ...state,
                error: action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userID:null
            }
        default:
            return state;
    }
     
}

export default reducer