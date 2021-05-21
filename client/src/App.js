import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from './pages/create_room/CreateRoom';
import Room from './pages/room/Room';


function App() {
  return (
    <BrowserRouter>
    <Switch>
        <Route path = "/" exact component = {CreateRoom}></Route>
        <Route path = "/room/:roomID" component = {Room}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
