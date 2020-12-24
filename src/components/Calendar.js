import React,{ Component } from 'react';
import {Inject, ScheduleComponent,Day,Week,WorkWeek,Month,Agenda} from '@syncfusion/ej2-react-schedule';
// import {DataManager,WebApiAdaptor} from '@syncfusion/ej2-data'

class Calendar extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      data:[{
            Id: 1,
            Subject: 'SESH3332',
            StartTime: '2020-12-01',
            EndTime: '2020-12-01',
            IsAllDay : true
        }, {
            Id: 2,
            Subject: 'SEB0600',
            StartTime: '2020-12-01',
            EndTime: '2020-12-01',
            IsAllDay : true
        }, {
            Id: 3,
            Subject: 'SEA1234',
            StartTime: '2020-12-02',
            EndTime: '2020-12-02',
            IsAllDay : true
        }, {
            Id: 4,
            Subject: 'SEN2754',
            StartTime: '2020-12-02',
            EndTime: '2020-12-02',
            IsAllDay : true

        }]
      }
}

//   remoteData = new DataManager({
//     url:'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
//     adaptor: new WebApiAdaptor,
//     crossDomain: true
//   })

  render(){
    return(
      <ScheduleComponent height='700px' currentView='Month' eventSettings={{ dataSource: this.state.data }} rowAutoHeight={true}>
        {/* eventSettings={{dataSource:this.remoteData}} */}
        <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
      </ScheduleComponent>
    );
  }
}

export default Calendar;