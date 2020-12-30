import React , {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class SampleLotDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            // ReceiveDate : new Date(Math.floor(Date.now()/1000)*1000),
            ReceiveDate : this.formatDate(Date.now()),
            // LotNo : this.props.sample.LotNo,
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
        this.formatDate = this.formatDate.bind(this);

    }

    formatDate(ts){
        var date_not_formatted = new Date(ts);
        var formatted_string = date_not_formatted.getFullYear() + "-";
    
        if (date_not_formatted.getMonth() < 9) {
          formatted_string += "0";
        }
        formatted_string += (date_not_formatted.getMonth() + 1);
        formatted_string += "-";
    
        if(date_not_formatted.getDate() < 10) {
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getDate();
        formatted_string += " ";
    
        if(date_not_formatted.getHours() < 10){
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getHours();
        formatted_string += ":";
    
        if(date_not_formatted.getMinutes() < 10){
          formatted_string += "0";
        }
        formatted_string += (date_not_formatted.getMinutes());
        formatted_string += ":";
    
        if(date_not_formatted.getSeconds() < 10){
          formatted_string += "0";
        }
        formatted_string += date_not_formatted.getSeconds();
    
        return(formatted_string);
    }

    handlerChange(e){
        this.setState({
          [e.target.name] : e.target.value.trim()
        })
    }

    handlerComponentPartChange(e,key){
        const { ComponentPart } = this.state;
        // this.setState(prevState => ({
        //         ComponentPart:{
        //             ...prevState.ComponentPart,
        //             [key]:{
        //                 ...prevState.ComponentPart[key],
        //                     [e.target.name] : e.target.value.trim()
        //             }
        //         }
        //     })
        // )
        this.setState({
            ComponentPart:{
                ...ComponentPart,
                [key]:{
                    ...ComponentPart[key],
                        [e.target.name] : e.target.value.trim()
                }
            }
        })
        console.log(ComponentPart);
    }

    renderForm(){
        const {sample} = this.props;
        return _.map(sample.ComponentPart,(samp,key)=>{
            return(
                <div key={key} className='col-12'>
                    <div className='form-group'>
                        <div className='card mt-2'>
                            <div className='card-header'>{key}</div>
                                <div className='card-body'>
                                {
                                    _.map(samp,(comp,subkey)=>{
                                        const {ComponentPart} = this.state;
                                        if (subkey ==='Process' || subkey ==='BOM'){
                                            return(
                                            <div key={subkey} className='form-group row'>
                                                <label className='col-sm-3 col-form-label'>{subkey}</label>
                                                <div className='col-sm-9'>
                                                    <textarea
                                                    rows='6'
                                                    type='text'
                                                    className='form-control'
                                                    name={subkey}
                                                    onChange={(e) => this.handlerComponentPartChange(e,key)}
                                                    value={ComponentPart[key][subkey]}
                                                />
                                                </div>
                                            </div>
                                            )
                                        }else{
                                           return(
                                            <div key={subkey} className='form-group row'>
                                                <label className='col-sm-3 col-form-label'>{subkey}</label>
                                                <div className='col-sm-9'>
                                                    <input
                                                    type='text'
                                                    className='form-control'
                                                    name={subkey}
                                                    onChange={(e) => this.handlerComponentPartChange(e,key)}
                                                    value={ComponentPart[key][subkey]}
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
                        {/* <div className='col-6'>
                            <div className="form-group">
                                <label>Lot No.</label>
                                <input
                                    onChange={this.handlerChange}
                                    value={this.state.LotNo}
                                    type="text"
                                    className="form-control"
                                    placeholder="ล็อตงาน"
                                    name="LotNo"
                                    required
                                    />
                            </div>
                        </div> */}
                        {this.renderForm()}
                    </div>
                </div>
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