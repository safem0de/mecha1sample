
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getSamples} from '../actions/sampleActions';

class Loading extends Component{

    componentWillMount(){
        const {sampleLoading} = this.props;
        if (sampleLoading === undefined){
            this.props.getSamples();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.sampleLoading === -1 ){
            this.props.getSamples();
        }
    }

    render(){
        const {sampleLoading,children} = this.props;
        if (!sampleLoading){
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
        samples : state.sample,
        sampleLoading : state.loading.samples
    }
}

export default withRouter (connect(mapStateToProps,{getSamples})(Loading));