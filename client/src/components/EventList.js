import React, {Component} from "react";
import {connect} from "react-redux";
import {addEvent} from "../redux/localevents";
import {getEvents} from "../redux/currentevents";
import {addMarker} from "../redux/events";
import {Grid, Row, Col, FormControl, Button} from "react-bootstrap";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.addEvent(event);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getEvents(this.state.search);
  }

  render() {
    const listItems = this.props.currentEvents.map((event) => {
      return (
        <Row key={event.id}>
          <Col xs={12}>
            <div onClick={() => this.handleClick(event)} className="event-card">
              <h2 className="event-header">{event._embedded.venues[0].name}</h2>
              <h4>{event.name}</h4>
              <small>{event._embedded.venues[0].city.name}</small>
              <h5>{event.dates.start.localDate}</h5>
            </div>
          </Col>
        </Row>
      )
    });
    return (
      <div>
        <Grid className="grid">
          <form onSubmit={this.handleSubmit}>
            <FormControl
              className="search-bar"
              onChange={this.handleInputChange}
              name="search"
              placeholder="Search..." />
            <Button
              bsSize="large"
              className="search-button">Submit</Button>
          </form>
          {listItems}
        </Grid>
    </div>
    )
  }
}

export default connect(state => state, {addMarker, getEvents, addEvent})(EventList);
