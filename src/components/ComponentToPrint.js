// https://stackoverflow.com/questions/63704325/how-to-print-a-component-in-react
// https://codepen.io/SteveJRobertson/pen/POdvgz
import React ,{forwardRef}from 'react';
import QRCode from "qrcode.react";
import _ from 'lodash';

const ComponentToPrint = forwardRef((props, ref) => {
  const url = 'http://10.121.49.157:3000'
  // const url = 'http://192.168.1.246:3000'
  // console.log(url);
  console.log(props['props'])

  const renderQr = () => {
    return(
      <div>
        <div className="row">
          <div className="col-sm-6 mt-3">
      {
        _.map(props['props'],(comps,keys)=>{
          console.log(keys,comps)
          return(
            _.map(comps['ComponentPart'],(comp,key)=>{
              let x =''
              console.log('CompPart',key,comp);
              console.log('x',comp['SAP']);
              if(comp['SAP']==='-'){
                x = comp['PartNo']
              }else{
                x = comp['SAP']
              }
              return (

                    <div className="card m-3">
                    <div className="media m-2">
                      <QRCode value={`${url}/process/${keys}/${x}`} style={{padding:10}} />
                      <div className="media-body mt-2">
                        <h6>LotNo : {keys} ({key})</h6>
                        <p>
                          SAPNo : {x}
                          <br/>
                          ReceiveDate : {comps['ReceiveDate']}
                          <br/>
                          DueDate : {comps['DueDate']}
                        </p>
                      </div>
                    </div>
                  </div>
                  )
                }
              )
            )
          }
        )
      }
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="print-container" ref={ref}>
    {renderQr()}
    </div>
  )

});

export default ComponentToPrint;
