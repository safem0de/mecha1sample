import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { getSamples } from "../actions/sampleActions";
import _ from "lodash";

class ProcessInput extends Component{

    constructor(props){
        super(props);

        this.renderSelect = this.renderSelect.bind(this);
    }

    renderSelect(){
        console.log(this.props.match.params.id);

        // console.log();
        return (
            <div className="form-group">
                <label>Process</label>
                <select className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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

export default connect(mapStateToProps,{getSamples})(ProcessInput);