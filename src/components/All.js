import React,{ Component } from "react";
import SampleDetail from './SampleDetail';
import { getSamples } from "../actions/sampleActions";
import _ from "lodash";
import { connect } from "react-redux";

class All extends Component{

    constructor(props){
        super(props);
        this.state = {
            ReceiveDate : '',
            LotNo :'',
            Model:'',
            Customer : '',
            IssueDate:'',
            DueDate : '',
            ComponentPart : {},
            Finish: false
        }
      }
    render(){

    return _.map(this.props.samples,(samp,key)=>{
            <div className='row'>
                <SampleDetail key={key}>
                    <h3>{key}</h3>
                    <p>{samp.Model}</p>
                </SampleDetail>
            </div>
        });
    }
}

function mapStateToProps(state,ownProps){
    return{
        sample : state.sample
    }
}

export default connect(mapStateToProps,{getSamples})(All);