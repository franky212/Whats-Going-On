import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import events from "./events";
import currentEvents from "./currentevents";

const rootReducer = combineReducers({
  events,
  currentEvents
});

export default createStore(rootReducer, applyMiddleware(thunk));
