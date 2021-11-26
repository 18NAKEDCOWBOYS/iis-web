import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import NewAuctionModal from '../components/NewAuctionModal'
import EditTimeModal from '../components/EditTimeModal'
import { UseUserContext } from "../userContext";
import { useState, useEffect } from 'react';
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
      "id": null,
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
      "state_id": null,
      "min_bid": null,
      "max_bid": null
    }

    setItemToBeAdded(item);
    setNewAuctionModalShow(true);
  };



  const { setIsLoggedIn, User, IsLoggedIn, setUser } = UseUserContext()

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auctions, setAuctions] = useState([]);


  const loadAuctions = () => {
    return (    fetch("https://iis-api.herokuapp.com/auctions")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setAuctions(result)

      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    ))
  }
  useEffect(() => {
    loadAuctions()
  }, [])


//TODO mazani jen autor nebo licitator
  //not admin or auctioneer



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (

      <>
        <Container className="mainContainer">

          <h1>Přehled aukcí</h1>
          <div style={{ width: '100%', padding: '10px' }}>
            <Button variant='primary' onClick={() => setNewItem()} >Přidat novou aukci</Button>
          </div>
          <Container className={Styles.flexContainer}>
            {auctions.map(item => {
              return (
                  <AuctionCard {...item} setChangeTime={setChangeTime} link={'/auction-detail/' + item.id} loadAuctions={loadAuctions} />
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
          loadAuctions = {loadAuctions}
          user={User}
          {...itemToChangeTime}
        />
      </>
    );
  }
}