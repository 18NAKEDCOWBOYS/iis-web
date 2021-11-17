import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import NavigationBar from '../components/NavigationBar';
import RegForm from '../components/RegForm';

import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import { Link } from 'react-router-dom';


export default function AuctionsPage(props) {
  const loggedUser = {
    "roleId": 2
    
  }
  let auctions = [
    {
      "name": "Aukce A",
      "type": "Nabídka",
      "rules": "Otevřená",
      "price": 12354,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": true,
      "auctioneer_id": 2
    },
    {
      "name": "Aukce B",
      "type": "Nabídka",
      "rules": "Uzavřená",
      "price": 50,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined
    },
    {
      "name": "Aukce C",
      "type": "Poptávka",
      "rules": "Otevřená",
      "price": 542133,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": 2
    },
    {
      "name": "Aukce D",
      "type": "Nabídka",
      "rules": "Otevřená",
      "price": 2,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": true,
      "auctioneer_id": 1
    },
    {
      "name": "Aukce E",
      "type": "Poptávka",
      "rules": "Uzavřená",
      "price": 7823,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined
    }
  ]
  //not admin or auctioneer
  if (loggedUser.roleId < 2) {
    auctions = auctions.filter(item => item.approved == true)
  }
  return (
    <>
      <NavigationBar page="auctions" />
      <Container className="mainContainer">

        <h1>Přehled aukcí</h1>
        <Container className={Styles.flexContainer}>
          {auctions.map(item => {
            return (
              <div style={{ padding: 15 }}>
    
                <AuctionCard title={item.name} type={item.type} rules={item.rules} price={item.price} preview_image={item.images[0]} approved = {item.approved} auctioneer_id = {item.auctioneer_id}/>
              </div>
            )
          })}

        </Container>
      </Container>


    </>
  )
}