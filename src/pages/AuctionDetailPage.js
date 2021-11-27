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
import { useState, useEffect, useRef } from 'react';
import { UseUserContext } from "../userContext";
import SimpleImageSlider from "react-simple-image-slider";
import Table from 'react-bootstrap/Table';
import { Formik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
//TODO info o licitátorovi a autorovi, možná tlačítko na schválení
function BidFormOpenedAuc(props) {

    return (
        <>
            <Formik
                initialValues={{ bid: '' }}
                validate={values => {
                    const errors = {};
                    let last_bid = props.bid.length == 0 ? props.price : props.bid[props.bid.length - 1].price
                    if (Number(values.bid) <= 0) {
                        errors.bid = "Nabídka musí být větší než 0 Kč"
                    }
                    else if (props.is_demand && last_bid >= values.bid) {
                        errors.bid = "Nová nabídka musí být v poptávkové aukcí vyšší než aktuální cena"
                    }
                    else if (!props.is_demand && values.bid >= last_bid) {
                        errors.bid = "Nová nabídka musí být v nabídkové aukci nižší než aktuální cena"
                    }
                    else if (props.min_bid != null && Math.abs(last_bid - Number(values.bid)) < props.min_bid) {
                        errors.bid = "Minimální" + (props.is_demand ? " příhoz " : " snížení nabídky ") + "pro tuto aukci je " + props.min_bid
                    }
                    else if (props.max_bid != null && Math.abs(last_bid - Number(values.bid)) > props.max_bid) {
                        errors.bid = "Maximální" + (props.is_demand ? " příhoz " : " snížení nabídky ") + "pro tuto aukci je " + props.max_bid
                    }
                    return errors
                }}
                onSubmit={(values, actions) => {
                    fetch('https://iis-api.herokuapp.com/bids', {
                        method: 'POST',
                        headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
                        body: JSON.stringify({
                            auction_id: props.id,
                            price: values.bid,
                            time: Date.now()
                        })
                    }
                    ).then((response) => {
                        if(response.status == 200)
                        {
                            props.loadAuction()
                            actions.setSubmitting(false)
                        }
                        else
                        {
                            //TODO redirect to error page
                        }
                    })

                }}>
                {({
                    values,
                    errors,
                    status,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (<Form onSubmit={handleSubmit} style={{ paddingTop: 25 }}>
                    <InputGroup className="mb-3">
                        <FormControl style={{ maxWidth: 250 }}
                            onChange={handleChange}
                            placeholder="Výše nabídky"
                            aria-label="Výše nabídky"
                            aria-describedby="basic-addon1"
                            type="number"
                            name="bid"
                            required={true}
                        />
                        <InputGroup.Text id="basic-addon1">Kč</InputGroup.Text>
                    </InputGroup>
                    {errors.bid ? <div style={{ color: 'red', paddingTop: 2 }}>{errors.bid}</div> : null}
                    <div>
                        <Button style={{ marginTop: 10 }} disabled={isSubmitting || errors.bid} variant="primary" type="submit">Odeslat nabídku</Button>
                    </div>
                </Form>)}
            </Formik>
        </>
    )
}
function BidFormClosedAuc(props) {

    const bidInputRef = useRef(null)
    const [error, seterror] = useState(null)
    const changeValidationClassTo = (className, obj) => {
        if (className === "is-valid") {
            obj.current.classList.remove("is-invalid");
            obj.current.classList.add("is-valid")
        } else if (className === "is-invalid") {
            obj.current.classList.remove("is-valid");
            obj.current.classList.add("is-invalid")
        }
    }

    const submitNewBid = () => {
        if (error != "") {
            changeValidationClassTo("is-invalid", bidInputRef)
            return;
        }
        else {
            changeValidationClassTo("is-valid", bidInputRef)
            props.setBidPriceEditing(false);
            props.setLastBidPrice(props.BidPrice);
        }
        let last_user_bid = props.bid.find(bid => bid.user_id == props.User.id)

        return (fetch('https://iis-api.herokuapp.com/bids', {
            method: 'PUT',
            headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
            body: JSON.stringify({
                auction_id: props.id,
                price: Number(props.BidPrice),
                time: last_user_bid.time
            })}).then(response => {
                if(response.status == 200)
                {
                    changeValidationClassTo("is-valid", bidInputRef)
                }
                else
                {
                    //TODO redirect to error page
                }
                
            })    )
    }

    const validateBidInput = (value) => {
        let value_num = Number(value)
        let price_num = Number(props.price)
        if(value <= 0)
        {
            seterror("Nabídka musí být kladné číslo")
            changeValidationClassTo("is-invalid", bidInputRef)
        }
        else if(value_num < price_num && props.is_demand)
        {
            seterror("Nabídka musí být v poptávkové aukci vyšší než vyvolávací cena")
            changeValidationClassTo("is-invalid", bidInputRef)
        }
        else if(value_num > price_num && !props.is_demand)
        {
            seterror("Nabídka musí být v nabídkové aukci menší než vyvolávací cena")
            changeValidationClassTo("is-invalid", bidInputRef)
        }
        else{
            seterror("")
            changeValidationClassTo("is-valid", bidInputRef)
        }
    }
    return (
        <Form style={{ paddingTop: 20 }} onSubmit={(e) => {e.preventDefault()}} >
            <InputGroup>
                <FormControl style={{ maxWidth: 250 }}
                    ref={bidInputRef}
                    placeholder="Nová cena"
                    aria-label="Nová cena"
                    aria-describedby="basic-addon1"
                    value={props.BidPrice}
                    onChange={(e) => { props.setBidPrice(e.target.value); validateBidInput(e.target.value) }}
                    type="number"
                    name="bid"
                    disabled={!props.BidPriceEditing}
                />
                <InputGroup.Text id="basic-addon1">CZK</InputGroup.Text>
            </InputGroup>
            <div style={{ color: 'red', paddingTop: 5 }}>{error}</div>
            <div style={{ paddingTop: 10 }}>
                {props.BidPriceEditing ?
                    <>
                        <Button variant="primary" onClick={() => { submitNewBid() } } disabled={error != ""}>Potvrdit novou nabídku</Button>{' '}
                        <Button variant="secondary" onClick={() => {
                            props.setBidPriceEditing(false);
                            props.setBidPrice(props.LastBidPrice);
                            bidInputRef.current.classList.remove("is-valid");
                            bidInputRef.current.classList.remove("is-invalid");
                            seterror("")
                        }}>Zrušit</Button>
                    </>
                    :
                    <>
                        <Button variant="primary" type="submit" onClick={() => props.setBidPriceEditing(true)}>Upravit nabídku</Button>
                    </>

                }
            </div>
        </Form>
    )
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
    if (!props.is_open || props.state_id == 1 || props.bid.length == 0) {
        result = "Vyvolávací cena: " + props.price + " Kč"
    }
    else {
        result = "Aktuální cena: " + props.bid[props.bid.length - 1].price + " Kč"
    }
    return (
        <div className={Styles.priceStyle}>{result}</div>
    )
}

function BidForm(props) {
    if (props.UserLogged) {
        if (props.bidders && props.bidders.some(bidder => bidder.user_id == props.User.id)) {

            if (props.state_id == 2 && Date.now() > new Date(props.start_time) && Date.now() < new Date(props.end_time)) {
                if (props.is_open) {
                    return (<BidFormOpenedAuc {...props} loadAuction={props.loadAuction} />)
                }
                else {
                    return (<BidFormClosedAuc {...props} loadAuction={props.loadAuction} />)
                }
            }
        }
    }
    return null
}


function BidsHistory(props) {
    if (props.bid) {
        props.bid.sort((a, b) => (a.time < b.time ? 1 : (a.time > b.time ? -1 : 0)))
    }
    return (<>
        <Table key={'jmeno'} striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th id='jmeno'>Jméno</th>
                    <th>Příjmení</th>
                    <th>Čas</th>
                    <th>Částka</th>
                </tr>
            </thead>
            <tbody>
                {props.bid && props.bid.map(item => {
                    return (
                        <tr>
                            <td>{item.user.name}</td>
                            <td>{item.user.surname}</td>
                            <td>{new Date(item.time).toLocaleString('cs-CZ')}</td>
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
    if (props.bidders) {
        props.bidders.sort((a, b) => (a.user.surname < b.user.surname ? 1 : (a.user.surname > b.user.surname ? -1 : 0)))
    }
    return (<>
        <Table striped style={{ textAlign: 'center' }}>
            <thead>
                <tr>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Stav registrace</th>
                </tr>
            </thead>
            <tbody>
                {props.bidders && props.bidders.map(item => {
                    return (<tr>
                        <td>{item.user.name}</td>
                        <td>{item.user.surname}</td>


                        {(props.UserLogged && props.User.id == props.auctioneer_id) ? <td>{item.is_approved ?
                            <Button variant="danger" disabled={Date.now() > new Date(props.start_time)} onClick={() => props.approveBidder(props.id, item.user.id, false)}>Zrušit registraci</Button>
                            :
                            <Button variant="primary" disabled={Date.now() > new Date(props.start_time)} onClick={() => props.approveBidder(props.id, item.user.id, true)}>Schválit registraci</Button>}</td> :

                            <td>{item.is_approved ? "Potvrzen" : "Nepotvrzen"}</td>}
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
    const [LastBidPrice, setLastBidPrice] = useState("")
    const [BidPrice, setBidPrice] = useState("")
    const { setIsLoggedIn, User, IsLoggedIn, setUser } = UseUserContext()
    const { auctionId } = useParams()




    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [auction, setAuction] = useState([]);


    const loadAuction = () => {
        return (
            fetch("https://iis-api.herokuapp.com/auctions/" + auctionId)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setAuction(result);
                        if (IsLoggedIn) {
                            if (auction.bid) {
                                let userBids = auction.bid.filter(item => item.user_id == User.id)
                                if (userBids.length != 0) {
                                    setLastBidPrice(userBids[0].price)
                                }
                            }

                        }
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        )
    }

    const ApproveBidder = (auctionId, userId, approved) => {
        return (fetch('https://iis-api.herokuapp.com/bidders/', {
            method: 'PUT',
            headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
            body: JSON.stringify({ "auction_id": auctionId, "user_id": userId, "is_approved": approved })

        }).then((response) => 
        {
            if(response.status == 200)
            {
                loadAuction()
            }
            else
            {
                //TODO redirect
            }
        }))
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

    let overlay = auction.state_id == 3 || (auction.state_id == 2 && new Date(auction.start_time) > Date.now() && auction.auctioneer_id != User.id)

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log(auction)
        return (
            <>
                {auction.state_id == 3 && <span style={{ color: "#dc3545" }} className={Styles.textStateCenter}>Aukce nebyla schválena</span>}
                {overlay && (<span style={{ color: "#0d6efd" }} className={Styles.textStateCenter}>Aukce začne {new Date(auction.start_time).toLocaleString('cs-CZ')}</span>)}
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
                            <div className={Styles.auctionInfoItem}><strong>Typ: </strong>{auction.is_demand ? "Poptávková" : "Nabídková"}</div>
                            <div className={Styles.auctionInfoItem}><strong>Pravidla: </strong>{auction.is_open ? "Otevřená" : "Uzavřená"}</div>
                            <div className={Styles.auctionInfoItem}><strong>Licitátor: </strong>{auction.auctioneer_id == null ? "Nepřiřazen" : (auction.user_auction_author_idTouser && (auction.user_auction_auctioneer_idTouser.name + " " + auction.user_auction_auctioneer_idTouser.surname))}</div>
                            <div className={Styles.auctionInfoItem}><strong>Autor: </strong>{auction.user_auction_author_idTouser && (auction.user_auction_author_idTouser.name + " " + auction.user_auction_author_idTouser.surname)}</div>
                            {auction.is_open && <div className={Styles.auctionInfoItem}><strong>Minimální {auction.is_demand ? "příhoz: " : "snížení nabídky: " }</strong> {auction.min_bid == null ? "Neomezen" : (auction.min_bid + "Kč")}</div>}
                            {auction.is_open && <div className={Styles.auctionInfoItem}><strong>Maximální {auction.is_demand ? "příhoz: " : "snížení nabídky: "}</strong> {auction.max_bid == null ? "Neomezen" : (auction.max_bid + "Kč")}</div>}

                            <BidForm {...auction} UserLogged={IsLoggedIn} User={User} BidPriceEditing={BidPriceEditing} setBidPriceEditing={setBidPriceEditing} LastBidPrice={LastBidPrice}
                                setLastBidPrice={setLastBidPrice} BidPrice={BidPrice} setBidPrice={setBidPrice} loadAuction={loadAuction} />

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
                                {(auction.bidders && auction.bidders.length == 0) ?
                                    "Nikdo není v aukci registrován"
                                    :
                                    <AuctionRegistrations {...auction} User={User} UserLogged={IsLoggedIn} approveBidder={ApproveBidder} />
                                }
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </>
        )
    }
}

