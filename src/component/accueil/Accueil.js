import React, { useEffect, useState } from "react";

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from "axios";
import image from "../../images/covid.png";
import { Bar } from "react-chartjs-2";
import './accueil.css';
import { CanvasJSChart } from 'canvasjs-react-charts';
const Accueil = () => {

    const [latest, setLatest] = useState([]);

    useEffect(() => {

        axios.get("https://corona.lmao.ninja/v3/covid-19/all")
            .then(response => {
                setLatest(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    console.log(latest)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };



    const date = new Date((latest.updated));
    const lastUpdated = date.toLocaleDateString("fr-CA", options);
    /*const barChart = latest.cases ? (
        <Bar
            data={{
                labels: ["Cas Actifs", "Guérisons", "Décès"],
                datasets: [
                    {
                        label: "Ce graphique montre l'évolution du nombre total de cas de Covid-19 confirmés dans le monde, selon le statut",
                        backgroundColor: [
                            "rgba(0, 0, 255, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [latest.cases, latest.recovered, latest.deaths],
                    },
                ],
            }}
            options={{
                legend: { display: true },
                title: {
                    display: false
                },
            }}
        />
    ) : null;*/

    var total = latest.cases + latest.recovered + latest.deaths;


    const options2 = {

        theme: "light1",
        animationEnabled: true,
        exportFileName: "Evolution covid-19",
        exportEnabled: true,
        title: {
            text: "Ce graphique montre l'évolution du nombre total  de Covid-19  dans le monde"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints: [
                { y: (latest.cases * 100 / total), label: "Cas Actifs" },
                { y: (latest.deaths * 100 / total), label: "Décès" },
                { y: (latest.recovered * 100 / total), label: "Guérisons" },


            ]
        }]
    }


    return (

        <div className="container">

            <br />
            <h2 style={{ textAlign: "center" }}> Statistiques en direct de Covid-19</h2>
            <br />
            <div className="text">
                <div>
                    Se laver très régulièrement les mains, tousser ou éternuer dans son
                    coude ou dans un mouchoir, Utiliser un mouchoir à usage unique et le
                    jeter, Saluer sans se serrer la main, éviter les embrassades, portez
                    un masque, respectez la distanciation physique
          </div>

            </div>
            <img className="image" src={image} alt="COVID-19" />

            <br />


            <div className="card">
                <CardDeck>

                    <Card bg="warning" text={"white"} className="text-center" style={{ margin: "10px" }}>
                        <Card.Body>
                            <Card.Title>Cas confirmés</Card.Title>
                            <Card.Text>
                                {latest.cases}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small>Dernière mise à jour : {lastUpdated}</small>
                        </Card.Footer>
                    </Card>
                    <Card bg="success" text={"white"} className="text-center" style={{ margin: "10px" }}>
                        <Card.Body>
                            <Card.Title>Guérisons</Card.Title>
                            <Card.Text>
                                {latest.recovered}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small>Dernière mise à jour : {lastUpdated}</small>
                        </Card.Footer>
                    </Card>
                    <Card bg="danger" text={"white"} className="text-center" style={{ margin: "10px" }}>
                        <Card.Body>
                            <Card.Title>Décès</Card.Title>
                            <Card.Text>
                                {latest.deaths}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small>Dernière mise à jour : {lastUpdated}</small>
                        </Card.Footer>
                    </Card>
                </CardDeck>
                <br />
            </div>

            <div>
                <div className="pieChart">
                    <CanvasJSChart options={options2}
                    />
                </div>

            </div>



        </div >
    )
}
export default Accueil;
