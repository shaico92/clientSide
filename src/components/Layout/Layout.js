import React, { Component } from 'react'

import classes from './Layout.css'

import Aux from '../../hoc/Auxillary'
import SideDrawer from '../Navugation/Sidedrawer/SideDrawer'
import Toolbar from '../Navugation/Toolbar/Toolbar'
class Layout extends Component{

    state={
            showSideDrawer : false
    }


    sideDrawerClosedHandler=()=>{
            this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHandler=()=>{

        this.setState(( prevState )=>{
            return {showSideDrawer : !prevState.showSideDrawer}
        })
    }
    render(){

        return(

<Aux>
    <div>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        Backdrop
    </div>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Aux>



        )


    }



}


export default Layout;