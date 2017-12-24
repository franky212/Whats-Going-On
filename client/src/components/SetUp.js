import React, {Component} from "react";
import {FormControl, Button, ControlLabel} from "react-bootstrap";
import {connect} from "react-redux";
import {addMarker} from "../redux/mapmarker";

class SetUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      date: "",
      address: "",
      url: "",
      description: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMarker(this.state);
  }

  render() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    }
    if(mm<10){
      mm='0'+mm
    }

    let currentDate = yyyy+'-'+mm+'-'+dd;

    return (
      <form onSubmit={this.handleSubmit} className="setup-form">
        <ControlLabel>Event Title</ControlLabel>
        <FormControl
          value={this.state.title}
          onChange={this.handleInputChange}
          bsSize="large"
          name="name"
          type="text"
          placeholder="Enter Event Title" required/>
        <ControlLabel>Event Date</ControlLabel>
        <FormControl
          value={this.state.date}
          onChange={this.handleInputChange}
          bsSize="large"
          name="date"
          type="date"
          min={currentDate}
          placeholder="Enter Event Title" required/>
        <ControlLabel>Event Address</ControlLabel>
        <FormControl
          value={this.state.address}
          onChange={this.handleInputChange}
          bsSize="large"
          name="address"
          type="text"
          placeholder="Enter Event Address" required/>
        <ControlLabel>Youtube Embed URL</ControlLabel>
        <FormControl
          value={this.state.youUrl}
          onChange={this.handleInputChange}
          bsSize="large"
          name="youUrl"
          type="text"
          placeholder="Enter iframe of Artist" required/>
        <ControlLabel>Event Description</ControlLabel>
        <FormControl
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
          componentClass="textarea"
          placeholder="Description"/>
        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
          block>Submit</Button>
      </form>
    )
  }
}

export default connect(state => state, {addMarker})(SetUp)
