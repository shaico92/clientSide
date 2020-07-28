import React ,{Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import classes from './ContactData.css'
class ContactData extends Component{

    state={
        customer:{
            name:'',
            email:'',
            address:{
                street:'',
                zipcode: 121123123,
                country : ''
            },
            
    }
    }


orderHandler = (event)=>{
    event.preventDefault();
    const customer = {...this.state.customer}
    const ings = {...this.props.ingridients}
    const price = this.props.totalPrice
    const order ={
        customer,
        ings,
        price,
        
    }   
    console.log(order)
    axios.post('/checkout/contact-data',order)
        .then(res=>{
            console.log(res)
            
            
        })
        .catch(err=>{console.log(err)
            
        }) 

}
render(){
    return(
        <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Name' />
                    <input type='email' name='email' placeholder='Email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postalCode' placeholder='Postal Code' />
                    <Button clicked={this.orderHandler} btnType='Success'>Order</Button>
                </form>
        </div>

    )
}


}


export default ContactData;