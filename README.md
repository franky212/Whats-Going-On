This is a React / Redux project incorporating multiple APIs (TicketMaster, Google Maps, Google Geocoding).

This project was made when I was attending V School for Javascript Web Development, and I'm
currently in the process of redesigning / recoding this and working on new, better projects as well.

It was made using the create-react-app CLI, and I've now moved on to making my own front end
development environments with Webpack / other Automation Tools.

# Installation

To get this project working please head into the /client path, and execute an install through NPM.

```
npm install
```

Now that all of the necessary dependencies are installed you can run this command

```
npm run start
```

# Notes

The Node/Express server side of this is uncompleted as I didn't have enough time in the bootcamp to finish. My plan was to create a way for users to create accounts, and for event managers to create event accounts and be able to add events to the database. As well as be able to send users emails with QR codes for event entry. I will be working on this as time goes on.

All React components are connected via Redux to the global store for easy data management. The reducers are all trying to not permanently mutate data as I add to it.

As far as styling goes I did use react-bootstrap when it first was in alpha at the time of my attendance to the bootcamp. I will be recreating this environment using Webpack to use React, and SASS. I could possibly use different styling solutions such as style-components, or CSS Modules.

This also uses a google-maps-react package for the Google Map. MapContainer contains all React code associated with it. 

# MapContainer.js

## state

The state for the map component contains a flag to know when to show the InfoWindow component, and when to hide it. 

```
this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
```

## render

At time of render I check to see if there are any markers that the user has currently pinned on the map, and I provide those markers' positions in latitude and longitude. I also place a click event on the marker that handles showing the events details as well as a way for the user to buy a ticket from Ticket Master in the InfoWindow component.

I then return the Map component from google-maps-react which needs initial setup and properties. The InfoWindow component takes children passed to render the information given.

```
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
            <img width="100%" src={this.state.selectedPlace.imgUrl} alt=""/>
            <div className="infobox-container">
              <p className="infobox-text">{this.state.selectedPlace.description}</p>
            </div>
            <a target="_blank" href={this.state.selectedPlace.src} className="infobox-button">Buy Tickets</a>
          </div>
        </InfoWindow>
      </Map>
    )
  }
```