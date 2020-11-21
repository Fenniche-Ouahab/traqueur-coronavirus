import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom";

import Accueil from "./../accueil/Accueil";
import Pays from "./../pays/pays";
import Map from "./../map/map";
import Contact from "./../contact/contact";
import { Navbar, Nav } from "react-bootstrap";
export default function navbar() {

    return (

        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Traqueur Covid-19</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/pays">Pays</Nav.Link>
                    <Nav.Link href="/map">Map</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>

            </Navbar>
            <Switch>
                <Route exact path="/" component={Accueil} />
                <Route exact path="/pays" component={Pays} />
                <Route exact path="/map" component={Map} />
                <Route exact path="/contact" component={Contact} />
            </Switch>


        </Router>



    )
}
