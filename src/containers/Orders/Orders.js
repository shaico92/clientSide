import React ,{Component} from 'react';

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import order from '../../components/Order/Order';
class Orders extends Component{

state={
    orders : [],
    loading : true
}
    componentDidMount(){
                    
        axios.get('/orders').then(res=>{
            this.setState({loading : false})
            
            const fetchedOrders = [];
            for(let key in res.data.order){
                    fetchedOrders.push({...res.data.order[key],
                        id:key
                    });
                    console.log(res.data.order)
            }
            this.setState({loading : false,orders : fetchedOrders})       
        })

        .catch(err=>{console.log(err)
            this.setState({loading : false})    

        })   
        
        
}


    

    
    render(){
            const orders = this.state.orders.map(order=>(
                <Order key={order.id}
                        ingridients={order.ingridients}
                        price={order.totalPrice}/>
            ))
        return( 
            <div>
                
                {orders}
            </div>
        );



    }


}


export default Orders;