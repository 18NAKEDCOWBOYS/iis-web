import React from 'react'
import { Formik } from 'formik'
import Modal from 'react-bootstrap/Modal';
import UserDetail from '../components/UserDetail';

export default function EditUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0d6efd" }} id="contained-modal-title-vcenter">
          Upravení uživatele
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ id: props.item.id, email: props.item.email, password: props.item.password, name: props.item.name, surname: props.item.surname, role_id: props.item.role_id }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Nezadali jste e-mailovou adresu';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Nesprávný formát e-mailové adresy';
            }

            if (!values.password) {
              errors.password = 'Nezadali jste heslo';
            } else if (values.password.length < 8) {
              errors.password = 'Heslo je příliš krátké';
            }

            if (!values.name) {
              errors.name = 'Nezadali jste jméno'
            }

            if (!values.surname) {
              errors.surname = 'Nezadali jste příjmení'
            }
            if (!values.role_id) {
              errors.role_id = 'Vyberte prosím roli uživatele'
            }
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
            isSubmitting,
          }) => <UserDetail onHide={props.onHide} values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}