import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import { saveComment } from "../actions/sampleActions";

class ProcessInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            SAP : '',
            processinput : '',
            EmpNo : ''
        }
        this.renderSelect = this.renderSelect.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const sampleInput = {
            SAP : this.props.match.params.sap,
            processinput : this.state.processinput,
            EmpNo : this.state.EmpNo
        }
        console.log('test',this.props.match.params.id,sampleInput)
        console.log({comments:{
            [Date.now()] : sampleInput
        }})
        this.props.saveComment(this.props.match.params.id,sampleInput);                
        this.setState({
            SAP : '',
            processinput : '',
            EmpNo : ''
        })
    }

    renderComments() {
        const element = {}
    element[this.props.match.params.id]={
      ...this.props.sample
    }
    console.log('qqq',this.props.sample)
    // console.log(element);
        return _.map(element[this.props.match.params.id].comments, (comment, key) => {
            console.log(comment);
            if (comment.SAP === this.props.match.params.sap){
                return (
                <div key={key} className="alert alert-warning alert-dismissible fade show">
                    <strong>{key}</strong>
                    <p>{comment.processinput}</p>
                    <p>{comment.EmpNo}</p>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                );
            }
        });
    }

    renderSelect(){

        const element = {}
    element[this.props.match.params.id]={
      ...this.props.sample
    }

            return(
                <div className="form-group">
                <label>Process</label>
                <select className="form-control" name="processinput" defaultValue="" onChange={this.handleChange} value={this.state.processinput}>
                    <option value="" disabled="disabled">กรุณาระบุ Process</option>
                    {
                        _.map(element,(comps,keys)=>{
                            console.log('x',keys,comps);
                            return(
                                _.map(comps['ComponentPart'],(comp,key)=>{
                                console.log('y',key,comp);
                                if(comp['SAP'] === this.props.match.params.sap ||
                                comp['PartNo'] === this.props.match.params.sap){
                                        console.log('yeah',comp['Process'])
                                        return(
                                        comp['Process'].map(x => {return(<option key={x} processinput={x}>{x}</option>)})
                                        )
                                    }
                                })
                            )
                        })
                    }

                </select>
                </div>
            )
    }

    render(){
        return(
            <div className='container-fluid'>
            <div className='row'>
            <form onSubmit={this.handleSubmit}>
                
                    <div className='col-sm-12 mt-3'>
                       <h2>{this.props.match.params.id}</h2>
                       <div className="form-group">
                            <label>Part No.</label>
                            <input type="text" className="form-control" value={this.props.match.params.sap} readOnly/>
                        </div>
                        {this.renderSelect()}
                        <div className="form-group">
                            <label>Emp No.</label>
                            <input type="text" className="form-control" name="EmpNo" onChange={this.handleChange} value={this.state.EmpNo} required/>
                        </div>
                        <button className='btn btn-success'>Confirm</button>
                    </div>
                
            </form>
            <div className='col-sm-6 mt-3'>
                {this.renderComments()}
            </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        sample: state.samples[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps,{saveComment})(ProcessInput);