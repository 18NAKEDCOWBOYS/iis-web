import React from 'react'
import { Formik } from 'formik'
import Modal from 'react-bootstrap/Modal';

import PickWinnerForm from './PickWinnerForm';

export default function PickWinnerModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0d6efd" }} id="contained-modal-title-vcenter">
          Výběr výherce aukce
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ bidders : props.item.bidders }}
          validate={values => {
            const errors = {};
            console.log(props.item)
            //if (!values.bidders) {
            //  errors.bidders= 'Nevybral'
            //}
            return errors;
          }}
          onSubmit={(values, bag) => {props.onSubmit(values, bag)}}
        >
          {({
            values,
            errors,
            status,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting
          }) => <PickWinnerForm onHide={props.onHide} values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}