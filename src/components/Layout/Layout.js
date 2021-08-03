import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxilliary';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state={
        showSideDrawer: false
    }

    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
        

    }

    drawToggleHandler=()=>{
        this.setState(( prevState )=>{
            return {showSideDrawer: !prevState.showSideDrawer}

        });
    }

    render(){
        return (<Aux>
            <ToolBar 
            isAuth={this.props.isAuthenticated}
            clicked={this.drawToggleHandler}/>
            <SideDrawer isAuth={this.props.isAuthenticated} open ={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>)
    }
}
const mapStateToProps=state=>{
    return{ 
        isAuthenticated: state.auth.token !== null

    }
}

export default connect(mapStateToProps)(Layout);