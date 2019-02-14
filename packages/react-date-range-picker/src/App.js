import React, { Component } from 'react';
import DateRangePicker from './components/DateRangePicker';

class App extends Component {

  state = {
    value: [
      new Date(), new Date()
    ]
  }

  render() {
    return (
      <DateRangePicker
        timePicker
        value={this.state.value}
        onChange={selection => this.setState({
          value: selection
        })}
      />
    );
  }
}

export default App;
