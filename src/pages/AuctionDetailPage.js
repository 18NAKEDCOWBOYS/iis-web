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
import { useNavigate } from 'react-router-dom'
import PickWinnerModal from '../components/PickWinnerModal';
import Loading from "../components/Loading"

import EditTimeModal from '../components/EditTimeModal';

function BidFormOpenedAuc(props) {
  const bidInputRef = useRef(null)
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{ bid: "" }}
        validate={values => {
          const errors = {};
          let last_bid;
          if (props.bid.length === 0) {
            last_bid = props.price
          }
          else {
            let last_bid_obj = props.bid.reduce(function (a, b) {
              return new Date(a.time) > new Date(b.time) ? a : b
            }, 0);
            last_bid = last_bid_obj.price
          }
          if (Number(values.bid) <= 0) {
            errors.bid = "Nabídka musí být větší než 0 Kč"
          }
          else if (props.is_demand && Number(last_bid) >= Number(values.bid)) {
            errors.bid = "Nová nabídka musí být v poptávkové aukcí vyšší než aktuální cena"
          }
          else if (!props.is_demand && Number(values.bid) >= Number(last_bid)) {
            errors.bid = "Nová nabídka musí být v nabídkové aukci nižší než aktuální cena"
          }
          else if (props.min_bid != null && Math.abs(Number(last_bid) - Number(values.bid)) < Number(props.min_bid)) {
            errors.bid = "Minimální" + (props.is_demand ? " příhoz " : " snížení nabídky ") + "pro tuto aukci je " + props.min_bid + " Kč"
          }
          else if (props.max_bid != null && Math.abs(Number(last_bid) - Number(values.bid)) > Number(props.max_bid)) {
            errors.bid = "Maximální" + (props.is_demand ? " příhoz " : " snížení nabídky ") + "pro tuto aukci je " + props.max_bid + " Kč"
          }

          if (errors.bid) {
            changeValidationClassTo("is-invalid", bidInputRef)
          }
          else {
            bidInputRef.current.classList.remove("is-invalid");
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
            if (response.status == 200) {
              props.loadAuction()
              actions.setSubmitting(false)
              changeValidationClassTo("is-valid", bidInputRef)
            }
            else {
              navigate("/error/" + response.status + "/" + response.statusText)
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
              ref={bidInputRef}
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

function changeValidationClassTo(className, obj) {
  if (className === "is-valid") {
    obj.current.classList.remove("is-invalid");
    obj.current.classList.add("is-valid")
  } else if (className === "is-invalid") {
    obj.current.classList.remove("is-valid");
    obj.current.classList.add("is-invalid")
  }
}
function BidFormClosedAuc(props) {

  const bidInputRef = useRef(null)
  const [error, seterror] = useState(null)

  const navigate = useNavigate();
  const submitNewBid = () => {
    props.setBidPriceEditing(false);
    props.setLastBidPrice(props.BidPrice);
    let last_user_bid = props.bid.find(bid => bid.user_id == props.User.id)
    return (fetch('https://iis-api.herokuapp.com/bids', {
      method: last_user_bid ? 'PUT' : 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
      body: JSON.stringify({
        auction_id: props.id,
        price: Number(props.BidPrice),
        time: last_user_bid ? last_user_bid.time : Date.now()
      })
    }).then(response => {
      if (response.status == 200) {
        changeValidationClassTo("is-valid", bidInputRef)
      }
      else {
        navigate("/error/" + response.status + "/" + response.statusText)
      }

    }))
  }

  const validateBidInput = (value) => {
    let value_num = Number(value)
    let price_num = Number(props.price)
    if (value <= 0) {
      seterror("Nabídka musí být kladné číslo")
      changeValidationClassTo("is-invalid", bidInputRef)
    }
    else if (value_num < price_num && props.is_demand) {
      seterror("Nabídka musí být v poptávkové aukci vyšší než vyvolávací cena")
      changeValidationClassTo("is-invalid", bidInputRef)
    }
    else if (value_num > price_num && !props.is_demand) {
      seterror("Nabídka musí být v nabídkové aukci menší než vyvolávací cena")
      changeValidationClassTo("is-invalid", bidInputRef)
    }
    else {
      seterror("")
      bidInputRef.current.classList.remove("is-invalid");
    }
  }


  return (
    <>

      <Form style={{ paddingTop: 20 }} onSubmit={(e) => { e.preventDefault() }} >
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
              <Button variant="primary" onClick={() => { submitNewBid() }} disabled={error != ""}>Potvrdit novou nabídku</Button>{' '}
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
    </>
  )
}

function AuctioneerControlButtons(props) {
  if (props.User.id == props.auctioneer_id && props.state_id == 2) {
    return (
      <Button variant="primary" onClick={() => props.onClick(props.auction)}>{(new Date(props.end_time) > Date.now() ? "Předčasně ukončit a určit výherce" : "Ukončit a určit výherce ")}</Button>
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
    let last_bid_obj = props.bid.reduce(function (a, b) {
      return new Date(a.time) > new Date(b.time) ? a : b
    }, 0);
    result = "Aktuální cena: " + last_bid_obj.price + " Kč"
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

function RegisterButton(props) {
  if (props.IsLoggedIn && props.bidders) {
    let bidderInfo = props.bidders.find(bidder => bidder.user_id == props.User.id)
    if (!bidderInfo) {
      if (props.User.id != props.auctioneer_id && props.User.id != props.author_id && (props.state_id == 2 && Date.now() <= new Date(props.start_time))) {
        return (<Button variant="primary" className={Styles.buttonApprove} onClick={() => props.auctionRegister()}>Registrovat se do aukce</Button>)
      }
    }
  }
  return null
}


export default function AuctionDetailPage(props) {
  const [editTimeModalShow, setEditTimeModalShow] = React.useState(false);
  const [itemToChangeTime, setItemToChangeTime] = React.useState('');
  const setChangeTime = (item) => {
    setItemToChangeTime(item);
    setEditTimeModalShow(true);
  }


  const [pickWinnerModalShow, setPickWinnerModalShow] = React.useState(false);
  const [auctionToBeEvaluated, setAuctionToBeEvaluated] = React.useState('');
  const setEvaluatedItem = (item) => {
    setAuctionToBeEvaluated(item);
    setPickWinnerModalShow(true);
  };
  const onPickWinnerModalSubmit = (values, bag) => {
    let body = { "id": values.id, "state_id": 5 }
    if (values.winner_id == null) {
      body["winner_id"] = null;
    } else {
      body["winner_id"] = Number(values.winner_id);
    }

    if (new Date(values.end_time) >= Date.now()) {
      body["end_time"] = Date.now()
    }
    fetch('https://iis-api.herokuapp.com/auctions/approve', {
      method: 'PUT',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify(body)
    }).then(() => {
      loadAuction()
      bag.setSubmitting(false)
      setPickWinnerModalShow(false);
    })
  }

  const { User, IsLoggedIn } = UseUserContext()
  const { auctionId } = useParams()


  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auction, setAuction] = useState([]);
  const [BidPriceEditing, setBidPriceEditing] = useState(false)
  const [LastBidPrice, setLastBidPrice] = useState("")
  const [BidPrice, setBidPrice] = useState()
  const navigate = useNavigate();
  const loadAuction = () => {
    return (
      fetch("https://iis-api.herokuapp.com/auctions/" + auctionId)
        .then(res => res.json())
        .then(
          (result) => {
            setAuction(result);
            setIsLoaded(true);

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

    }).then((response) => {
      if (response.status == 200) {
        loadAuction()
      }
      else {
        navigate("/error/" + response.status + "/" + response.statusText)
      }
    }))
  }

  const Not_approved = (id) => {
    return (fetch('https://iis-api.herokuapp.com/auctions/approve', {
      method: 'PUT',
      headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
      body: JSON.stringify({ "id": id, "state_id": 3 })
    }).then(response => {
      if (response.status == 200) {
        return response
      }
      else {
        navigate("/error/" + response.status + "/" + response.statusText)
      }
    }).then(resp => props.item_prop.loadAuction()))
  }

  const auctionRegister = () => {
    return (fetch('https://iis-api.herokuapp.com/bidders', {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
      body: JSON.stringify({ "auction_id": auction.id })
    }).then(response => {
      if (response.status == 200) {
        return response
      }
      else {
        navigate("/error/" + response.status + "/" + response.statusText)
      }
    }).then(resp => loadAuction()))
  }



  useEffect(() => {
    loadAuction()
  }, [])


  let overlay = auction.state_id == 3

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  else if (!isLoaded) {
    return (<Loading />)
  } else {
    let imagesGallerySrc = [];
    if (auction.photos) {
      for (let i in auction.photos) {
        imagesGallerySrc[i] = { "url": auction.photos[i] }
      }
      if (imagesGallerySrc.length == 0) {
        imagesGallerySrc = [{ "url": "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png" }]
      }
    }

    // {(IsLoggedIn && !auction.is_open &&  auction.bid && auction.bid.find(item => item.user_id == User.id))  && ("Vaše nabídka:  " + auction.bid.find(item => item.user_id == User.id).price + " Kč")}
    let userBidPrice = "";
    if(IsLoggedIn && auction && auction.bid)
    {
      let bid = auction.bid.find(item => item.user_id == User.id)
      if(bid)
      {
        userBidPrice = bid.price
      }
    }
    return (
      <>
        {auction.state_id == 3 && <span style={{ color: "#dc3545" }} className={Styles.textStateCenter}>Aukce nebyla schválena</span>}
        <Container className="mainContainer" style={overlay ? { opacity: 0.25 } : { opacity: 1 }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.7, paddingBottom: 25 }}>
              <h1 style={{ paddingBottom: 0 }}>{auction.name}</h1>
              <h4>{(auction.is_demand ? "Poptávková aukce" : "Nabídková aukce")}</h4>
              {(auction.state_id == 2 && new Date(auction.start_time) > Date.now()) && <h4 style={{ color: "#0d6efd" }}>Aukce začne {new Date(auction.start_time).toLocaleString('cs-CZ')}</h4>}
              {(auction.state_id == 5) && <h4 style={{ color: "#0d6efd" }}>Aukce ukončena{auction.winner_id == null ? " bez výherce" : ", výhercem je " +
                auction.user_auction_winner_idTouser.name + " " + auction.user_auction_winner_idTouser.surname} </h4>}
            </div>
            <div style={{ flex: 0.3, padding: 35 }}>
              <RegisterButton {...auction} User={User} IsLoggedIn={IsLoggedIn} auctionRegister={auctionRegister} />
              <AuctioneerControlButtons onClick={setEvaluatedItem} IsLoggedIn={IsLoggedIn} User={User} {...auction} auction={auction} />
              {IsLoggedIn && User.role_id > 1 && User.id != auction.author_id && auction.state_id == 1 && <>
                <Button variant="success" onClick={() => setChangeTime(auction)}>Schválit</Button>{' '}
                <Button variant="danger" onClick={() => Not_approved(auction.id)}>Zamítnout</Button></>}
            </div>
          </div>

          <Container style={{ display: "flex" }}>

            <div style={{ flex: 1, paddingRight: 100, width: 300, height: 300, position: "relative" }}>
              {auction.photos && <SimpleImageSlider width={550} height={309} images={imagesGallerySrc} showBullets={true} showNavs={true} />}
            </div>


            <div style={{ flex: 1 }}>
              <p><strong>Popis: </strong>{auction.description}</p>
              <ItemPrice {...auction} />
              <div className={Styles.auctionInfoItem}><strong>Konec aukce: </strong>{auction.state_id == 1 ? "Neurčen" : new Date(auction.end_time).toLocaleString('cs-CZ')}</div>
              <div className={Styles.auctionInfoItem}><strong>Typ: </strong>{auction.is_demand ? "Poptávková" : "Nabídková"}</div>
              <div className={Styles.auctionInfoItem}><strong>Pravidla: </strong>{auction.is_open ? "Otevřená" : "Uzavřená"}</div>
              <div className={Styles.auctionInfoItem}><strong>Licitátor: </strong>{auction.auctioneer_id == null ? "Nepřiřazen" : (auction.user_auction_author_idTouser && (auction.user_auction_auctioneer_idTouser.name + " " + auction.user_auction_auctioneer_idTouser.surname))}</div>
              <div className={Styles.auctionInfoItem}><strong>Autor: </strong>{auction.user_auction_author_idTouser && (auction.user_auction_author_idTouser.name + " " + auction.user_auction_author_idTouser.surname)}</div>
              {auction.is_open && <div className={Styles.auctionInfoItem}><strong>Minimální {auction.is_demand ? "příhoz: " : "snížení nabídky: "}</strong> {auction.min_bid == null ? "Neomezen" : (auction.min_bid + "Kč")}</div>}
              {auction.is_open && <div className={Styles.auctionInfoItem}><strong>Maximální {auction.is_demand ? "příhoz: " : "snížení nabídky: "}</strong> {auction.max_bid == null ? "Neomezen" : (auction.max_bid + "Kč")}</div>}
              {userBidPrice != "" && <div style={{fontSize:20}} className={Styles.auctionInfoItem}><strong>Vaše poslední nabídka: </strong>{LastBidPrice=="" ? userBidPrice : LastBidPrice}</div>}
              <BidForm {...auction} UserLogged={IsLoggedIn} User={User} BidPriceEditing={BidPriceEditing} setBidPriceEditing={setBidPriceEditing} LastBidPrice={LastBidPrice}
                setLastBidPrice={setLastBidPrice} BidPrice={BidPrice} setBidPrice={setBidPrice} loadAuction={loadAuction}  />
            </div>
          </Container>
          <div style={{ marginTop: 100 }}>
            <Tabs id="uncontrolled-tab-example" className="mb-3">
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

        <PickWinnerModal
          show={pickWinnerModalShow}
          onHide={() => setPickWinnerModalShow(false)}
          item={auctionToBeEvaluated}
          onSubmit={onPickWinnerModalSubmit}
        />

        <EditTimeModal
          show={editTimeModalShow}
          onHide={() => setEditTimeModalShow(false)}
          loadAuctions={loadAuction}
          user={User}
          {...itemToChangeTime}
        />
      </>
    )
  }
}

