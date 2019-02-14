import React, { Component } from 'react';
import DateRangePicker from './components/DateRangePicker';

class App extends Component {

  state = {
    singlePickerValue: new Date(),
    rangePickerValue: [
      new Date(), new Date()
    ]
  }

  render() {
    return (
      <>
        <h3>Single Picker</h3>
        <DateRangePicker
          singleDatePicker
          timePicker
          value={this.state.singlePickerValue}
          onChange={selection => this.setState({
            singlePickerValue: selection
          })}
        />
        <h3>Range Picker</h3>
        <DateRangePicker
          timePicker
          value={this.state.rangePickerValue}
          onChange={selection => this.setState({
            rangePickerValue: selection
          })}
        />
      </>
    );
  }
}

export default App;
