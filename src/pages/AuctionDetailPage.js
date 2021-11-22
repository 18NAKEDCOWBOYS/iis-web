import React from 'react'
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Styles from "../css/AuctionDetailPage.module.css"
import { useState } from 'react';
import { UseUserContext } from "../userContext";
import SimpleImageSlider from "react-simple-image-slider";
import Table from 'react-bootstrap/Table';


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
    return (<Form>
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
            <p><strong>Vaše nabídka:</strong> {props.LastBidPrice == "" ? ("Zatím jste nezadal žádnou nabídku") : (props.LastBidPrice + " Kč")}  </p>}
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
        result = "Aktuální cena: " + "MILION" + " Kč"//TODO vytahnout z db nejvyssi nabidku
    }
    return (
        <div className={Styles.priceStyle}>{result}</div>
    )
}

function BidForm(props) {
    //TODO musi byt registrovany v aukci
    if (props.UserLogged) {
        if (props.User.id != props.auctioneer_id) {

            if (props.state_id == 1 && Date.now() > props.start_time && Date.now() < props.end_time) {
                if (props.is_open) {
                    return (<BidFormOpenedAuc />)
                }
                else {
                    return (<BidFormClosedAuc {...props} />)
                }
            }
        }
    }
    return null
}


function BidsHistory(props) {
    let bids = [
        {
            "name": "Jan",
            "surname": "Rychlý",
            "bid": "23542"
        },
        {
            "name": "Božena",
            "surname": "Smutná",
            "bid": "670"
        },
        {
            "name": "Bohuš",
            "surname": "Veselý",
            "bid": "550"
        }

    ]
    return (<>
        <Table striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Částka</th>
                </tr>
            </thead>
            <tbody>
                {bids.map(item => {
                    return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            <td>{item.bid} Kč</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </>
    )
}


function AuctionRegistrations(props) {
    let userRegistrations = [
        {
            "name": "Jan",
            "surname": "Rychlý",
            "approved": true
        },
        {
            "name": "Božena",
            "surname": "Smutná",
            "approved": true
        },
        {
            "name": "Bohuš",
            "surname": "Veselý",
            "approved": true
        },
        {
            "name": "Květoslav",
            "surname": "Novák",
            "approved": false
        }

    ]
    return (<>
        <Table striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    {(props.userLogged && props.User.role_id>=2)? <th>Stav registrace</th> : ""}
                    </tr>
            </thead>
            <tbody>
                {userRegistrations.map(item => {
                        return (<tr>
                            <td>{item.name}</td>
                            <td>{item.surname}</td>
                            {(props.UserLogged && props.User.role_id >= 2) ? <td>{item.approved ? "Registrace schválena" : <Button variant="primary">Schválit registraci</Button>}</td> : ""}
                        </tr>)
                    }
                )}
            </tbody>
        </Table>
    </>
    )
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
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sit amet consectetur adipiscing elit ut aliquam purus. Auctor elit sed vulputat.",
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
            "state_id": 2, //neschvalena
            "min_bid": 250,
            "max_bid": null
        }
    ]
    const { auctionId } = useParams()
    let auction = auctions.find(item => item.id === Number(auctionId)) //TODO vybrat z DB

    //create images objects array
    let imagesGallerySrc = [];
    for (let i in auction.photos) {
        imagesGallerySrc[i] = { "url": auction.photos[i] }
    }

    let overlay = auction.state_id == 2 || (auction.state_id == 1 && auction.start_time>Date.now())
    return (

        <>
            
            {auction.state_id == 2 && <span style={{color:"#dc3545"}} className={Styles.textStateCenter}>Aukce nebyla schválena</span>}
            {(auction.state_id == 1 && auction.start_time>Date.now()) && (<span style={{color:"#0d6efd"}} className={Styles.textStateCenter}>Aukce začne {auction.start_time.toLocaleString('cs-CZ') }</span>)}
            <Container className="mainContainer" style={overlay? {opacity: 0.25} : {opacity:1}}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.7 }}>
                        <h1 style={{ paddingBottom: 0 }}>{auction.name}</h1>
                        <h4 style={{ paddingBottom: 25 }}>{(auction.is_demand ? "Poptávková aukce" : "Nabídková aukce")}</h4>
                    </div>
                    <AuctioneerControlButtons User={User} {...auction} />
                </div>
                <Container style={{ display: "flex" }}>
                    <div style={{ flex: 1, paddingRight: 100, width: 300, height: 300, position: "relative" }}>
                        <SimpleImageSlider width={550} height={309} images={imagesGallerySrc} showBullets={true} showNavs={true} />
                    </div>


                    <div style={{ flex: 1 }}>
                        <p><strong>Popis: </strong>{auction.description}</p>
                        <ItemPrice {...auction} />
                        <div className={Styles.auctionInfoItem}><strong>Konec aukce: </strong>{auction.state_id == 0 ? "Neurčen" : auction.end_time.toLocaleString('cs-CZ')}</div>
                        <div className={Styles.auctionInfoItem}><strong>Typ:</strong> {auction.is_demand ? "Poptávková" : "Nabídková"}</div>
                        <div className={Styles.auctionInfoItem}><strong>Pravidla:</strong> {auction.is_open ? "Otevřená" : "Uzavřená"}</div>

                        <BidForm {...auction} UserLogged={IsLoggedIn} User={User} BidPriceEditing={BidPriceEditing} setBidPriceEditing={setBidPriceEditing} LastBidPrice={LastBidPrice}
                            setLastBidPrice={setLastBidPrice} BidPrice={BidPrice} setBidPrice={setBidPrice} />

                    </div>
                </Container>
                <div style={{ marginTop: 100 }}>

                    <Tabs defaultActiveKey={auction.is_open ? "History" : "RegisteredUsers"} id="uncontrolled-tab-example" className="mb-3">
                        {(auction.is_open && auction.start_time <= Date.now()) && <Tab eventKey="History" title="Historie nabídek">
                            <h2>Historie nabídek</h2>
                            <BidsHistory {...auction} />

                        </Tab>}
                        <Tab eventKey="RegisteredUsers" title="Registrování uživatelé v aukci">
                            <h2>Registrování uživatelé v aukci</h2>
                            <AuctionRegistrations {...auction} User={User} UserLogged={IsLoggedIn} />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </>
    )
}

