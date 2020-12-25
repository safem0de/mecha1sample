import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveSample } from '../actions/sampleActions';
import _ from 'lodash';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        // ReceiveDate : new Date(Math.floor(Date.now()/1000)*1000),
        ReceiveDate : this.formatDate(Date.now()),
        LotNo :'',
        Model:'',
        Customer : '',
        IssueDate:'',
        DueDate : '',
        ComponentPart : {},
    }
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.textToArray = this.textToArray.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(ts){
    var date_not_formatted = new Date(ts);
    var formatted_string = date_not_formatted.getFullYear() + "-";

    if (date_not_formatted.getMonth() < 9) {
      formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMonth() + 1);
    formatted_string += "-";

    if(date_not_formatted.getDate() < 10) {
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getDate();
    formatted_string += " ";

    if(date_not_formatted.getHours() < 10){
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getHours();
    formatted_string += ":";

    if(date_not_formatted.getMinutes() < 10){
      formatted_string += "0";
    }
    formatted_string += (date_not_formatted.getMinutes());
    formatted_string += ":";

    if(date_not_formatted.getSeconds() < 10){
      formatted_string += "0";
    }
    formatted_string += date_not_formatted.getSeconds();

    return(formatted_string);
  }

  renderLabel(){
    // const i = Object.values(this.state.ComponentPart)
    // const j = Object.keys(this.state.ComponentPart)

    return(
      <div className='card'>
          <div className='card-header'>
              <h3><b>Sample</b> : {this.state.LotNo}</h3>
          </div>
          <div className='card-body'>
              <p><b>Model : </b>{this.state.Model}</p>
              <p><b>Customer : </b>{this.state.Customer}</p>
              <p><b>IssueDate : </b>{this.state.IssueDate}</p>
              <p><b>RecieveDate : </b>{this.state.ReceiveDate}</p>
              <p><b>DueDate : </b>{this.state.DueDate}</p>
              {
                _.map(this.state.ComponentPart,(sample,key)=><p><b>{key} : </b>{sample.PartNo}</p>)
              }
          </div>
      </div>
    );
  }

  handlerChange(e){
    this.setState({
      [e.target.name] : e.target.value.trim()
    })
  }

  handlerSubmit(e){
    console.log('press submit');
    e.preventDefault();
    const sample = {
        ReceiveDate : this.state.ReceiveDate,
        LotNo : this.state.LotNo,
        Model: this.state.Model,
        Customer : this.state.Customer,
        IssueDate: this.state.IssueDate,
        DueDate : this.state.DueDate,
        ComponentPart : this.state.ComponentPart,
    }
    console.log(sample.LotNo);
    this.props.saveSample(sample,sample.LotNo);
      this.setState = {
        ReceiveDate : this.formatDate(Date.now()),
        LotNo :'',
        Model:'',
        Customer : '',
        IssueDate:'',
        DueDate : '',
        ComponentPart : {},
        BOM : {},
        Process : []
    }
  }

  textToArray(e){
    var element = {}
    var text = e.target.value;
    try {
        var array = text.split('\n'),i;
      console.log(array);
      for(i=0;i<array.length;i++){
        if(array[i]!==""){
          var x = array[i].split('		');
          var y = x[3].trim().split('	');
          console.log(y)
            element[x[0].trim()]={
              SAP:x[1].trim(),
              PartNo:x[2].trim(),
              Revision:y[0].trim(),
              Qty:parseInt(y[1].trim()),
              BOM:[],
              Process:[]
            }
        }
      }
    } catch (error) {
      alert('ใส่ข้อมูลไม่ครบถ้วน\n' + error);
      x = document.getElementsByName("ComponentPart");
      x[0].value = "";
    }
    this.setState({ComponentPart:element})
  }

  render(){
    return(
      <form onSubmit={this.handlerSubmit}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-8 mt-3'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className="form-group">
                  <label>Lot No.</label>
                  <input
                    onChange={this.handlerChange}
                    value={this.state.LotNo}
                    type="text"
                    className="form-control"
                    placeholder="ล็อตงาน"
                    name="LotNo"
                    required
                    />
                </div>
              </div>

              <div className='col-sm-4'>
                <div className="form-group">
                  <label>Model No.</label>
                  <input
                    onChange={this.handlerChange}
                    value={this.state.Model}
                    type="text"
                    className="form-control"
                    name="Model"
                    placeholder="โมเดลมอเตอร์"
                    required
                    />
                </div>
              </div>

              <div className='col-sm-4'>
                <div className="form-group">
                <label>Customer</label>
                <input
                  onChange={this.handlerChange}
                  value={this.state.Customer}
                  type="text"
                  className="form-control"
                  name="Customer"
                  placeholder="ชื่อลูกค้า"
                  required
                  />
                </div>
              </div>

            </div>

            <div className='row'>
              <div className='col-sm-4'>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input
                    onChange={this.handlerChange}
                    type="Date"
                    name = "IssueDate"
                    className="form-control"
                    required
                    />
                </div>
              </div>

              <div className='col-sm-4'>
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    onChange={this.handlerChange}
                    type="Date"
                    className="form-control"
                    name="DueDate"
                    required
                    />
                </div>
              </div>

            </div>

            <div className='row'>
              <div className='col-sm-12'>
                <div className="form-group">
                <label>Part Mecha2</label>
                <textarea
                  type="text"
                  onChange={this.textToArray}
                  name = "ComponentPart"
                  className="form-control"
                  placeholder=""
                  rows="7"
                  required
                  />
                  <small className="form-text text-muted">Copy Paste ข้อมูลจาก Excel file (Column B11:J15-16)</small>
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-4 mt-3'>
            {this.renderLabel()}
          </div>

        </div>
        <button type='submit' className='btn btn-success'>
          Submit
        </button>
      </div>
      </form>
    )
  }
}

function mapStateToProps(state,ownProps) {
  return{
    samples : state.samples
  }
}

export default connect(mapStateToProps,{saveSample})(App);
