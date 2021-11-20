import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'
import { FaRegClock } from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa"
import {FaArrowLeft} from "react-icons/fa"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Styles from "../css/AuctionDetailPage.module.css"
import { useState } from 'react';
import { UseUserContext } from "../userContext";
function submitForm(type, auction, newPrice) {
    if (type == "demandPrice") {


        //TODO odeslat novou cenu a stahnout znovu objekt aukce

    }
}
function AddBidForm(auction) {
    return (
        <>

            <Form style={{ paddingTop: 25 }}>
                <InputGroup className="mb-3">
                    <FormControl style={{ maxWidth: 250 }}
                        placeholder={auction.rules == "Otevřená" ? "Výše příhozu" : "Výše nabídky"}
                        aria-label={auction.rules == "Otevřená" ? "Výše příhozu" : "Výše nabídky"}
                        aria-describedby="basic-addon1"
                        type="number"
                    />
                    <InputGroup.Text id="basic-addon1">CZK</InputGroup.Text>
                </InputGroup>
                <div>
                    <Button variant="primary" type="submit">{auction.rules == "Otevřená" ? "Přihodit" : "Nabídnout"}</Button>
                </div>
            </Form>
        </>
    )

}

export default function AuctionDetailPage(props) {
    const {setIsLoggedIn, User, IsLoggedIn, setUser} = UseUserContext()
    let auctions = [
        {
          "id":0,
          "name": "Aukce A",
          "is_demand": false,
          "is_open": true,
          "price": 12354,
          "author_id": 1,
          "auctioneer_id": 2,
          "start_time":  new Date(2021, 12, 20, 10, 0, 0, 0),
          "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
          "description": "Skvělá aukce o věc v hodnotě milionů!",
          "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png", "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg", "https://pbs.twimg.com/media/E12BaOYXMAQeV9a.jpg", "https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/13F00/production/_95146618_bills.jpg"],
          "winner_id": null,
          "state_id":1, //schvaleno
          "min_bid": 250,
          "max_bid": null
    
        },
        {
          "id":1,
          "name": "Aukce B",
          "is_demand": true,
          "is_open": false,
          "price": 56489,
          "author_id": 0,
          "auctioneer_id":null,
          "start_time":  null,
          "end_time": null,
          "description": "Zbytečná aukce",
          "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
          "winner_id": null,
          "state_id":0, //zalozeno
          "min_bid": 20,
          "max_bid": null
        },
        {
          "id":2,
          "name": "Aukce C",
          "is_demand": true,
          "is_open": true,
          "price": 169,
          "author_id": 0,
          "auctioneer_id": 2,
          "start_time":  new Date(2021, 7, 20, 10, 0, 0, 0),
          "end_time": new Date(2020, 10, 2, 10, 0, 0, 0),
          "description": "Skvělá aukce o věc v hodnotě milionů!",
          "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
          "winner_id": 1,
          "state_id":5, //znam vitez,
          "min_bid": 250,
          "max_bid": null
        },
        {
          "id":3,
          "name": "Aukce D",
          "is_demand": false,
          "is_open": true,
          "price": 5613,
          "author_id": 0,
          "auctioneer_id": 2,
          "start_time":  new Date(2021, 11, 18, 10, 0, 0, 0),
          "end_time": new Date(2021, 11, 22, 10, 0, 0, 0),
          "description": "Skvělá aukce o věc v hodnotě milionů!",
          "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
          "winner_id": null,
          "state_id":3, //probihajici
          "min_bid": 250,
          "max_bid": null
        },
        {
          "id":4,
          "name": "Aukce D",
          "is_demand": false,
          "is_open": true,
          "price": 5613,
          "author_id": 0,
          "auctioneer_id": null,
          "start_time":  null,
          "end_time": null,
          "description": "Skvělá aukce o věc v hodnotě milionů!",
          "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
          "winner_id": null,
          "state_id":2, //zamitnuto
          "min_bid": 250,
          "max_bid": null
        }
      ]
    const { auctionId } = useParams()

    let auction = auctions.find(item => item.id === Number(auctionId))

    const [DemandPriceEditing, setDemandPriceEditing] = useState(false)
    const [DemandPrice, setDemandPrice] = useState(auction.price)

    const [currentPrice, setcurrentPrice] = useState(auction.price)
    const [ImgIndex, setImgIndex] = useState(0)
    return (
        <>
            <NavigationBar />
            <Container className="mainContainer">
                <h1>{auction.type + ' - ' + auction.name}</h1>
                <Container style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1, position:"relative" }}>
                        <FaArrowRight className={Styles.iconRight} onClick={()=>{setImgIndex((ImgIndex+1)%auction.photos.length)}}/>
                        <FaArrowLeft  className={Styles.iconLeft} onClick={()=>{setImgIndex((ImgIndex-1) < 0 ? auction.photos.length-1 : ImgIndex-1)}}/>
                        <Image style={{width:550, height:300}} src={auction.photos[ImgIndex]} className={Styles.galleryImg} thumbnail  />
                    </div>


                    <div style={{ flex: 1 }}>
                        <p>{auction.description}</p>
                        {!auction.is_demand && <div style={{ color: "#0d6efd", fontSize: 25, fontWeight: 600 }}>{auction.is_open ? "Aktuální cena:" : "Vyvolávací cena:"} {auction.price} Kč</div>}

                        <div className={Styles.auctionInfoItem}>Konec aukce: {auction.end_time.toLocaleString('cs-CZ')}</div>
                        <div className={Styles.auctionInfoItem}>Typ: {auction.is_demand? "Poptávková" : "Nabídková"}</div>
                        {auction.is_demand && <div className={Styles.auctionInfoItem}>Kontakt na poptávajícího: bohus@email.cz</div>}
                        {!auction.is_demand && <div className={Styles.auctionInfoItem}>Pravidla: {auction.is_open ? "Otevřená" : "Uzavřená"}</div>}
                        {!auction.is_demand ?
                            //form prihozeni nabidka
                            <>
                                <AddBidForm auction={auction} />
                            </>
                            :
                            //user = author => price edit form
                            <>

                                {User.userId == auction.author_id ?
                                    <>
                                        <Form style={{ paddingTop: 25 }}>
                                            <InputGroup className="mb-3">
                                                <FormControl style={{ maxWidth: 250 }}
                                                    placeholder="Nová cena"
                                                    aria-label="Nová cena"
                                                    aria-describedby="basic-addon1"
                                                    value={DemandPrice}
                                                    onChange={(e) => { setDemandPrice(e.target.value) }}
                                                    type="number"
                                                    disabled={!DemandPriceEditing}
                                                />
                                                <InputGroup.Text id="basic-addon1">CZK</InputGroup.Text>
                                            </InputGroup>
                                            <div>
                                                {DemandPriceEditing ?
                                                    <>
                                                        <Button variant="primary" onClick={() => { setDemandPriceEditing(false); setcurrentPrice(DemandPrice) }}>Potvrdit novou cenu</Button>{' '}
                                                        <Button variant="secondary" onClick={() => { setDemandPriceEditing(false); setDemandPrice(currentPrice) }}>Zrušit</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button variant="primary" onClick={() => setDemandPriceEditing(true)}>Upravit cenu</Button>
                                                    </>

                                                }
                                            </div>
                                        </Form>
                                    </>
                                    :
                                    //user != author, show price
                                    <>
                                        {auction.type == "Poptávka" && <div style={{ color: "#0d6efd", fontSize: 25, fontWeight: 600 }}>Cena {auction.price} Kč</div>}
                                    </>
                                }

                            </>

                        }
                    </div>
                </Container>
            </Container>
        </>
    )
}

