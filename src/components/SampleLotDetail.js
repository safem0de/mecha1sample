import React , {Component} from 'react';
import {connect} from 'react-redux';

class SampleLotDetail extends Component{
    render(){
        return(
            <div>test test</div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        sample: state.samples[ownProps.match.params.id],
        uid: state.user.uid
    };
}

export default connect(mapStateToProps)(SampleLotDetail);