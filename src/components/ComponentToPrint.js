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
    return _.map(props['props'],(comp,key)=>{
      console.log(key,comp)
    });
  }

  return (
    
    // <div className="print-container" ref={ref}>
    //   <div className="row">
    //     <div className="col-sm-6 mt-3">
    //       <div className="card">

    //           <div className="media m-2">
    //             <QRCode value={`${url}/process/${''}/${''}`} style={{padding:10}} />
    //             <div className="media-body mt-2">
    //               <h6>LotNo : {} ({})</h6>
    //               <p>
    //                 SAPNo : {}
    //                 <br/>
    //                 ReceiveDate : {}
    //                 <br/>
    //                 DueDate : {}
    //               </p>
    //             </div>
    //           </div>

    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>{renderQr()}</div>
  )

});

export default ComponentToPrint;
