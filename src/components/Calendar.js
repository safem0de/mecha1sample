import React,{ Component } from 'react';
import {getSamples} from '../actions/sampleActions';
import {connect} from 'react-redux';
import {Inject, ScheduleComponent,Day,Week,WorkWeek,Month,Agenda} from '@syncfusion/ej2-react-schedule';

class Calendar extends Component{
  
  constructor(props) {
    super(props);
    const row = []
    const {samples} = this.props;

    var count = 0
    for (const [key, value] of Object.entries(samples)) {
      console.log(`${key}: ${value}`);
      row.push({
        Id : count +1,
        Subject: key,
        StartTime: value.DueDate,
        EndTime: value.DueDate,
        IsAllDay : true
      })
      count++;
    }
    console.log(row);
    this.state = {
      data : row
    }
  }

  render(){
    return(
      <ScheduleComponent height='auto' currentView='Month' eventSettings={{ dataSource: this.state.data }} rowAutoHeight={true}>
        <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
      </ScheduleComponent>
    );
  }
}

function mapStateToProps(state) {
  return{
    samples : state.samples
  }
}

export default connect(mapStateToProps,{getSamples})(Calendar);