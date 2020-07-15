import React,{Component} from 'react'


import Aux from '../../hoc/Auxillary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Burger from '../../components/Burger/Burger'

import Modal from '../../components/UI/Modal/Modal'


import axios from '../../axios-orders'

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGRIDIENTS_PRICES = {
    salad : 0.5,
    cheese : 1.32,
    meat : 4.51,
    bacon : 2.14,
    // pickels : 0.2,
} 
class BurgerBuilder extends Component{

    



    state={
            
        ingridients : {
            salad: 0,
            bacon : 0,
            cheese : 0,
            // pickels : 1,
            meat : 0
        },
        totalPrice : 0,
        purchasable : false,
        purchasing : false,
    }

    updatePurchaseState (ingridients){
        const sum = Object.keys(ingridients)
        .map(igKey=>{
            return ingridients[igKey]
        }).reduce((sum,el)=>{
                return sum +el
        },0);
        this.setState({purchasable : sum>0});

    }

    purchasingHandler=()=>{
        this.setState({purchasing: true});
    }


    addIngridientHandler =(type)=>{
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount+1;
        const updatedIngridients={
            ...this.state.ingridients
        };

        updatedIngridients[type] =  updatedCount;

        const priceAddition = INGRIDIENTS_PRICES[type];

        const oldPrice = this.state.totalPrice;


        const newPrice = oldPrice+priceAddition;



        this.setState({totalPrice : newPrice, ingridients : updatedIngridients})
        this.updatePurchaseState(updatedIngridients)
    } 


    resetBurgerHandler = ()=>{

        const currentIngrind = this.state.ingridients
        const defaultPrice = 0;
        const newObj = currentIngrind
        
        for (const prop in newObj) {
            newObj[prop] =0 


          }
            
            this.setState({ingridients : newObj, totalPrice : defaultPrice})
            this.updatePurchaseState(newObj)
        //this.setState({ingridients : allZero});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false})
    }
    

    purchaseContinueHandler = ()=>{
        

        const order = {
          ings:  this.state.ingridients,
         price : this.state.totalPrice,
         customer : {
             name:'shai',
             address: {
                    street: 'test',
                    zipcode : '1241',
                    country: 'israel'
             }
         }
        }

        console.log('before post')
        axios.post('/checkout', order)
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})
        console.log('after post')
    }

    removeIngridientHandler =(type)=>{
        const oldCount = this.state.ingridients[type];
        if (oldCount<=0) {
            
        } else {
            const updatedCount = oldCount-1;
            const updatedIngridients={
                ...this.state.ingridients
            };
    
            updatedIngridients[type] =  updatedCount;
    
            const priceDeduct = INGRIDIENTS_PRICES[type];
    
            const oldPrice = this.state.totalPrice;
    
    
            const newPrice = oldPrice-priceDeduct;
            this.setState({totalPrice : newPrice, ingridients : updatedIngridients});
            this.updatePurchaseState(updatedIngridients)
        }
        
    } 

    

    render(){
        const disabledInfo={
            ...this.state.ingridients
        };
        for (let key in disabledInfo){
            disabledInfo[key ] = disabledInfo[key]<=0
        }
        return( 

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>

                    <OrderSummary 
                        price = {this.state.totalPrice}
                        ingredients={this.state.ingridients}
                        purchaseCancled={this.purchaseCancelHandler}
                        purchaseContinue={this.purchaseContinueHandler}
                    />

                </Modal>
                <Burger ingridients={this.state.ingridients}/>
                
                    <BuildControls
                    
                    prices = {this.state.totalPrice}
                    ingridientsAdded={this.addIngridientHandler}

                    ingridientsDeduct={this.removeIngridientHandler}

                    disabled={disabledInfo}

                    removeAll={this.resetBurgerHandler}
                    
                    order={this.purchasingHandler}

                    purchasable={this.state.purchasable}
                    />
                
            </Aux>

        );
    }



}

export default BurgerBuilder;