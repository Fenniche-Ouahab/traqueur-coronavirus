import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Columns from 'react-columns';
import './pays.css';
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
            <div className="container" col-md-4>
                <Card key={i}
                    bg="secondary"
                    text="white"
                    style={{ width: '18rem' }}>
                    <Card.Header>
                        <Card.Title>       {data.country}    </Card.Title>
                        <Card.Img style={{ padding: '5px', width: '5rem' }} variant="top" src={data.countryInfo.flag} /></Card.Header>
                    <Card.Body>

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

                    </Card.Body>
                </Card>
                <br />
            </div>
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
            <br />
            <div class="box">
                <div class="container-4">
                    <input type="search" id="search" placeholder="Rechercher un pays..." onChange={(e => setSearchCountries(e.target.value))} />
                </div>
            </div>

            <br />
            <div>
                <Columns queries={queries}>
                    {countries}
                </Columns>
            </div>


        </div>
    )

}

export default Pays;
