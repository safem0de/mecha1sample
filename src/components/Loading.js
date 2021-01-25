
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSamples,getSampleGraph,getSituation} from '../actions/sampleActions';
import {getUser} from '../actions/userActions';

class Loading extends Component{

    componentWillMount(){
        const {userLoading,samplesLoading} = this.props;
        var x = new Date(Date.now()).toLocaleString('en-us', { month: 'long' });
        this.props.getSampleGraph(x,['Receive','Confirm','Shipment']);
        this.props.getSituation();

        if (samplesLoading === undefined){
            this.props.getSamples();
        }
        if (userLoading === undefined){
            this.props.getUser();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.samplesLoading === -1 && nextProps.user !== null){
            this.props.getSamples();
        }
    }

    render(){
        const {userLoading,samplesLoading,children} = this.props;
        if ((!userLoading && !samplesLoading )||this.props.user === null){
            return(
                <div>
                    {children}
                </div>
            );
        }else{
            return(
                <div className='d-flex justify-content-center'>
                    <h2>Loading...</h2>
                </div>
            );
        }
    }
}

function mapStateToProps(state){
    return{
        samplesLoading : state.loading.samples,
        userLoading : state.loading.user,
        user : state.user
    }
}

export default withRouter (connect(mapStateToProps,{getSamples,getUser,getSampleGraph,getSituation})(Loading));