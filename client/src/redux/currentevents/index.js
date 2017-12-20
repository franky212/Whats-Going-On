import axios from "axios";

export function getEvents(search) {
  return (dispatch) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?0&keyword=${search}&countryCode=US&size=200&apikey=klv4vudES1FBzSdOy2xaaSgrqhMJxFc6`).then((response) => {
      let currentEvents = response.data._embedded.events;
      console.log(currentEvents);
      dispatch({
        type: "GET_EVENTS",
        currentEvents
      })
    }).catch(err => {
      console.log(err);
    })
  }
}

export default function reducer(prevState = [], action) {
  switch(action.type) {
    case "GET_EVENTS":
      return [...action.currentEvents];
    default:
      return prevState;
    }
}
