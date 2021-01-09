// https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import { formatDate } from "../actions/Actions";
import { saveComment } from "../actions/sampleActions";

class ProcessInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            DateComment : Date.now(),
            processinput : '',
            Ok : 0,
            EmpNo : '',
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
            DateComment : this.state.DateComment,
            processinput : this.state.processinput,
            Ok : this.state.Ok,
            EmpNo : this.state.EmpNo
        }
        this.props.saveComment(this.props.match.params.id,this.props.match.params.sap,sampleInput);                
        this.setState({
            DateComment : 0,
            processinput : '',
            Ok : 0,
            EmpNo : ''
        })
    }

    renderComments() {
        const element = {}
    element[this.props.match.params.id]={
      ...this.props.sample
    }

        return _.map(element[this.props.match.params.id].comments, (comment, key) => {
            console.log(comment);
            if (key === this.props.match.params.sap){
                return (
                <div key={comment.DateComment} className="alert alert-warning alert-dismissible fade show">
                    <strong>{formatDate(comment.DateComment)}</strong>
                    <p>{comment.processinput}</p>
                    <p>OK : {comment.Ok} Pcs.</p>
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
            <select className="form-control" name="processinput" onChange={this.handleChange} value={this.state.processinput}>
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
                            <label>OK (Pcs.)</label>
                            <input type="number" className="form-control" name="Ok" onChange={this.handleChange} value={this.state.Ok} min="0" required/>
                        </div>
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