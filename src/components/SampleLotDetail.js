import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import _ from 'lodash';

class SampleLotDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            ReceiveDate : this.props.sample.ReceiveDate,
            Model: this.props.sample.Model,
            Customer : this.props.sample.Customer,
            IssueDate: this.props.sample.IssueDate,
            DueDate : this.props.sample.DueDate,
            ComponentPart : this.props.sample.ComponentPart,
            Finish: false
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerComponentPartChange = this.handlerComponentPartChange.bind(this);
        // this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerChange(e){
        this.setState({
          [e.target.name] : e.target.value.trim()
        })
    }

    handlerComponentPartChange(e,key,bool){
        const { ComponentPart } = this.state;
        if (bool === 'false'){
           this.setState({
                ComponentPart:{
                    ...ComponentPart,
                    [key]:{
                        ...ComponentPart[key],
                            [e.target.name] : e.target.value.trim()
                    }
                }
            }) 
        }else{
            this.setState({
                ComponentPart:{
                    ...ComponentPart,
                    [key]:{
                        ...ComponentPart[key],
                            [e.target.name] : e.target.value.trim().split('\n')
                    }
                }
            }) 
        }
        // console.log(ComponentPart);
    }

    renderForm(){
        const {sample} = this.props;
        console.log(sample)
        return _.map(sample.ComponentPart,(samp,key)=>{
            return (
                <div key={key} className='col-12'>
                    <div className='form-group'>
                        <div className='card mt-2'>
                            <div className='card-header'>{key}</div>
                                <div className='card-body'>
                                {
                                    _.map(samp,(comp,subkey)=>{
                                        const {ComponentPart} = this.state;
                                        if (subkey ==='Process' || subkey ==='BOM'){
                                            return (
                                            <div key={subkey} className='form-group row'>
                                                <label className='col-sm-3 col-form-label'>{subkey}</label>
                                                <div className='col-sm-9'>
                                                    <textarea
                                                    rows='6'
                                                    type='text'
                                                    className='form-control'
                                                    name={subkey}
                                                    onChange={(e) => this.handlerComponentPartChange(e,key,'true')}
                                                    value={ComponentPart[key][subkey]}
                                                    required
                                                />
                                                </div>
                                            </div>
                                            )
                                        }else if(subkey ==='Qty'){
                                            return (
                                            <div key={subkey} className='form-group row'>
                                                <label className='col-sm-3 col-form-label'>{subkey}</label>
                                                <div className='col-sm-9'>
                                                    <input
                                                    type='number'
                                                    className='form-control'
                                                    name={subkey}
                                                    onChange={(e) => this.handlerComponentPartChange(e,key,'false')}
                                                    value={ComponentPart[key][subkey]}
                                                    required
                                                />
                                                </div>
                                            </div>
                                            )
                                        }
                                        else{
                                           return(
                                            <div key={subkey} className='form-group row'>
                                                <label className='col-sm-3 col-form-label'>{subkey}</label>
                                                <div className='col-sm-9'>
                                                    <input
                                                    type='text'
                                                    className='form-control'
                                                    name={subkey}
                                                    onChange={(e) => this.handlerComponentPartChange(e,key,'false')}
                                                    value={ComponentPart[key][subkey]}
                                                    required
                                                />
                                                </div>
                                            </div>
                                            ) 
                                        }
                                    })
                                }
                                </div>
                            </div>
                    </div>
                </div>
            )
        });
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-6'>
                        {this.renderForm()}
                    </div>
                </div>
                <hr/>
                    <Link to='/all'>Back</Link>
            </div>
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