import axios from "axios";

export function getLocalEvents() {
  return (dispatch) => {
    axios.get("/events").then(response => {
      let localEvents = response.data;
      dispatch({
        type: "GET_LOCAL_EVENTS",
        localEvents
      })
    })
  }
}

export function addEvent(event) {
  console.log(event);
  let addressName = event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].state.stateCode + ", " + event._embedded.venues[0].postalCode;
  return {
    type: "ADD_EVENT",
    id: event.id,
    name: event.name,
    date: event.dates.start.localDate,
    address: {
      name: addressName,
      location: {
        lat: event._embedded.venues[0].location.latitude,
        lng: event._embedded.venues[0].location.longitude
      }
    },
    url: event.url,
    imgUrl: event.images[0].url
  }
}

export default function reducer(prevState = [], action) {
  switch(action.type) {
    case "ADD_EVENT":
      return [...prevState, action];
    case "GET_LOCAL_EVENTS":
      return [...action.localEvents]
    default:
      return prevState;
  }
}
