import React,{ Component } from "react";
import { Link } from "react-router-dom";
import SampleCard from './SampleCard';
import { formatDate } from '../actions/Actions'
import { getSamples ,deleteSample,editSample} from "../actions/sampleActions";
import _ from "lodash";
import { connect } from "react-redux";

class All extends Component{

    constructor(props){
        super(props)

        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.renderCard = this.renderCard.bind(this);
    }

    handlerSubmit(e,id){
        console.log('press finished',id);
        e.preventDefault();
        const sample = {
            Finish:true,
            FinishDate:formatDate(Date.now())
        }
        this.props.editSample(id,sample);
          this.setState = {
            Finish:false,
        }
    }

    renderCard(){
        const {samples} = this.props;
        return _.map(samples,(sample,key)=>{
            // console.log(key)
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
                        className='btn btn-danger mx-1'
                        onClick={()=>this.props.deleteSample(key)}
                    >
                    Delete</button>
                    <Link to={`/print/${key}`}>
                    <button
                        className='btn btn-info mx-1'
                    >
                    Print</button>
                    </Link>
                    <button
                        className='btn btn-primary mx-1'
                        onClick={(e)=>this.handlerSubmit(e,key)}
                    >
                    Finished</button>
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

export default connect(mapStateToProps,{getSamples,deleteSample,editSample})(All);