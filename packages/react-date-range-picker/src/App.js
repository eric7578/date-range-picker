import React, { Component } from 'react';
import './App.css';
import DateRangePicker from './components/DateRangePicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DateRangePicker selections={[new Date(), new Date()]} />
      </div>
    );
  }
}

export default App;
