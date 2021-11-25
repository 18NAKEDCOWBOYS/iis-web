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
import { useState, useEffect } from 'react';
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
    if (props.User.id == props.auctioneer_id && Date.now() >= new Date(props.end_time)) {
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
    if (!props.is_open || props.state_id == 1) {
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

            if (props.state_id == 2 && Date.now() > new Date(props.start_time) && Date.now() < new Date(props.end_time)) {
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
    return (<>
        <Table key={'jmeno'} striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th id='jmeno'>Jméno</th>
                    <th>Příjmení</th>
                    <th>Částka</th>
                </tr>
            </thead>
            <tbody>
                {props.bid && props.bid.map(item => {
                    return (
                        <tr>
                            <td>{item.user.name}</td>
                            <td>{item.user.surname}</td>
                            <td>{item.price} Kč</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    </>
    )
}


function AuctionRegistrations(props) {
    if(props.bidders)
    {
        console.log("sdfsdf")
        props.bidders.sort((a,b)=>(a.user.surname < b.user.surname ? 1 : (a.user.surname > b.user.surname ? -1 : 0)))
    }
    console.log(props.bidders)
    return (<>
        <Table striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    {(props.userLogged && props.User.role_id >= 2) ? <th>Stav registrace</th> : ""}
                </tr>
            </thead>
            <tbody>
                {props.bidders && props.bidders.map(item => {
                    return (<tr>
                        <td>{item.user.name}</td>
                        <td>{item.user.surname}</td>
                        {(props.UserLogged && props.User.role_id >= 2) ? <td>{item.is_approved ? 
                            <Button variant="danger" onClick={() => props.approveBidder(props.id, item.user.id, false)}>Zrušit registraci</Button>
                            : 
                            <Button variant="primary" onClick={() => props.approveBidder(props.id, item.user.id, true)}>Schválit registraci</Button>}</td> : ""}
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
    const { auctionId } = useParams()




    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [auction, setAuction] = useState([]);


    const loadAuction = () =>  {
        return(
        fetch("https://iis-api.herokuapp.com/auctions/" + auctionId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAuction(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        )
    }

    const ApproveBidder =  (auctionId, userId, approved) =>  {
        return (fetch('https://iis-api.herokuapp.com/bidders/', {
            method: 'PUT',
            headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
            body: JSON.stringify({ "auction_id": auctionId, "user_id": userId, "is_approved": approved })
        
        }).then(result => result.text()).then(result =>console.log(result)).then(() => loadAuction()))
    }


    useEffect(() => {
        loadAuction()
    }, [])

    //create images objects array
    let imagesGallerySrc = [];
    for (let i in auction.photos) {
        imagesGallerySrc[i] = { "url": auction.photos[i] }
    }
    if (imagesGallerySrc.length == 0) {
        imagesGallerySrc = [{ "url": "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png" }]
    }

    let overlay = auction.state_id == 3 || (auction.state_id == 2 && new Date(auction.start_time) > Date.now())

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                {auction.state_id == 3 && <span style={{ color: "#dc3545" }} className={Styles.textStateCenter}>Aukce nebyla schválena</span>}
                {(auction.state_id == 2 && new Date(auction.start_time) > Date.now()) && (<span style={{ color: "#0d6efd" }} className={Styles.textStateCenter}>Aukce začne {new Date(auction.start_time).toLocaleString('cs-CZ')}</span>)}
                <Container className="mainContainer" style={overlay ? { opacity: 0.25 } : { opacity: 1 }}>
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
                            <div className={Styles.auctionInfoItem}><strong>Konec aukce: </strong>{auction.state_id == 1 ? "Neurčen" : new Date(auction.end_time).toLocaleString('cs-CZ')}</div>
                            <div className={Styles.auctionInfoItem}><strong>Typ:</strong> {auction.is_demand ? "Poptávková" : "Nabídková"}</div>
                            <div className={Styles.auctionInfoItem}><strong>Pravidla:</strong> {auction.is_open ? "Otevřená" : "Uzavřená"}</div>

                            <BidForm {...auction} UserLogged={IsLoggedIn} User={User} BidPriceEditing={BidPriceEditing} setBidPriceEditing={setBidPriceEditing} LastBidPrice={LastBidPrice}
                                setLastBidPrice={setLastBidPrice} BidPrice={BidPrice} setBidPrice={setBidPrice} />

                        </div>
                    </Container>
                    <div style={{ marginTop: 100 }}>

                        <Tabs defaultActiveKey={auction.is_open ? "History" : "RegisteredUsers"} id="uncontrolled-tab-example" className="mb-3">
                            {(auction.is_open && new Date(auction.start_time) <= Date.now()) && <Tab eventKey="History" title="Historie nabídek">
                                <h2>Historie nabídek</h2>
                                <BidsHistory {...auction} />

                            </Tab>}
                            <Tab eventKey="RegisteredUsers" title="Registrování uživatelé v aukci">
                                <h2>Registrování uživatelé v aukci</h2>
                                <AuctionRegistrations {...auction} User={User} UserLogged={IsLoggedIn} approveBidder = {ApproveBidder} />
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </>
        )
    }
}

