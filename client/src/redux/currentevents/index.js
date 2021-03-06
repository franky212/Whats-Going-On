import axios from "axios";

export function getEvents(search) {
  return (dispatch) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?0&keyword=${search}&countryCode=US&size=20&apikey=klv4vudES1FBzSdOy2xaaSgrqhMJxFc6`).then((response) => {
      let currentEvents;
      if(response.data.page.totalElements > 0) {
        currentEvents = response.data._embedded.events;
      } else {
        currentEvents = [];
      }
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
