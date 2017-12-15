import axios from "axios";

export function addMarker(event) {
  return (dispatch) => {
    axios.get("http://cors.vschool.io?url=https://maps.googleapis.com/maps/api/geocode/json?address=" + event.address.replace(" ", "+") + "&key=AIzaSyAiWpQMcon-r5OaM-wSADTmhA3ZNju17ZQ").then((response) => {
      event.lat = response.data.results[0].geometry.location.lat;
      event.lng = response.data.results[0].geometry.location.lng;
      dispatch({
        event,
        type: "ADD_MARKER"
      });
    }).catch(err => {
      console.log(err);
    });
  }
}

export default function reducer(prevState = [], action) {
  switch(action.type) {
    case "ADD_MARKER":
      return [...prevState, action.event];
    default:
      return prevState;
    }
}
