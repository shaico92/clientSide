import React, { Component } from 'react'



import Aux from '../Auxillary/Auxillary'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent , axios)=>{
    
    return class extends Component{
        state={
            error : null,
            reqInterceptor : null
        }
        componentDidMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{this.setState({error: null})
            return req})
            this.reqInterceptor =axios.interceptors.response.use(res=>res,err=>{this.setState({error: err})})
        }

        componentWillUnmount(){
            console.log('unmounting [withErrorHandler.js]')
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }

        errorConfirmedHandler = ()=>{
            this.setState({error : null})
        }
        render(){
            return (

                <Aux>
    
    
                <Modal
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}
                >
                    {this.state.error ? this.state.error.message : null}
                    
                </Modal>
                <WrappedComponent {...this.props}/>
                </Aux>
    
                
            )
        }
    }
    

}


export default withErrorHandler;