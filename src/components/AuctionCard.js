import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Styles from '../css/previewCard.module.css'
import { Link } from 'react-router-dom';
function ApprovalButtons(loggedUserRoleId)
{
  //admin or auctioneer
  if(loggedUserRoleId >=2 )
  {
    return(
      <div className={Styles.buttonsContainer}>
          <Button variant="success" className={Styles.buttonApprove}>Schválit</Button>{' '}
          <Button variant="danger" className={Styles.buttonReject}>Zamítnout</Button>
      </div>
    )
  }
}

export default function AuctionCard(props) {
  const loggedUser = {
    "roleId" : 2
  }
  return (
   
    <Card style={{width:400}}>
      <Link to={props.link} >
      <Card.Img variant="top" src={props.images[0]} />
      <Card.Body>
        <Card.Title className={Styles.cardTitle}>{props.name}</Card.Title>
        <Card.Text>
         <div className={Styles.cardItem}> <strong>Typ:</strong> {props.type}<br/></div>
         <div className={Styles.cardItem}> <strong> Pravidla:</strong> {props.rules}<br/></div>
         <div className={Styles.cardItem}> <strong>{props.rules === "Otevřená" ? "Aktuální cena:" : "Vyvolávací cena:"}</strong> {props.price} Kč<br/></div>
         </Card.Text>
      </Card.Body>
      </Link>

      {loggedUser.roleId >= 2 && <Card.Footer> 
        {(loggedUser.roleId>=2 && props.auctioneer_id !== undefined)  && (props.approved? <div className={Styles.approvedText}>Schválena</div> : <div className={Styles.rejectedText}>Zamítnuta</div>)}
      {props.auctioneer_id === undefined && ApprovalButtons(loggedUser.roleId)}
      </Card.Footer>}
    </Card>
    )
}