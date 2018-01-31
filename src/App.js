import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlPanel app={this} />
        <MapContainer app={this} />
      </div>
    );
  }
}

export default App;
