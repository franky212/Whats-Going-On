import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import events from "./events";
import currentEvents from "./currentevents";
import localEvents from "./localevents";

const rootReducer = combineReducers({
  events,
  currentEvents,
  localEvents
});

export default createStore(rootReducer, applyMiddleware(thunk));
