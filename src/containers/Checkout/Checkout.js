import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component{

    state={
        ingridients : {
            salad :0,
            bacon : 1 ,
            cheese : 0,
            meat : 0,
            
            
            
        }
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const _ingridients =   {};
        
        for (let param of query.entries()) {
            _ingridients[param[0]] = +param[1];
            
        }
        console.log(this.state.ingridients)
        console.log(_ingridients)
        this.setState({ingridients : _ingridients});
        console.log(this.state.ingridients)
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
            </div>

        )


    }


}


export default Checkout;