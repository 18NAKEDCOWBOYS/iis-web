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
import Loading from "../components/Loading"
import { useNavigate } from 'react-router';
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

  const { User, IsLoggedIn} = UseUserContext()

  const onSubmitNewAuction = (values, bag) => {
    console.log(User)
    values.is_demand= values.is_demand=="true"?true:false
    values.is_open= values.is_open=="true"?true:false
    fetch('https://iis-api.herokuapp.com/auctions', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify(values)
    }).then(CheckError)
    .then(() => {
      loadAuctions()
      bag.setSubmitting(false)
      setNewAuctionModalShow(false)
    })
  }



  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [auctions, setAuctions] = useState([]);

  function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      let err =[]
      err["ID"] = response.status
      err["Text"] = response.statusText
      setError(err)
      setIsLoaded(true)
    }
  }

  const loadAuctions = () => {
    return (fetch("https://iis-api.herokuapp.com/auctions")
      .then(CheckError)
      .then(
        (result) => {
          setIsLoaded(true);
          setAuctions(result)
        }
      ))
  }
  useEffect(() => {
    loadAuctions()
  }, [])

  const options = [
    { value: '1', label: 'Neschv??lena' },
    { value: '3', label: 'Zam??tnuta' },
    { value: '6', label: 'Napl??nov??na' },
    { value: '7', label: 'Prob??haj??c??' },
    { value: '8', label: 'Ukon??eno p??ij??m??n?? nab??dek' },
    { value: '5', label: 'Vyhodnocena' },
  ]

  const navigate = useNavigate()
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
            if ((option.value == '6' && new Date(auctionsParam[auction].start_time) > Date.now()) ||  //naplanovana
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
    return (
    <>
      {navigate("/error/" + error.ID + "/" + error.Text)}
    </>)
  } else if (!isLoaded) {
    return <Loading/>
  } else {
  
    return (
      <>

        <Container className="mainContainer">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.8, }}>
              <h1 style={{ paddingBottom: 0 }}> P??ehled aukc??</h1>
            </div>
            <div style={{ flex: 0.2, textAlign: 'right', padding: 20 }}>
              {IsLoggedIn && <Button variant='primary' onClick={() => setNewItem()} >P??idat novou aukci</Button>}
            </div>
          </div>


          <div style={{ padding: 10 }}>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              overrideStrings={{
                "allItemsAreSelected": "Jsou vybr??ny v??echny mo??nosti",
                "clearSearch": "Vymazat vyhled??v??n??",
                "clearSelected": "Zru??it vybran??",
                "noOptions": "????dn?? mo??nosti",
                "search": "Vyhledat",
                "selectAll": "Vybrat v??echny stavy",
                "selectAllFiltered": "Vybrat v??e (vyfiltrovan??)",
                "selectSomeItems": "Stav aukce",
                "create": "Vytvo??it"
              }}
            />
          </div>
          <Container className={Styles.flexContainer}>
            {/* sort auctions by id descending and filter by multiselect filter options */}
            {filterByOptions(auctions).sort((a,b)=>{return a.id < b.id ? 1 : -1}).map(item => {
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
          onSubmit={onSubmitNewAuction}
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