import React from 'react'
import {Formik} from 'formik'
import AuctionTimeForm from './AuctionTimeForm';
import Modal from 'react-bootstrap/Modal';


export default function EditTimeModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color:"#0d6efd"}} id="contained-modal-title-vcenter">
            Nastavení času aukce 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
                //initialValues={{ name:props.values.name, is_open:props.values.is_open,is_demand:props.values.is_demand, price:props.values.price, min_bid:props.values.min_bid, max_bid:props.values.max_bid, description:props.values.description, files:props.values.files}}
                
                initialValues={{ start_time:props.start_time, end_time:props.end_time}}
                validate={values => {
                  const errors = {};
                  
                  if(!values.start_time){
                    errors.start_time="Nenastavili jste začátek aukce";
                  }
                  if(!values.end_time){
                    errors.end_time="Nenastavili jste konec aukce";
                  }

                  return errors;
                }}
                onSubmit={(values, bag) => {
                  setTimeout(() => {
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
                }) => <AuctionTimeForm onHide={props.onHide} values={values} errors={errors} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} setFieldValue={setFieldValue}/>}
              </Formik>
        </Modal.Body>
      </Modal>
    );
  }