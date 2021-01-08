// https://codesandbox.io/s/zwxo5l6jvl?file=/src/LineDemo.js
// https://github.com/reactchartjs/react-chartjs-2/issues/388
import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { getSampleGraph } from "../actions/sampleActions";
import { connect } from 'react-redux';

class SampleChart extends Component {
  
  render() {
    const {chart} = this.props
    const options = {
      layout: {
        padding: {
          bottom: 0,
          top: 0
        }
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            min: 0,
            stepSize: 1
          },
            }],
      },
          responsive: true,
            legend: {
              display: true,
              position: 'right',
              labels: {
                fontColor: '#91929b',
                padding: 20
              }
            }
      };

    return (
      <div className='container-fluid'>
        <div className='container'>
          <h2>Sample Summary</h2>
          <Bar ref="chart" data={chart} options={options}/>
        </div>
        <Footer>
        <div className='col-sm-auto'>
          <Link to='/login'>Go to Login</Link>
        </div>

        <div className='col-sm-auto'>
            <Link to='/table'>Go to Sample Situation</Link>
        </div>
        </Footer>
      </div>
    );
  }
}
function mapStateToProps(state,ownProps){
  return{
      chart : state.chart
  }
}

export default connect(mapStateToProps,{getSampleGraph})(SampleChart);