import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'
import { FaRegClock } from "react-icons/fa";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Styles from "../css/AuctionDetailPage.module.css"
import { useState } from 'react';

function submitForm(type, auction, newPrice) {
    if (type == "demandPrice") {


        //TODO odeslat novou cenu a stahnout znovu objekt aukce

    }
}
function addBidForm(auction) {
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
}

export default function AuctionDetailPage(props) {
    const loggedUser = {
        "userId": 2
    }
    let auctions = [
        {

            "id": 0,
            "name": "Aukce A",
            "type": "Nabídka",
            "rules": "Otevřená",
            "price": 12354,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": true,
            "auctioneer_id": 2,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
            "author_id": 1
        },
        {
            "id": 1,
            "name": "Aukce B",
            "type": "Nabídka",
            "rules": "Uzavřená",
            "price": 50,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": false,
            "auctioneer_id": undefined,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "end_time": new Date(2021, 11, 8, 11, 30, 0, 0),
            "author_id": 2

        },
        {
            "id": 2,
            "name": "Aukce C",
            "type": "Poptávka",
            "rules": "Otevřená",
            "price": 542133,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": false,
            "auctioneer_id": 2,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
            "author_id": 2

        },
        {
            "id": 3,
            "name": "Aukce D",
            "type": "Nabídka",
            "rules": "Otevřená",
            "price": 2,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": true,
            "auctioneer_id": 1,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "end_time": new Date(2022, 1, 2, 22, 0, 0, 0),
            "author_id": 0

        },
        {
            "id": 4,
            "name": "Aukce E",
            "type": "Poptávka",
            "rules": "Uzavřená",
            "price": 7823,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": false,
            "auctioneer_id": undefined,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "end_time": new Date(2021, 11, 19, 11, 12, 40, 0),
            "author_id": 0

        }]
    const { auctionId } = useParams()

    let auction = auctions.find(item => item.id === Number(auctionId))

    const [DemandPriceEditing, setDemandPriceEditing] = useState(false)
    const [DemandPrice, setDemandPrice] = useState(auction.price)

    const [currentPrice, setcurrentPrice] = useState(auction.price)
    return (
        <>
            <NavigationBar />
            <Container className="mainContainer">
                <h1>{auction.type + ' - ' + auction.name}</h1>
                <Container style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ flex: 1 }}>
                        <Image src={auction.images[0]} thumbnail />
                    </div>


                    <div style={{ flex: 1 }}>
                        <p>{auction.description}</p>
                        {auction.type == "Nabídka" && <div style={{ color: "#0d6efd", fontSize: 25, fontWeight: 600 }}>{auction.rules == "Otevřená" ? "Aktuální cena:" : "Vyvolávací cena:"} {auction.price} Kč</div>}

                        <div className={Styles.auctionInfoItem}>Konec aukce: {auction.end_time.toLocaleString('cs-CZ')}</div>
                        <div className={Styles.auctionInfoItem}>Typ: {auction.type}</div>
                        {auction.type == "Poptávka" && <div className={Styles.auctionInfoItem}>Kontakt na poptávajícího: bohus@email.cz</div>}
                        {auction.type == "Nabídka" && <div className={Styles.auctionInfoItem}>Pravidla: {auction.rules}</div>}
                        {auction.type == "Nabídka" ?
                            //form prihozeni nabidka
                            <>
                                <addBidForm auction={auction} />
                            </>
                            :
                            //user = author => price edit form
                            <>
                            
                                {loggedUser.userId == auction.author_id ? 
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

