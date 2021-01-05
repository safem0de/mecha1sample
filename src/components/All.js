import React,{ Component } from "react";
import { Link } from "react-router-dom";
import SampleCard from './SampleCard';
import { getSamples ,deleteSample} from "../actions/sampleActions";
import _ from "lodash";
import { connect } from "react-redux";

class All extends Component{

    renderCard(){
        const {samples} = this.props;
        return _.map(samples,(sample,key)=>{
            return(
                <SampleCard key={key}>
                    <Link to={`/all/${key}`}>
                        <h3>{key}</h3>
                    </Link>
                    <p>{sample.Model}</p>
                    {
                        _.map(sample.ComponentPart,(comp,subkey)=>{
                            return <p key={subkey}><b>{subkey} : </b><br/>{comp.PartNo}</p>
                        })
                    }
                    <button
                        className='btn btn-danger'
                        onClick={()=>this.props.deleteSample(key)}
                    >
                    Delete</button>
                    <Link to={`/print/${key}`}>
                    <button
                        className='btn btn-info'
                    >
                    Print</button>
                    </Link>
                </SampleCard>
            )
        });
    }

    render(){
        return(
            <div className='row'>
                {this.renderCard()}
            </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    return{
        samples : state.samples,
        user: state.user
    }
}

export default connect(mapStateToProps,{getSamples,deleteSample})(All);