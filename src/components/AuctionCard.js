import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Styles from '../css/previewCard.module.css'
export default function AuctionCard(props) {
  return (
   
    <Card style={{width:400}}>
      <Card.Img variant="top" src={props.preview_image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
         <div className={Styles.cardItem}> <strong>Typ:</strong> {props.type}<br/></div>
         <div className={Styles.cardItem}> <strong> Pravidla:</strong> {props.rules}<br/></div>
         <div className={Styles.cardItem}> <strong>Vyvolávací cena:</strong> {props.price} Kč<br/></div>
        </Card.Text>
        <Button variant="primary">Zobrazit detail</Button>
      </Card.Body>
    </Card>
    )
}