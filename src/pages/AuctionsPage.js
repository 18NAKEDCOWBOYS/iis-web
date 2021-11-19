import React from 'react'

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../components/NavigationBar';
import Styles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard';
import AuctionForm from '../components/AuctionForm';
import {Formik} from 'formik'

function NewAuctionModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{color:"#0d6efd"}} id="contained-modal-title-vcenter">
          Tvorba nové aukce
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
              initialValues={{ name:'', is_open:null,is_demand:null, price:null, min_bid:null, max_bid:null, description:'', files:null }}
              validate={values => {
                const errors = {};
                if(!values.name){
                  errors.name='Nezadali jste jméno aukce'
                }
                
                if(!values.is_open){
                  errors.is_open = 'Vyberte prosím typ aukce'
                }
 
                if(!values.is_demand){
                  errors.is_demand = 'Vyberte prosím pravidla aukce'
                }
                
                if(!values.price){
                  errors.price='Nezadali jste vyvolávací cenu'
                }

                if(!values.files){
                  errors.files='Nevybrali jste žádný obrázek'
                }

                if(!values.description){
                  errors.description='Nezadali jste popisek'
                }
                return errors;
              }}
              onSubmit={(values, bag) => {
                setTimeout(() => {
                  console.log('This will run after 2 second!');
                  console.log(values.files) 
                  bag.setSubmitting(false);
                  props.onHide();
                }, 2000);
              }}
            >
              {({
               values,
               errors,
               status,
               touched,
               handleChange,
               handleSubmit,
               isSubmitting,
               setFieldValue,
              }) => <AuctionForm onHide={props.onHide} values={values} errors={errors} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} setFieldValue={setFieldValue}/>}
            </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default function AuctionsPage(props) {
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