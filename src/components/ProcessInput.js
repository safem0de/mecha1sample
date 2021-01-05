import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";

class ProcessInput extends Component{

    constructor(props){
        super(props);
        // this.state = {
        //     ReceiveDate : this.props.sample.ReceiveDate,
        //     Model : this.props.sample.Model,
        //     Customer : this.props.sample.Customer,
        //     IssueDate : this.props.sample.IssueDate,
        //     DueDate : this.props.sample.DueDate,
        //     ComponentPart : this.props.sample.ComponentPart,
        //     Finish: this.props.sample.Finish
        // }

        this.renderSelect = this.renderSelect.bind(this);
    }

    renderSelect(){
        // const {sample} = this.props;
        // console.log(sample);

        const element = {}
    element[this.props.match.params.id]={
      ...this.props.sample
    }

            return(
                <div className="form-group">
                <label>Process</label>
                <select className="form-control">
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
                                        comp['Process'].map(x => {return(<option key={x}>{x}</option>)})
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
            <form>
                <div className='container-fluid'>
                    <div className='col-sm-4 mt-3'>
                       <h2>{this.props.match.params.id}</h2>
                       <div className="form-group">
                            <label>Part No.</label>
                            <input type="text" className="form-control" value={this.props.match.params.sap} readOnly/>
                        </div>
                        {this.renderSelect()}
                        <div className="form-group">
                            <label>Emp No.</label>
                            <input type="text" className="form-control" required/>
                        </div>
                        <button className='btn btn-success'>Confirm</button>
                    </div>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        sample: state.samples[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps)(ProcessInput);