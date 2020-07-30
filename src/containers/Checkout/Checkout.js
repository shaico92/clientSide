import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'


import ContactData from '../Checkout/ContactData/ContactData'

import {Route} from 'react-router-dom'
class Checkout extends Component{

    state={
        ingridients : null
        ,
        totalPrice: 0 
    }
//instead of didmount to prevent from rendering a null object before it is intialized
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const _ingridients =   {};
        let totalPrice =null;
        for (let param of query.entries()) {
            if (param[0]!=='price') {
                _ingridients[param[0]] = +param[1];
            }else{
                totalPrice = +param[1];
            }

            
        }
        if (totalPrice!==null) {
            totalPrice=totalPrice.toFixed(2);
        }
        
        this.setState({ingridients : _ingridients,totalPrice : totalPrice});
        
    }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinuedHandler=()=>{
        
        this.props.history.replace('/checkout/contact-data')
    }

    
    render(){

        return(

            <div>
                    <CheckoutSummary
                    ingridients ={this.state.ingridients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                     />
                     <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactData {...props } totalPrice={this.state.totalPrice}  ingridients={this.state.ingridients}/>)}/>
            </div>

        )


    }


}


export default Checkout;