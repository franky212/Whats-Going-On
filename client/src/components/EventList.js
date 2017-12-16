import React, {Component} from "react";
import {connect} from "react-redux";
import {getEvents} from "../redux/currentevents";
import {Grid, Row, Col, FormControl, Button} from "react-bootstrap";
import $ from "jquery";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
            <div className="event-card">
              <h2 className="event-header">{event._embedded.venues[0].name}</h2>
              <small>{event._embedded.venues[0].city.name}</small>
              <h4>{event.name}</h4>
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
              name="search"
              value= {this.state.search}
              onChange= {this.handleInputChange}
              placeholder="Search..."
              className="search-bar" />
            <Button
              type="submit"
              className="search-button">Search</Button>
          </form>
          {listItems}
        </Grid>
    </div>
    )
  }
}

export default connect(state => state, {getEvents})(EventList);
