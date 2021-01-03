// https://stackoverflow.com/questions/63704325/how-to-print-a-component-in-react
// https://codepen.io/SteveJRobertson/pen/POdvgz
import React ,{forwardRef}from 'react';
import QRCode from "qrcode.react";
// import _ from 'lodash';

const ComponentToPrint = forwardRef((props, ref) => {
  const url = 'http://192.168.1.246:3000'
  // console.log(url);
  console.log(props['props'])
  let s,t,u,v,w = ''
  try {
    for (const [keys,obj] of Object.entries(props['props'])) {
    // console.log(lotNo);
    console.log(keys,obj);
      if(keys !== null){
        s = keys
        console.log(s);
      }
    for(const [key,values] of Object.entries(obj)){
      console.log(key,values);
      if(key === 'ReceiveDate'){
        t = values
        console.log(t);
      }
      if(key === 'DueDate'){
        u = values
        console.log(u);
      }
      if(key === 'ComponentPart'){
        for(const [key,value] of Object.entries(obj['ComponentPart'])){
            v = key
          for(const [e_key,e_value] of Object.entries(value)){
            if(e_key==='SAP'){
              w = e_value;
            }
          }
        }
      }
    }
  }
  // console.log(`${url}/process/${s}/${v}`)
  } catch (error) {
    console.error(error);
  }
  

  return (
    <div className="print-container" ref={ref}>
      <div className="row">
        <div className="col-sm-6 mt-3">
          <div className="card">

              <div className="media">
                <QRCode value={`${url}/process/${s}/${w}`} style={{padding:10}} />
                <div className="media-body mt-2">
                  <h6>LotNo : {s} ({v})</h6>
                  <p>
                    SAPNo : {w}<br/>
                    ReceiveDate : {t}<br/>
                    DueDate : {u}
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );

});

export default ComponentToPrint;
