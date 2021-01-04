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

  // const array = [];
  // try {
  //   for (const [keys,obj] of Object.entries(props['props'])) {
  //     var s,t,u,v,w = '';
  //     console.log(keys,obj);
  //       if(keys !== null){
  //         s = keys
  //         // console.log(s);
  //       }
  //     for(const [key,values] of Object.entries(obj)){
  //       console.log(key,values);
  //       const element = {}

  //       if(key === 'ReceiveDate'){
  //         t = values
  //         // console.log(t);
  //       }

  //       if(key === 'DueDate'){
  //         u = values
  //         // console.log(u);
  //       }

  //       if(key === 'ComponentPart'){
  //         for(const [key,value] of Object.entries(obj['ComponentPart'])){
  //             v = key
  //           for(const [e_key,e_value] of Object.entries(value)){
  //             if(e_key==='SAP' && e_value!=='-'){
  //               w = e_value;
  //             }else if(e_key==='PartNo' && e_value!=='-'){
  //               w = e_value;
  //             }
  //           }
  //         }
  //       }

  //       element[v] = [s,t,u,v,w];
  //       array.push( element );
  //       console.log(`${url}/process/${s}/${w}`)

  //     }
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  // console.log(array);

  return (

    <div className="print-container" ref={ref}>
      {
      <div className="row">
        <div className="col-sm-6 mt-3">
          <div className="card">

              <div className="media m-2">
                <QRCode value={`${url}/process/${''}/${''}`} style={{padding:10}} />
                <div className="media-body mt-2">
                  <h6>LotNo : {} ({})</h6>
                  <p>
                    SAPNo : {}
                    <br/>
                    ReceiveDate : {}
                    <br/>
                    DueDate : {}
                  </p>
                </div>
              </div>

          </div>
        </div>
      </div>
      }
    </div>
  );

});

export default ComponentToPrint;
