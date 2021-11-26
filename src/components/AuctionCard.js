import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Styles from '../css/previewCard.module.css'
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { UseUserContext } from "../userContext";


function CardBodyItems(props) {
  let items = {
    "Typ:": props.is_demand ? "Poptávková" : "Nabídková",
    "Pravidla:": props.is_open ? "Otevřená" : "Uzavřená",
    "Licitátor:": props.auctioneer_id == null ? "Nepřiřazen" : "Bohuš" //TODO vybrat jmeno podle id
  }
  items[props.is_open ? "Aktuální cena:" : "Vyvolávací cena:"] = props.price + "Kč"
  return items
}

function AuctionStateText(props) {
  if (props.state_id == 2 && Date.now() > new Date(props.start_time) && Date.now() < new Date(props.end_time)) {
    return "Aukce probíhá do " + (props.end_time == null ? "" : new Date(props.end_time).toLocaleString('cs-CZ'))
  }
  if (props.state_id == 2 && Date.now() > new Date(props.end_time)) {
    return "Aukce byla ukončena, čeká se na vyhodnocení"
  }
  let textsByState = [
    "Čeká se na schválení licitátorem",
    "Začátek naplánován na " + (props.start_time == null ? "" : new Date(props.start_time).toLocaleString('cs-CZ')),
    "Zamítnuta",
    "Aukce předčasně ukončena, čeká se na vyhodnocení",
    "Aukce úspěšně ukončena, výhercem je " + (props.winner_id == null ? ("") : (props.user_auction_winner_idTouser.name + " " + props.user_auction_winner_idTouser.surname)), //TODO get user name by id
  ]
  let index = (props.state_id) - 1;
  return textsByState[index]
}




function ApprovalButtonsFooter(props) {
  //admin or auctioneer
  console.log(props)
  const Not_approved = () => 
  {
    return (fetch('https://iis-api.herokuapp.com/auctions/approve', {
      method: 'PUT',
      headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
      body: JSON.stringify({ "id": props.item_prop.id,  "state_id": 3})
    }).then(response => response.text()).then(resp => console.log(resp))).then(resp => props.item_prop.loadAuctions())
  }
  if (props.userLogged) {
    if (props.user.role_id >= 2 && props.item_prop.author_id != props.user.id) {
      return (
        <Card.Footer>
          <div className={Styles.buttonsContainer}>
            <Button variant="success" className={Styles.buttonApprove} onClick={() => props.item_prop.setChangeTime(props.item_prop)}>Schválit</Button>{' '}
            <Button variant="danger" className={Styles.buttonReject} onClick={() => Not_approved()} >Zamítnout</Button>
          </div>
        </Card.Footer>
      )
    }
  }
  return null
}

function AuctionReg(props) {
  const auctionRegister = ()=>{
    return (fetch('https://iis-api.herokuapp.com/bidders', {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
      body: JSON.stringify({ "auction_id": props.id})
    }).then(response => response.text()).then(resp => console.log(resp))).then(resp => props.loadAuctions())
  }
  if (props.userLogged) {
    if (props.user.id != props.auctioneer_id && props.user.id != props.author_id && (props.state_id == 2 && Date.now() < new Date(props.start_time))) 
    {
      let bidderInfo = props.bidders.some(bidder => bidder.user_id == props.User.id)
      if (!bidderInfo)
      {

        return (
          <Card.Footer>
            <Button variant="primary" className={Styles.buttonApprove} onClick={() => auctionRegister()}>Registrovat se</Button>
          </Card.Footer>
        )
      }
      
    }
  }
  return null
}
function DeleteButton(props) {
  if (props.userLogged) {
    if ((props.user.id == props.author_id && props.state_id == 1) || props.user.role_id == 3) {
      return (
        <>
          <Card.Footer>
            <Button variant="danger"><FaTrashAlt /> Smazat</Button>
          </Card.Footer>
        </>
      )
    }
  }
  return null
}

export default function AuctionCard(props) {
  const { setIsLoggedIn, User, IsLoggedIn, setUser } = UseUserContext()
  let cardTextItems = CardBodyItems(props)
    return (
      <div style={{ padding: 15 }}>
        <Card style={{ width: 400 }}>
          <Link to={props.link} >
            <Card.Img variant="top" src={props.photos.length == 0 ? "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png" : props.photos[0]} />
            <Card.Body>
              <Card.Title className={Styles.cardTitle}>{props.name}</Card.Title>
              <Card.Text>
                {Object.keys(cardTextItems).map((key) => {
                  return (<div className={Styles.cardItem}> <strong>{key}</strong> {cardTextItems[key]}<br /></div>)
                })}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {<span className={Styles.cardText}><AuctionStateText {...props} /></span>}
            </Card.Footer>
          </Link>
          {props.state_id == 1 && <ApprovalButtonsFooter user={User} userLogged={IsLoggedIn} item_prop={props} />}
          <AuctionReg userLogged={IsLoggedIn} user={User} {...props} />
          <DeleteButton userLogged={IsLoggedIn} user={User} {...props} />
        </Card>
      </div>
    )
}