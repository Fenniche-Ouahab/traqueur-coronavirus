import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip, MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import './map.css';

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

    return (

        <div>

            <h3 style={{ textAlign: "center" }}>Carte des cas</h3>
            <MapContainer
                style={{ height: "90vh", width: "100%" }}
                zoom={4}
                center={[36.5, 15]}
            >
                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {resultsMap.map((data, k) => {
                    //console.log(data['cases']);
                    //console.log(data['country'])
                    //console.log(data['countryInfo']['lat'])
                    return (

                        <CircleMarker
                            fillColor='red'
                            key={k}
                            center={[data['countryInfo']['lat'], data['countryInfo']['long']]}
                            radius={20 * Math.log(data['cases']) / 10}
                            fillOpacity={0.5}
                            stroke={false}
                        >
                            <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                                <img height="10px" alt="" src={data.countryInfo.flag}></img>

                                <span>{" " + data['country'] + " : " + " " + data['cases'] + " " + "cas"}</span>
                            </Tooltip>
                        </CircleMarker>
                    )
                })
                }
            </MapContainer>
        </div >
        /* <div style={{ height: '100vh', width: '100%' }}>
             <GoogleMapReact
                 bootstrapURLKeys={{ key: "AIzaSyC6mgDTbJpPF0mzswqxLf5WHinLEEBwDsU" }}
                 defaultCenter={{ lat: 28, lng: 3 }}
                 defaultZoom={5}
             >
                 {positionPays}
             </GoogleMapReact>
         </div>*/


    )

}

export default MapPays;