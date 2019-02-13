import React, { Component } from 'react';
import './App.css';
import DateRangePicker from './components/DateRangePicker';

class App extends Component {

  state = {
    value: [
      new Date(), new Date()
    ]
  }

  render() {
    return (
      <div className="App">
        <DateRangePicker
          timePicker
          value={this.state.value}
          onChange={selection => this.setState({
            value: selection
          })}
        />
      </div>
    );
  }
}

export default App;
