import React, {Component} from "react";
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";
import {connect} from "react-redux";
import {getEvents} from "../redux/currentevents";

const styles = {
  width: "100vw",
  height: "86.5%"
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {

    const marker = this.props.currentEvents.map((event) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={event.id}
          position={{lat: event._embedded.venues[0].location.latitude, lng: event._embedded.venues[0].location.longitude}}
          name={event.name}
          src={event.url}
          date={event.dates.start.localDate}
          description={event.description}/>)
    });

    return (
      <Map
        google={this.props.google}
        style={styles}
        initialCenter= {{
          lat: 40.7608,
          lng: -111.8910
        }}
        zoom={6}
        onClick={this.onMapClicked}
        styles={[{
          featureType: "poi",
          stylers: [
            { visibility: "off" }
          ]}]}>

        {marker}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onOpen={this.windowHasOpened}
          onClose={this.onInfoWindowClose}>
          <div>
            <h1 className="infobox-header">{this.state.selectedPlace.name}</h1>
            <h3 className="infobox-subheading">Date: {this.state.selectedPlace.date}</h3>
            <iframe title="Artist Video" width="560" height="315" src={this.state.selectedPlace.src} frameBorder="0"></iframe>
            <div className="infobox-container">
              <p className="infobox-text">{this.state.selectedPlace.description}</p>
            </div>
            <a target="_blank" href={this.state.selectedPlace.src} className="infobox-button">Buy Tickets</a>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

const reduxMap = connect(state => state, {getEvents})(MapContainer)

export default GoogleApiWrapper({
  apiKey: "AIzaSyA5T5nkMVdT_LDRubQIEm_gEtsq9U_LTZM"
})(reduxMap)
