import './App.css';
import React from 'react'
import { Route, Redirect, Switch, useLocation } from "react-router-dom";


import Accueil from "./component/accueil/Accueil";
import Pays from "./component/pays/pays";
import Map from "./component/map/map";
import Contact from "./component/contact/contact";
import { Navbar, Nav } from "react-bootstrap";


const App = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Traqueur Covid-19</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/pays">Pays</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
          {/*<Nav.Link href="/contact">Contact</Nav.Link>*/}
        </Nav>

      </Navbar>



      <Switch location={location} key={location.key}>
        <Route exact path="/">
          <Accueil />
        </Route>
        <Route path="/pays">
          <Pays />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>




    </div>

  )

}

export default App;
