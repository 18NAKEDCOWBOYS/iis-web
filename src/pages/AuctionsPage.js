import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import NewAuctionModal from '../components/NewAuctionModal'
import EditTimeModal from '../components/EditTimeModal'
import { UseUserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { MultiSelect } from "react-multi-select-component";
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

  const onSubmitNewAuction = (values, bag) => {
    console.log(bag)
    /*fetch('https://iis-api.herokuapp.com/auctions', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify(values)
    }).then(() => {
      loadAuctions()
      bag.setSubmitting(false)
      setNewAuctionModalShow(false)
    })*/
  }



  const { User} = UseUserContext()

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auctions, setAuctions] = useState([]);


  const loadAuctions = () => {
    return (fetch("https://iis-api.herokuapp.com/auctions")
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

  const options = [
    { value: '1', label: 'Neschválena' },
    { value: '3', label: 'Zamítnuta' },
    { value: '6', label: 'Naplánována' },
    { value: '7', label: 'Probíhající' },
    { value: '8', label: 'Ukončeno přijímání nabídek' },
    { value: '5', label: 'Vyhodnocena' },
  ]

  //TODO mazani jen autor nebo licitator
  //not admin or auctioneer

  const [selected, setSelected] = useState([]);

  const filterByOptions = (auctionsParam) => {
    if (selected.length == 0 || selected.length == options.length) {
      return auctionsParam
    }
    else {
      let filtered_auctions = []
      for (let auction in auctionsParam) {
        selected.forEach(option => {
          if (auctionsParam[auction].state_id == 2) {
            if ((option.value == '6' && auctionsParam[auction].start_time > Date.now()) ||  //naplanovana
              (option.value == '7' && new Date(auctionsParam[auction].start_time) <= Date.now() && new Date(auctionsParam[auction].end_time) > Date.now()) || //probiha
              (option.value == '8' && new Date(auctionsParam[auction].end_time) <= Date.now())) //ukoncena, nevyhlasen vitez
            {
              filtered_auctions.push(auctionsParam[auction])
            }
          }
          else {
            if (auctionsParam[auction].state_id == option.value) {
              filtered_auctions.push(auctionsParam[auction])
            }
          }
        });
      }
      return filtered_auctions
    }

  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <>

        <Container className="mainContainer">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.8, }}>
              <h1 style={{ paddingBottom: 0 }}> Přehled aukcí</h1>
            </div>
            <div style={{ flex: 0.2, textAlign: 'right', padding: 20 }}>
              <Button variant='primary' onClick={() => setNewItem()} >Přidat novou aukci</Button>
            </div>
          </div>


          <div style={{ padding: 10 }}>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              overrideStrings={{
                "allItemsAreSelected": "Jsou vybrány všechny možnosti",
                "clearSearch": "Vymazat vyhledávání",
                "clearSelected": "Zrušit vybrané",
                "noOptions": "Žádné možnosti",
                "search": "Vyhledat",
                "selectAll": "Vybrat všechny stavy",
                "selectAllFiltered": "Vybrat vše (vyfiltrované)",
                "selectSomeItems": "Stav aukce",
                "create": "Vytvořit"
              }}
            />
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
          onSubmit={onSubmitNewAuction()}
        />
        <EditTimeModal
          show={editTimeModalShow}
          onHide={() => setEditTimeModalShow(false)}
          loadAuctions={loadAuctions}
          user={User}
          {...itemToChangeTime}
        />
      </>
    );
  }
}