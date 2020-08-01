import React ,{Component} from 'react';

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
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
            
    },
    loading : false
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
            this.setState({loading : false})
            this.props.history.push('/')   
            
        })
        .catch(err=>{console.log(err)
            this.setState({loading : false})
        }) 

}
render(){
    
    let form = (
        <form>
        <Input inputtype='input' type='text' name='name' placeholder='Name' />
        <Input inputtype='input' type='email' name='email' placeholder='Email' />
        <Input inputtype='input' type='text' name='street' placeholder='Street' />
        <Input inputtype='input' type='text' name='postalCode' placeholder='Postal Code' />
        <Button clicked={this.orderHandler} btnType='Success'>Order</Button>
        </form>)
        if (this.state.loading) {
            form = <Spinner/>
            
        }    
    return(
    <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
        </div>
        )
        

    
}


}


export default ContactData;