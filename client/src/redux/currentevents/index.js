import axios from "axios";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
}
if(mm<10){
  mm='0'+mm
}

let currentDate = yyyy+'-'+mm+'-'+dd;

export function getEvents() {
  return (dispatch) => {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?page=1&size=200&startDateTime${currentDate}countryCode=US&apikey=D3Gkc7pF33x7oLfZn57RuRZNZsFpQNp5`).then((response) => {
      let currentEvents = response.data._embedded.events;
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
