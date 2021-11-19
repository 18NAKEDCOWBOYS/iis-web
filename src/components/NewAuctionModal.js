import React from 'react'
import {Formik} from 'formik'
import AuctionForm from './AuctionForm';
import Modal from 'react-bootstrap/Modal';
export default function NewAuctionModal(props) {
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