import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";

class ProcessInput extends Component{

    constructor(props){
        super(props);

        this.renderSelect = this.renderSelect.bind(this);
    }

    renderSelect(){
        const {sample} = this.props;
        // console.log(sample);

            return(
                <div className="form-group">
                <label>Process</label>
                <select className="form-control">
                    {
                        _.map(sample['ComponentPart'],(comps,keys)=>{
                            console.log(keys,comps);
                            if(comps['SAP']===this.props.match.params.sap || comps['SAP']===this.props.match.params.sap){
                                console.log('yeah');
                                return(<option>1</option>)
                            }
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
    };
}

export default connect(mapStateToProps)(ProcessInput);