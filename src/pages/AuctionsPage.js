import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../components/NavigationBar';
import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import NewAuctionModal from '../components/NewAuctionModal'
import EditTimeModal from '../components/EditTimeModal'
import { UseUserContext } from "../userContext";
export default function AuctionsPage(props) {
  //modalLogic
  const [editTimeModalShow, setEditTimeModalShow] = React.useState(false);
  const [itemToChangeTime, setItemToChangeTime] = React.useState('');
  const setChangeTime = (item) => {
    setItemToChangeTime(item);
    setEditTimeModalShow(true);
  }
  
  const [newAuctionModalShow, setNewAuctionModalShow] = React.useState(false);
  const [itemToBeAdded, setItemToBeAdded] = React.useState('');
  const setNewItem = () => {
    const item = {
      "id":null,
      "name": "",
      "is_demand": null,
      "is_open": null,
      "price": null,
      "author_id": null,
      "auctioneer_id": null,
      "start_time": null,
      "end_time": null,
      "description": "",
      "photos": null,
      "winner_id": null,
      "state_id":null,
      "min_bid": null,
      "max_bid": null
    }

    setItemToBeAdded(item);
    setNewAuctionModalShow(true);
  };
  //tmp data
  let auctions = [
    {
      "id":0,
      "name": "Aukce A",
      "is_demand": false,
      "is_open": true,
      "price": 12354,
      "author_id": 1,
      "auctioneer_id": 2,
      "start_time":  new Date(2021, 12, 20, 10, 0, 0, 0),
      "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
      "description": "Skvělá aukce o věc v hodnotě milionů!",
      "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png", "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg", "https://pbs.twimg.com/media/E12BaOYXMAQeV9a.jpg", "https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/13F00/production/_95146618_bills.jpg"],
      "winner_id": null,
      "state_id":1, //schvaleno
      "min_bid": 250,
      "max_bid": null

    },
    {
      "id":1,
      "name": "Aukce B",
      "is_demand": true,
      "is_open": false,
      "price": 56489,
      "author_id": 0,
      "auctioneer_id":null,
      "start_time":  null,
      "end_time": null,
      "description": "Zbytečná aukce",
      "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "winner_id": null,
      "state_id":0, //zalozeno
      "min_bid": 20,
      "max_bid": null
    },
    {
      "id":2,
      "name": "Aukce C",
      "is_demand": true,
      "is_open": true,
      "price": 169,
      "author_id": 0,
      "auctioneer_id": 2,
      "start_time":  new Date(2021, 7, 20, 10, 0, 0, 0),
      "end_time": new Date(2020, 10, 2, 10, 0, 0, 0),
      "description": "Skvělá aukce o věc v hodnotě milionů!",
      "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "winner_id": 1,
      "state_id":5, //znam vitez,
      "min_bid": 250,
      "max_bid": null
    },
    {
      "id":3,
      "name": "Aukce D",
      "is_demand": false,
      "is_open": true,
      "price": 5613,
      "author_id": 0,
      "auctioneer_id": 2,
      "start_time":  new Date(2021, 11, 18, 10, 0, 0, 0),
      "end_time": new Date(2021, 11, 22, 10, 0, 0, 0),
      "description": "Skvělá aukce o věc v hodnotě milionů!",
      "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "winner_id": null,
      "state_id":3, //probihajici
      "min_bid": 250,
      "max_bid": null
    },
    {
      "id":4,
      "name": "Aukce D",
      "is_demand": false,
      "is_open": true,
      "price": 5613,
      "author_id": 0,
      "auctioneer_id": null,
      "start_time":  null,
      "end_time": null,
      "description": "Skvělá aukce o věc v hodnotě milionů!",
      "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "winner_id": null,
      "state_id":2, //zamitnuto
      "min_bid": 250,
      "max_bid": null
    }
  ]
  
  const {setIsLoggedIn, User, IsLoggedIn, setUser} = UseUserContext()
  //not admin or auctioneer
  if(!IsLoggedIn)
  {
    auctions = auctions.filter(item => item.state_id === 1 || item.state_id==3)
  }
  else if (User.role_id == 1) {
    auctions = auctions.filter(item => item.state_id === 1 || item.state_id==3 || item.author_id == User.id) //TODO or user is registered and auction winner is published
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
                <AuctionCard {...item} setChangeTime={setChangeTime} link={'/auction-detail/' + item.id}/>
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
      <EditTimeModal   
        show={editTimeModalShow}
        onHide={() => setEditTimeModalShow(false)}
        item={itemToChangeTime}
      />
    </>
  )
}