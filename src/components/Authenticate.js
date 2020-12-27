import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Authenticate extends Component{
    componentDidUpdate(){
        const{userLoading, user} = this.props;
        if(userLoading === false && !user){
            this.props.history.push('/login');
        }
    }

    render(){
        const {user,userLoading,children} = this.props;
        if(userLoading === false && user){
            return(<div>{children}</div>);
        }else{
            return null;
        }
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        userLoading: state.loading.user,
    };
};

export default withRouter(connect(mapStateToProps)(Authenticate));