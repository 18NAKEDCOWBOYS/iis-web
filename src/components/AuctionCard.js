import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Styles from '../css/previewCard.module.css'

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
      <Card.Img variant="top" src={props.preview_image} />
      <Card.Body>
        <Card.Title className={Styles.cardTitle}>{props.title}</Card.Title>
        <Card.Text>
         <div className={Styles.cardItem}> <strong>Typ:</strong> {props.type}<br/></div>
         <div className={Styles.cardItem}> <strong> Pravidla:</strong> {props.rules}<br/></div>
         <div className={Styles.cardItem}> <strong>Vyvolávací cena:</strong> {props.price} Kč<br/></div>
        {(loggedUser.roleId>=2 && props.auctioneer_id != undefined)  && (props.approved? <div className={Styles.approvedText}>Schválena</div> : <div className={Styles.rejectedText}>Zamítnuta</div>)}
        </Card.Text>
        {props.auctioneer_id == undefined && ApprovalButtons(loggedUser.roleId)} 
      </Card.Body>
    </Card>
    )
}