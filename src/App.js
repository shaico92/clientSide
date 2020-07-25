import React, { Component } from 'react';


import './App.css';


import Layout from './components/Layout/Layout';
import {Route, Switch} from 'react-router-dom'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'


import Checkout from './containers/Checkout/Checkout'
class App extends Component{

state={
  show : true
}
    


  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show : false});
  //   },5000)
  // }    


  render(){
    return(

      <div>

      <Layout>
        <Switch>
        <Route path='/checkout' component={Checkout}/>      
        <Route path='/'  component={BurgerBuilder}/>      
      
        </Switch>
      
          
      </Layout>

    </div>





    );
  }


}

export default App;
