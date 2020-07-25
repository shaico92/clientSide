import React,{Component} from 'react'


import Aux from '../../hoc/Auxillary/Auxillary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Burger from '../../components/Burger/Burger'

import Modal from '../../components/UI/Modal/Modal'

import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'

import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

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
            
        ingridients : null,
        totalPrice : 0,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : null
    }

        componentDidMount(){
            axios.get('/').then(res=>{
                console.log(res)
                this.setState({ingridients : res.data.ingridients, totalPrice : res.data.totalPrice})
            }).catch(err=>{
                this.setState({error : true})
            })
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
        
        // this.setState({loading : true})        
        // const order = {
        //   ings:  this.state.ingridients,
        //  price : this.state.totalPrice,
        //  customer : {
        //      name:'shai',
        //      address: {
        //             street: 'test',
        //             zipcode : '1241',
        //             country: 'israel'
        //      }
        //  }
        // }

        
        // axios.post('/checkout', order)
        // .then(res=>{
        //     console.log(res)
        //     this.setState({loading : false , purchasing : false})
            
        // })
        // .catch(err=>{console.log(err)
        //     this.setState({loading : false , purchasing : false})
        // })

        let queryParamas =[];
        for(let i in this.state.ingridients){
            queryParamas.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingridients[i]));
        }
        const queyString = queryParamas.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : '?'+queyString
        })
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
        let orderSummary = null;
        if (this.state.loading===true) {

             orderSummary=<Spinner/>
            
        }
        let burger =this.state.error ? <p style={{textAlign: "center",color : 'red'}}>Ingridients cant be loaded </p> :  <Spinner/>
        if (this.state.ingridients) {
            burger =(<Aux>
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
                    
            </Aux>);
            orderSummary=<OrderSummary 
            price = {this.state.totalPrice}
            ingredients={this.state.ingridients}
            purchaseCancled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
                />
        } 
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
         
        return( 

            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>

                        {orderSummary}
                    

                </Modal>
                    {burger}
                
            </Aux>

        );
    }



}

export default withErrorHandler(BurgerBuilder, axios);