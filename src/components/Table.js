import React from 'react';
import Footer from './Footer'
import { getSamples } from "../actions/sampleActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Table extends React.Component {
    
    constructor(props){
        super(props)

        this.renderSample = this.renderSample.bind(this);
    }

    renderSample(){
        const { samples } = this.props;
        // console.log(samples)
        return(
            <div class="table-responsive">
            <table className="table table-sm table-hover text-center">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">LotNo</th>
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
                    Object.entries(samples).map(([key,value],index)=>{
                        // console.log(key,value,index,value['ComponentPart'],value['comments'])
                        let sh,rt,st,ff,rf,cv,diff = null

                        function getDifferenceInDays(date1, date2) {
                            const diffInMs = Math.abs(date2 - date1);
                            return diffInMs / (1000 * 60 * 60 * 24);
                          }

                        if (value['DueDate']!==undefined){
                            const date1 = new Date(value['DueDate']);
                            const date2 = Date.now();
                            diff = Math.round(getDifferenceInDays(date1, date2));
                        }

                        if (value['ComponentPart']!==undefined){
                            for(const [k,v] of Object.entries(value['ComponentPart'])){
                                if (k === 'shaft' && v['SAP']!=='-'){
                                    sh = v['SAP']
                                    console.log(v)
                                }else if (k === 'shaft' && v['SAP']==='-'){
                                    sh = v['PartNo']
                                }

                                if (k === "rotor ass'y" && v['SAP']!=='-'){
                                    rt = v['SAP']
                                }else if (k === "rotor ass'y" && v['SAP']==='-'){
                                    rt = v['PartNo']
                                }

                                if (k === "stator stack" && v['SAP']!=='-'){
                                    st = v['SAP']
                                }else if (k === "stator stack" && v['SAP']==='-'){
                                    st = v['PartNo']
                                }

                                if (k === "front flange" && v['SAP']!=='-'){
                                    ff = v['SAP']
                                }else if (k === "front flange" && v['SAP']==='-'){
                                    ff = v['PartNo']
                                }

                                if (k === "rear flange" && v['SAP']!=='-'){
                                    rf = v['SAP']
                                }else if (k === "rear flange" && v['SAP']==='-'){
                                    rf = v['PartNo']
                                }

                                if (k === "cover" && v['SAP']!=='-'){
                                    cv = v['SAP']
                                }else if (k === "cover" && v['SAP']==='-'){
                                    cv = v['PartNo']
                                }
                            }
                        }
                        if (value['comments']!==undefined){
                            let arr = []
                            let sap
                            let process_arr = []
                            for(const [k,v] of Object.entries(value['comments'])){
                                arr.push(Date.parse(k));
                                process_arr.push(v['processinput']);
                                sap = v['SAP']
                            }

                            console.log('Date',arr);
                            console.log('process',process_arr);
                            var result = arr.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
                            console.log(process_arr[result]);

                            if(sh === sap){
                                sh += "\n("+ process_arr[result] +")"
                            }

                            if(rt === sap){
                                rt += "\n("+ process_arr[result] +")"
                            }

                            if(st === sap){
                                st += "\n("+ process_arr[result] +")"
                            }

                            if(ff === sap){
                                ff += "\n("+ process_arr[result] +")"
                            }

                            if(rf === sap){
                                rf += "\n("+ process_arr[result] +")"
                            }

                            if(cv === sap){
                                cv += "\n("+ process_arr[result] +")"
                            }
                        }
                        return(
                            <tr key={index+1}>
                                <th scope="row">{index+1}</th>
                                <td>{key}</td>
                                <td>{value['IssueDate']===null?'-':value['IssueDate']}</td>
                                <td>{value['ReceiveDate']===null?'-':value['ReceiveDate']}</td>
                                <td>{value['DueDate']===null?'-':value['DueDate']}</td>
                                <td>{sh===null?'-':sh}</td>
                                <td>{rt===null?'-':rt}</td>
                                <td>{st===null?'-':st}</td>
                                <td>{ff===null?'-':ff}</td>
                                <td>{rf===null?'-':rf}</td>
                                <td>{cv===null?'-':cv}</td>
                                <td>{diff<=1?'Urgent !!':diff +' Days left'}</td>
                            </tr>
                        )
                    })
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