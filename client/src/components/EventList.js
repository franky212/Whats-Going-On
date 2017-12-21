import React, {Component} from "react";
import {connect} from "react-redux";
import {addEvent} from "../redux/localevents";
import {getEvents} from "../redux/currentevents";
import {addMarker} from "../redux/events";
import {Grid, Row, Col, FormControl, Button, Alert} from "react-bootstrap";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      isSuccessShown: false,
      isWarningShown: false,
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentEvents.length >= 0) {
      this.setState({
        loading: false
      })
    }
  }

  handleClick(event) {
    let isFound = false;
    for(let i = 0; i < this.props.localEvents.length; i++) {
      if(this.props.localEvents[i].id === event.id) {
        isFound = true;
      }
    }
    if(isFound) {
      this.setState({
        isWarningShown: true
      });
      setTimeout(() => {
        this.setState({
          isWarningShown: false
        })
      }, 2000)
    } else {
      this.props.addEvent(event);
      this.setState({
        isSuccessShown: true
      })
      setTimeout(() => {
        this.setState({
          isSuccessShown: false
        })
      }, 2000)
    }
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    })
    this.props.getEvents(this.state.search);
  }

  render() {
    let listItems;
    if(this.state.loading) {
      listItems = <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>;
    } else {
      listItems = this.props.currentEvents.map((event) => {
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
    }
    return (
      <div>
        {this.state.isSuccessShown ? <Alert className="alert" bsStyle="success"> <strong>({this.props.localEvents.length}) Event Added to map!</strong> <p>You should go check it out!</p></Alert> : null}
        {this.state.isWarningShown ? <Alert className="alert" bsStyle="danger"> <strong>Sorry you can't add the same event to the map!</strong></Alert> : null}
        <Grid className="grid">
          <Col xs={12}>
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
          </Col>
          {listItems}
        </Grid>
    </div>
    )
  }
}

export default connect(state => state, {addMarker, getEvents, addEvent})(EventList);
