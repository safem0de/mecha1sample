// https://stackoverflow.com/questions/42526032/how-to-find-if-element-with-specific-id-exists-or-not
import React from 'react';
import Footer from './Footer'
import { getSamples } from "../actions/sampleActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import XLSX from "xlsx";

class Table extends React.Component {

    constructor(props){
        super(props)

        this.renderSample = this.renderSample.bind(this);
        this.exportFile = this.exportFile.bind(this);
    }

    exportFile() {
        console.log('Download Click')
        var myEle = document.getElementById('tableau');
        if(myEle){
            var workbook = XLSX.utils.table_to_book(document.getElementById('tableau'));
            XLSX.writeFile(workbook, 'sample.xlsb');
        }
    }

    renderSample(){

        return(
            <div className="table-responsive">
            <table className="table table-sm table-hover text-center" id='tableau'>
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">LotNo</th>
                <th scope="col">Zone</th>
                <th scope="col">IssueDate</th>
                <th scope="col">ReceiveDate</th>
                <th scope="col">DueDate</th>
                <th scope="col">Shaft<br/>(status)</th>
                <th scope="col">Rotor ass'y<br/>(status)</th>
                <th scope="col">Stator stack<br/>(status)</th>
                <th scope="col">Front flange<br/>(status)</th>
                <th scope="col">Rear flange<br/>(status)</th>
                <th scope="col">Cover<br/>(status)</th>
                <th scope="col">Follow up!</th>
                </tr>
            </thead>
            <tbody>
                {

                }
            </tbody>
            </table>
            </div>
        )
    }
    render(){
        return(
        <div className='container-fluid'>
            <h3>Sample Situation</h3>
            {this.renderSample()}
            <Footer>

                <div className='col-sm-auto'>
                    <Link to='/login'>Go to Login</Link>
                </div>

                <div className='col-sm-auto'>
                    <Link to='/chart'>Go to Chart</Link>
                </div>

                <div className='col-sm-auto ml-auto'>
                    <button
                        className='btn btn-info'
                        onClick={this.exportFile}
                    >Download</button>
                </div>

            </Footer>
        </div>
        )
    }
}

function mapStateToProps(state,ownProps){
    return{
        samples : state.samples,
    }
}
export default connect(mapStateToProps,{getSamples})(Table);