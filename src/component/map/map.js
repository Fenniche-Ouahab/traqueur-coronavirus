import GoogleMapReact from 'google-map-react';

import React, { useEffect, useState } from "react";
import axios from "axios";

function MapPays() {
    const [resultsMap, setResultsMap] = useState([]);

    useEffect(() => {

        axios.get("https://corona.lmao.ninja/v3/covid-19/countries")

            .then(responseArr => {
                setResultsMap(responseArr.data);

            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    const positionPays = resultsMap.map((data, i) => {
        return (
            <div
                lat={data.countryInfo.lat}
                lng={data.countryInfo.long}
                style={{
                    color: "white",
                    background: "orange",
                    height: "25px",
                    width: "60px",
                    textAlign: "center",
                    borderRadius: "30%",
                }}>

                <img height="10px" src={data.countryInfo.flag}></img>
                <br />
                {data.cases}

                {/* <div
                    style={{
                        color: "red",
                        background: "#FFF",
                        height: "25px",
                        width: "50px",
                        textAlign: "center"
                    }}>

                    décès : {data.deaths}</div> */}
            </div >

        )
    })
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyC6mgDTbJpPF0mzswqxLf5WHinLEEBwDsU" }}
                defaultCenter={{ lat: 28, lng: 3 }}
                defaultZoom={5}
            >
                {positionPays}
            </GoogleMapReact>
        </div>
    )
}



export default MapPays;
