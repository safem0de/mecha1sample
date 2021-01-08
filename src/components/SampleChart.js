// https://codesandbox.io/s/zwxo5l6jvl?file=/src/LineDemo.js
// https://github.com/reactchartjs/react-chartjs-2/issues/388
import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { getSampleGraph } from "../actions/sampleActions";
import { connect } from 'react-redux';

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

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Receive',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },{
        label: 'Confirm',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [60, 59, 80, 77, 56, 55, 35]
      },{
        label: 'Shipment',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(192,168,1,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 77, 81, 56, 55, 47]
      }
  ]
};
class SampleChart extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='container'>
          <h2>Sample Summary</h2>
          <Bar ref="chart" data={data} options={options}/>
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

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);

    this.props.getSampleGraph('January');
  }
}


export default connect(null,{getSampleGraph})(SampleChart);