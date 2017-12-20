import React, {Component} from "react";
import {GoogleApiWrapper, Map, Marker, InfoWindow} from "google-maps-react";
import {connect} from "react-redux";
import {getLocalEvents} from "../redux/localevents";

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

  render() {

    const marker = this.props.localEvents.map((event, i) => {
      return (
        <Marker
          onClick={this.onMarkerClick}
          key={event + i}
          position={{lat: event.address.location.lat, lng: event.address.location.lng}}
          name={event.name}
          imgUrl={event.imgUrl}
          src={event.url}
          date={event.date}
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
        zoom={5}
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
            <img width="100%" src={this.state.selectedPlace.imgUrl} />
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

const reduxMap = connect(state => state, {getLocalEvents})(MapContainer)

export default GoogleApiWrapper({
  apiKey: "AIzaSyA5T5nkMVdT_LDRubQIEm_gEtsq9U_LTZM"
})(reduxMap)
