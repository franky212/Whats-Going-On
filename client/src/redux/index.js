import {combineReducers} from "redux";

import events from "./events";
import currentEvents from "./currentevents";

export default combineReducers({
  events,
  currentEvents
});
