// https://stackoverflow.com/questions/63704325/how-to-print-a-component-in-react
// https://codepen.io/SteveJRobertson/pen/POdvgz
import React ,{forwardRef}from 'react';
import QRCode from "qrcode.react";
import _ from 'lodash';

const ComponentToPrint = forwardRef((props, ref) => {
  const url = 'https://mecha1sample-lpb.web.app/'
  console.log(props['props'])

  const renderQr = () => {
    return(
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
                <div className="col-sm-6" key={x}>
                    <div className="card mt-3">
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
                  </div>
                )
              }
            )
          )
        }
      )
    )
  }

  return (
    
    <div className="print-container" ref={ref} >
      <div className="row">
      {renderQr()}
      </div>
    </div>
  )

});

export default ComponentToPrint;
