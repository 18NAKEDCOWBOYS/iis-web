import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'
import { FaRegClock } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa"
import { FaArrowLeft } from "react-icons/fa"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Styles from "../css/AuctionDetailPage.module.css"
import { useState } from 'react';
import { UseUserContext } from "../userContext";

import { ImageSlider } from "react-simple-gallery"
import "react-simple-gallery/dist/index.css"
function BidFormOpenedAuc() {
    //TODO zobrazit erory
    return (
        <>
            <Form style={{ paddingTop: 25 }}>
                <InputGroup className="mb-3">
                    <FormControl style={{ maxWidth: 250 }}
                        placeholder="Výše nabídky"
                        aria-label="Výše nabídky"
                        aria-describedby="basic-addon1"
                        type="number"
                    />
                    <InputGroup.Text id="basic-addon1">CZK</InputGroup.Text>
                </InputGroup>
                <div>
                    <Button variant="primary" type="submit">Odeslat nabídku</Button>
                </div>
            </Form>
        </>
    )
}
function BidFormClosedAuc(props) {
    return (<Form style={{ paddingTop: 25 }}>
        {props.BidPriceEditing ? 
        <InputGroup className="mb-3">
            <FormControl style={{ maxWidth: 250 }}
                placeholder="Nová cena"
                aria-label="Nová cena"
                aria-describedby="basic-addon1"
                value={props.BidPrice}
                onChange={(e) => { props.setBidPrice(e.target.value) }}
                type="number"
                disabled={!props.BidPriceEditing}
            />
            <InputGroup.Text id="basic-addon1">CZK</InputGroup.Text>
        </InputGroup> :
        <p><strong>Vaše nabídka:</strong> {props.LastBidPrice =="" ? ("Zatím jste nezadal žádnou nabídku") : (props.LastBidPrice + " Kč")}  </p>}
        <div>
            {props.BidPriceEditing ?
                <>
                    <Button variant="primary" onClick={() => { props.setBidPriceEditing(false); props.setLastBidPrice(props.BidPrice); }}>Potvrdit novou nabídku</Button>{' '}
                    <Button variant="secondary" onClick={() => { props.setBidPriceEditing(false); props.setBidPrice(props.LastBidPrice) }}>Zrušit</Button>
                </>
                :
                <>
                    <Button variant="primary" onClick={() => props.setBidPriceEditing(true)}>Upravit nabídku</Button>
                </>

            }
        </div>
    </Form>)
}

function AuctioneerControlButtons(props) {
    if (props.User.id == props.auctioneer_id && Date.now() >= props.end_time) {
        return (
            <div style={{ flex: 0.3, padding: 35 }}>
                <Button variant="primary">Ukončit a určit výherce</Button>
            </div>
        )
    }
    return null
}


function ItemPrice(props) {
    let result;
    if (!props.is_open || props.state_id == 0) {
        result = "Vyvolávací cena: " + props.price + " Kč"
    }
    else {
        result = "Aktuální cena: " + "MILION" + + " Kč"//TODO vytahnout z db nejvyssi nabidku
    }
    return (
        <div className={Styles.priceStyle}>{result}</div>
    )
}

function BidForm(props) {
    //TODO musi byt registrovany v aukci
    if (props.UserLogged) {
        if (props.state_id == 1 && Date.now() > props.start_time && Date.now() < props.end_time) {
            if (props.is_open) {
                return (<BidFormOpenedAuc />)
            }
            else {
                return (<BidFormClosedAuc {...props} />)
            }
        }
    }
    return null
}




export default function AuctionDetailPage(props) {



    const [BidPriceEditing, setBidPriceEditing] = useState(false)
    const [LastBidPrice, setLastBidPrice] = useState("")  //TODO iniciovat last bid moji nabídkou
    const [BidPrice, setBidPrice] = useState("")
    const { setIsLoggedIn, User, IsLoggedIn, setUser } = UseUserContext()
    let auctions = [
        {
            "id": 0,
            "name": "Aukce A",
            "is_demand": true,
            "is_open": true,
            "price": 12354,
            "author_id": 1,
            "auctioneer_id": 2,
            "start_time": new Date(2021, 12, 20, 10, 0, 0, 0),
            "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png", "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg", "https://pbs.twimg.com/media/E12BaOYXMAQeV9a.jpg", "https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/13F00/production/_95146618_bills.jpg"],
            "winner_id": null,
            "state_id": 1, //schvaleno
            "min_bid": 250,
            "max_bid": null

        },
        {
            "id": 1,
            "name": "Aukce B",
            "is_demand": true,
            "is_open": false,
            "price": 56489,
            "author_id": 0,
            "auctioneer_id": null,
            "start_time": null,
            "end_time": null,
            "description": "Zbytečná aukce",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": null,
            "state_id": 0, //zalozeno
            "min_bid": 20,
            "max_bid": null
        },
        {
            "id": 2,
            "name": "Aukce C",
            "is_demand": true,
            "is_open": true,
            "price": 169,
            "author_id": 0,
            "auctioneer_id": 2,
            "start_time": new Date(2021, 7, 20, 10, 0, 0, 0),
            "end_time": new Date(2020, 10, 2, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": 1,
            "state_id": 5, //znam vitez,
            "min_bid": 250,
            "max_bid": null
        },
        {
            "id": 3,
            "name": "Aukce D",
            "is_demand": true,
            "is_open": false,
            "price": 5613,
            "author_id": 0,
            "auctioneer_id": 2,
            "start_time": new Date(2021, 10, 18, 10, 0, 0, 0),
            "end_time": new Date(2021, 10, 22, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": null,
            "state_id": 1, //probihajici
            "min_bid": 250,
            "max_bid": null
        },
        {
            "id": 4,
            "name": "Aukce E",
            "is_demand": false,
            "is_open": true,
            "price": 5613,
            "author_id": 0,
            "auctioneer_id": 1,
            "start_time": new Date(2021, 10, 17, 10, 0, 0, 0),
            "end_time": new Date(2021, 10, 18, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": null,
            "state_id": 1, //schvalena
            "min_bid": 250,
            "max_bid": null
        }
    ]
    const { auctionId } = useParams()
    let auction = auctions.find(item => item.id === Number(auctionId)) //TODO vybrat z DB

    //create images objects array
    let imagesGallerySrc = [];
    for (let i in auction.photos) {
        imagesGallerySrc[i] = { "src": auction.photos[i] }
    }


    return (
        <>
            <NavigationBar />
            <Container className="mainContainer">
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.7 }}>
                        <h1 style={{ paddingBottom: 0 }}>{auction.name}</h1>
                        <h4 style={{ paddingBottom: 25 }}>{(auction.is_demand ? "Poptávková aukce" : "Nabídková aukce")}</h4>
                    </div>
                    <AuctioneerControlButtons User={User} {...auction} />
                </div>
                <Container style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, paddingRight: 100, width: 300, height: 300 }}>
                        <ImageSlider data={imagesGallerySrc} style={{ width: 500 }} />
                    </div>


                    <div style={{ flex: 1 }}>
                        <p>{auction.description}</p>
                        <ItemPrice {...auction} />
                        <div className={Styles.auctionInfoItem}>Konec aukce: {auction.state_id == 0 ? "Neurčen" : auction.end_time.toLocaleString('cs-CZ')}</div>
                        <div className={Styles.auctionInfoItem}>Typ: {auction.is_demand ? "Poptávková" : "Nabídková"}</div>
                        <div className={Styles.auctionInfoItem}>Pravidla: {auction.is_open ? "Otevřená" : "Uzavřená"}</div>

                        <BidForm {...auction} UserLogged={IsLoggedIn} User={User} BidPriceEditing={BidPriceEditing} setBidPriceEditing={setBidPriceEditing} LastBidPrice={LastBidPrice}
                            setLastBidPrice={setLastBidPrice} BidPrice={BidPrice} setBidPrice={setBidPrice} />

                    </div>
                </Container>
            </Container>
        </>
    )
}

