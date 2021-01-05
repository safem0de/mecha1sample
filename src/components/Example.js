import React from 'react';
import ReactToPrint from 'react-to-print';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ComponentToPrint  from './ComponentToPrint';

class Example extends React.PureComponent {

  render() {

    const element = {}
    element[this.props.match.params.id]={
      ...this.props.sample
    }

    const pStyle = `
      @page {
        size: 75mm 25mm;
      }

      @media all {
        .pagebreak {
          display: none;
        }
      }

      @media print {
        .pagebreak {
          page-break-before: always;
        }
      }
    `;

    return (
      <div className='container-fluid'>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button className='btn btn-warning my-2'>Print this out!</button>;
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint
          ref = {el => (this.componentRef = el)}
          props = {element}
          pageStyle={pStyle}
          />
        <hr/>
            <Link to='/all'>Back</Link>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps){
  return{
      sample : state.samples[ownProps.match.params.id],
      uid : state.user.uid
  }
}

export default connect(mapStateToProps)(Example);