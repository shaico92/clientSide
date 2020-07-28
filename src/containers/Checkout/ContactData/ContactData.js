import React ,{Component} from 'react';

import Button from '../../../components/UI/Button/Button'

import classes from './ContactData.css'
class ContactData extends Component{

    state={
            name:'',
            email:'',
            adress:{
                street:'',
                postalCode: ''
            },
            loading : false
    }

orderHandler = (event)=>{
    event.preventDefault();
    console.log(this.props.ingridients)
    console.log(this.props.totalPrice)

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