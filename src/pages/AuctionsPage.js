import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../components/NavigationBar';
import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import NewAuctionModal from '../components/NewAuctionModal'
import { UseUserContext } from "../userContext";
export default function AuctionsPage(props) {

  //modalLogic
  const [newAuctionModalShow, setNewAuctionModalShow] = React.useState(false);
  const [itemToBeAdded, setItemToBeAdded] = React.useState('');
  const setNewItem = () => {
    const item = {
      "id":4,
      "name": "Aukce E",
      "type": "Poptávka",
      "rules": "Uzavřená",
      "price": 7823,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined,
      "author_id": 2
    }

    setItemToBeAdded(item);
    setNewAuctionModalShow(true);
  };
  //tmp data
  const loggedUser = {
    "roleId": 2
    
  }
  let auctions = [
    {
      "id":0,
      "name": "Aukce A",
      "type": "Nabídka",
      "rules": "Otevřená",
      "price": 12354,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": true,
      "auctioneer_id": 2,
      "author_id": 0
    },
    {
      "id":1,
      "name": "Aukce B",
      "type": "Nabídka",
      "rules": "Uzavřená",
      "price": 50,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined,
      "author_id": 1
    },
    {
      "id":2,
      "name": "Aukce C",
      "type": "Poptávka",
      "rules": "Otevřená",
      "price": 542133,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": 2,
      "author_id": 2
    },
    {
      "id":3,
      "name": "Aukce D",
      "type": "Nabídka",
      "rules": "Otevřená",
      "price": 2,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": true,
      "auctioneer_id": 1,
      "author_id": 1
    },
    {
      "id":4,
      "name": "Aukce E",
      "type": "Poptávka",
      "rules": "Uzavřená",
      "price": 7823,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined,
      "author_id": 2
    }
  ]
  
  const {setIsLoggedIn, User, IsLoggedIn, setUser} = UseUserContext()
  console.log(User)
  
  //not admin or auctioneer
  if (loggedUser.roleId < 2) {
    auctions = auctions.filter(item => item.approved === true)
  }
  return (
    <>
      <NavigationBar page="auctions" />
      <Container className="mainContainer">

        <h1>Přehled aukcí</h1>
        <div style={{width:'100%', padding:'10px'}}>
          <Button variant='primary' onClick={() => setNewItem()} >Přidat novou aukci</Button>
        </div>
        <Container className={Styles.flexContainer}>
          {auctions.map(item => {
            return (
              <div style={{ padding: 15 }}>
                <AuctionCard {...item} link={'/auction-detail/' + item.id}/>
              </div>
            )
          })}
        </Container>

      </Container>
      <NewAuctionModal   
        show={newAuctionModalShow}
        onHide={() => setNewAuctionModalShow(false)}
        item={itemToBeAdded}
      />
    </>
  )
}