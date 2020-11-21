import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Columns from 'react-columns';
import { Route, Router, Switch } from "react-router-dom";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
function Pays() {

    const [results, setResults] = useState([]);

    const [searchCountries, setSearchCountries] = useState("");
    useEffect(() => {

        axios.get("https://corona.lmao.ninja/v3/covid-19/countries")

            .then(responseArr => {
                setResults(responseArr.data);

            })
            .catch(err => {
                console.log(err)
            })
    }, []);




    const filterCountries = results.filter((item) => {
        return searchCountries !== ""
            ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
            : item;
    });



    const countries = filterCountries.map((data, i) => {


        return (


            <Card
                key={i}
                bg="light"
                text="dark"
                className="text-center"
                border="primary"
                style={{ width: '26rem', margin: "10px" }}


            >

                <Card.Body >

                    <Card.Title>
                        {data.country}
                    </Card.Title>

                    <Card.Img style={{ width: '15rem' }} variant="top" src={data.countryInfo.flag} />


                    <Card.Text>
                        Cas confirmés: {data.cases}
                    </Card.Text >
                    <Card.Text>
                        Cas confirmés aujourd'hui : {data.todayCases}
                    </Card.Text>
                    <Card.Text>
                        Guérisons : {data.recovered}
                    </Card.Text>
                    <Card.Text>
                        Actifs : {data.active}
                    </Card.Text>
                    <Card.Text>
                        État critique : {data.critical}
                    </Card.Text>
                    <Card.Text>
                        Population : {data.population}
                    </Card.Text>
                    <Card.Text>
                        Continent : {data.continent}
                    </Card.Text>


                </Card.Body >
            </Card >


        )


    })



    var queries = [{
        columns: 2,
        query: 'min-width: 500px'
    }, {
        columns: 3,
        query: 'min-width: 1000px'
    }];

    return (

        <div>
            <Navbar Navbar Navbar bg="dark" variant="dark" >

                <Form inline>
                    <Form.Control style={{ align: 'center', width: '20rem', margin: "10px" }} type="text" placeholder="Rechercher un pays" onChange={(e => setSearchCountries(e.target.value))} />
                </Form>
            </Navbar >
            <div>
                <Columns queries={queries}>
                    {countries}
                </Columns>
            </div>


        </div>






    )

}

export default Pays;
