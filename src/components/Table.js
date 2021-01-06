import React from 'react';
import { getSamples } from "../actions/sampleActions";
import { connect } from "react-redux";

class Table extends React.Component {
    
    constructor(props){
        super(props)

        this.renderSample = this.renderSample.bind(this);
    }

    renderSample(){
        const { samples } = this.props;
        console.log(samples)
        return(
            <table className="table table-sm table-hover text-center">
            <thead className="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">LotNo</th>
                <th scope="col">IssueDate</th>
                <th scope="col">ReceiveDate</th>
                <th scope="col">DueDate</th>
                <th scope="col">shaft (status)</th>
                <th scope="col">rotor ass'y (status)</th>
                <th scope="col">stator stack (status)</th>
                <th scope="col">front flange (status)</th>
                <th scope="col">rear flange (status)</th>
                <th scope="col">cover (status)</th>
                <th scope="col">follow up!</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr> */}
                
                {
                    Object.entries(samples).map(([key,value],index)=>{
                        console.log(key,value,index,value['ComponentPart'],value['comments'])
                        let sh,rt,st,ff,rf,cv = null

                        if (value['ComponentPart']!==undefined){
                            for(const [k,v] of Object.entries(value['ComponentPart'])){
                                console.log('x',k,v)
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
                            for(const [k,v] of Object.entries(value['comments'])){
                                console.log('y',k,v)
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
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            
        )
    }
    
    render(){
        return(
        <div className='container-fluid'>
            test
            {this.renderSample()}
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