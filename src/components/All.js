import React,{ Component } from "react";
import SampleCard from './SampleCard';
import { getSamples ,deleteSample} from "../actions/sampleActions";
import _ from "lodash";
import { connect } from "react-redux";

class All extends Component{
    
    render(){
    return _.map(this.props.samples,(sample,key)=>{
            <div className='row'>
                <SampleCard key={key}>
                    <h3>{key}</h3>
                    <p>{sample.LotNo}</p>
                    <button
                        className='btn btn-danger'
                        onClick={()=>this.props.deleteSample(key)}
                    >
                    Delete</button>
                </SampleCard>
            </div>
        });
    }
}

function mapStateToProps(state,ownProps){
    return{
        samples : state.samples
    }
}

export default connect(mapStateToProps,{getSamples,deleteSample})(All);