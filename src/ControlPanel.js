import React, { Component } from 'react';
import './ControlPanel.css';

class ControlPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: "",
      date: new Date()
    };
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
  }

  handleChange(event) {
    let newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div className="ControlPanel">
        <div className="form-control">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input name="search"
                   onChange={this.handleChange.bind(this)}
                   placeholder="Where do you want to go?" />
          </form>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
