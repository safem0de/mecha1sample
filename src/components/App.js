import React, { Component } from 'react';
// import { Example } from './Example';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        ReceiveDate : new Date(Math.floor(Date.now()/1000)*1000),
        LotNo :'',
        Model:'',
        Customer : '',
        IssueDate:'',
        DueDate : '',
        ComponentPart : {},
        BOM : {},
        Process : []
    }
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.textToArray = this.textToArray.bind(this);
  }

  handlerChange(e){
    this.setState({
      [e.target.name] : e.target.value.trim()
    })
  }

  handlerSubmit(e){

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
            }
        }
      }
    } catch (error) {
      alert(error);
    }
    this.setState({ComponentPart:element})
  }

  render(){
    return(
      <form>
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
            <div className='card'>
              <div className='card-header'>
                test
              </div>
              <div className='card-body'>

              </div>
            </div>
          </div>

        </div>
      </div>
      </form>
    )
  }
}

export default App;
