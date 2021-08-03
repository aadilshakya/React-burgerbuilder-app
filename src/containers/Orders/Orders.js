import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Orders/Order";
import axios from "../../axios-orders";
import * as actions from '../../store/actions/index'


class Orders extends Component{
    // state={
    //     orders:[],
    //     loading:true,
    // }
    componentDidMount(){
        // axios.get('/orders.json')
        // .then(res=>{
        //     const fetchedOrder=[]
        //     for(let key in res.data){
        //         fetchedOrder.push({
        //             ...res.data[key],
        //         id:key})

        //     }
        //     console.log(fetchedOrder)
        //     this.setState({loading:false, orders: fetchedOrder});

        // })
        // .catch(err=>{
        //     this.setState({loading:false})
        // })
        this.props.onFetchOrders();

    }
    render(){
        return(
            <div>
                {this.props.orders.map(order=>(
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}
const mapStatetoProps= state=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        onFetchOrders:()=>dispatch(actions.fetchOrders())
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(Orders); 