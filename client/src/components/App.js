import React from "react";
import MapComponent from "./MapComponent";
import Header from "./Header";
import {Switch, Route} from "react-router-dom";
import SetUp from "./SetUp";
import Home from "./Home";
import EventList from "./EventList";


export default function App(props) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/EventList" component={EventList} />
        <Route path="/setUp" component={SetUp} />
        <Route path="/MapComponent" component={MapComponent} />
      </Switch>
    </div>
  )
}
