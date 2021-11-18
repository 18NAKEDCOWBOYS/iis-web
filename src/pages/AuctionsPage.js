import React from 'react'

import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Container';
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
              initialValues={{ email: '', password: '', name:'', surname:'', role:null}}
              validate={values => {
                const errors = {};
                if(!values.email){
                  errors.email = 'Nezadali jste e-mailovou adresu';
                }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Nesprávný formát e-mailové adresy';
                }
                
                if(!values.password){
                  errors.password = 'Nezadali jste heslo';
                }else if (values.password.length < 8){
                  errors.password = 'Heslo je příliš krátké';
                }

                if(!values.name){
                  errors.name='Nezadali jste jméno'
                }
                
                if(!values.surname){
                  errors.surname='Nezadali jste příjmení'
                }
                if(!values.role){
                  errors.role = 'Vyberte prosím roli uživatele'
                }
                return errors;
              }}
              onSubmit={(values, bag) => {
                setTimeout(() => {
                  console.log('This will run after 2 second!');
                  bag.setSubmitting(false);
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
              }) => <AuctionForm onHide={props.onHide} values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting}/>}
            </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default function AuctionsPage(props) {
  const [newAuctionModalShow, setNewAuctionModalShow] = React.useState(false);

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
      "auctioneer_id": 2
    },
    {
      "id":1,
      "name": "Aukce B",
      "type": "Nabídka",
      "rules": "Uzavřená",
      "price": 50,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": undefined
    },
    {
      "id":2,
      "name": "Aukce C",
      "type": "Poptávka",
      "rules": "Otevřená",
      "price": 542133,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": false,
      "auctioneer_id": 2
    },
    {
      "id":3,
      "name": "Aukce D",
      "type": "Nabídka",
      "rules": "Otevřená",
      "price": 2,
      "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
      "approved": true,
      "auctioneer_id": 1
    },
    {
      "id":4,
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
    auctions = auctions.filter(item => item.approved === true)
  }
  return (
    <>
      <NavigationBar page="auctions" />
      <Container className="mainContainer">

        <h1>Přehled aukcí</h1>
        <div style={{width:'100%', padding:'10px'}}>
          <Button variant='primary' onClick={() => setNewAuctionModalShow(true)} >Přidat novou aukci</Button>
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
    </>
  )
}