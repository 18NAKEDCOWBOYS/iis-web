import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';

import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

import NavigationBar from '../components/NavigationBar';
import UserDetail from '../components/UserDetail';

import Styles from './../css/UserManagementPage.module.css'

function NewUserModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0d6efd" }} id="contained-modal-title-vcenter">
          Tvorba nového uživatele
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ email: props.item.email, password: props.item.password, name: props.item.name, surname: props.item.surname, role_id: props.item.role_id }}
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
          onSubmit={(values, bag) => {
            fetch('https://iis-api.herokuapp.com/users', {
              method: 'PUT',
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body: JSON.stringify(values)
            }
            )
            bag.setSubmitting(false)
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
          }) => <UserDetail onHide={props.onHide} values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

function EditUserModal(props) {
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
          onSubmit={(values, bag) => {
            fetch('https://iis-api.herokuapp.com/users', {
              method: 'PUT',
              headers: { "Content-type": "application/json; charset=UTF-8" },
              body: JSON.stringify(values)
            }
            )
            bag.setSubmitting(false)
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
          }) => <UserDetail onHide={props.onHide} values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

function DeleteUserModal(props) {

  const deleteUser = function (props) {
    fetch('https://iis-api.herokuapp.com/users/' + props.item.id, {
      method: 'DELETE'
    })

    props.onHide();
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#0d6efd" }}>Vymazat uživatele</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Opravdu chcete vymazat uživatele: {props.item.email}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Zrušit</Button>
        <Button variant="danger" onClick={() => deleteUser(props)}>Vymazat</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function UserManagementPage(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://iis-api.herokuapp.com/users", {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const str_role = ["Neregistrovaný", "Registrovaný", "Licitátor", "Administrátor"]
  const users = [
    {
      "id": 1,
      "login": "xblbec92",
      "email": "xblbec92@naseskola.com",
      "name": "Pan",
      "surname": "Blbec",
      "password": "NejakejHash",
      "role_id": 1
    }, {
      "id": 2,
      "login": "muj-login",
      "email": "gahmednabeel6c@litg.site",
      "name": "IQ",
      "surname": "Nulove",
      "password": "123456",
      "role_id": 2
    }, {
      "id": 3,
      "login": "camelwater",
      "email": "ujuelzj84i@ebialrh.com",
      "name": "Jana",
      "surname": "Ivanečková",
      "password": "TonamoTaTEnT",
      "role_id": 0
    }, {
      "id": 4,
      "login": "kittenbee",
      "email": "9haithamewushl@sewce.com",
      "name": "Karel",
      "surname": "Prdel",
      "password": "DORShINdbaND",
      "role_id": 2
    }, {
      "id": 5,
      "login": "papillonfox",
      "email": "emidodola9312@nproxi.com",
      "name": "Papi",
      "surname": "Fox",
      "password": "KIstOsTRIXEn",
      "role_id": 3
    },
  ]

  // Functions and states for newUserModal
  const [newUserModalShow, setNewUserModalShow] = React.useState(false);
  const [itemToBeAdded, setItemToBeAdded] = React.useState('');
  const setNewItem = () => {
    const item = {
      "id": null,
      "login": "",
      "email": "",
      "name": "",
      "surname": "",
      "password": "",
      "role_id": null
    };

    setItemToBeAdded(item);
    setNewUserModalShow(true);
  };

  // Functions and states for editUserModal
  const [editUserModalShow, setEditUserModalShow] = React.useState(false);
  const [itemToBeEdited, setItemToBeEdited] = React.useState('');
  const setEditedItem = (item) => {
    setItemToBeEdited(item);
    setEditUserModalShow(true);
  };

  // Functions and states for deleteUserModal
  const [deleteUserModalShow, setDeleteUserModalShow] = React.useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = React.useState('');
  const setDeletedItem = (item) => {
    setItemToBeDeleted(item);
    setDeleteUserModalShow(true);
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(items)
    return (
      <>
        <NavigationBar page="usr-man" />
        <Container style={{ paddingTop: 70 }}>
          <Row >
            <Col className={Styles.centerContent}>
              <label style={{ width: "100%", textAlign: 'left', paddingBottom: 40, color: "#0d6efd", fontSize: "30px" }}>Seznam uživatelů</label>
              <div style={{ width: '100%', overflow: 'auto' }}>
                <Table hover striped style={{ textAlign: 'center' }}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>E-mail</th>
                      <th>Jméno</th>
                      <th>Příjmení</th>
                      <th>Heslo</th>
                      <th>Role</th>
                      <th>Smazat</th>
                      <th>Upravit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => {
                      return(
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.password}</td>
                        <td>{str_role[item.role_id]}</td>
                        <td><Button onClick={() => setDeletedItem(item)} style={{ border: 0, backgroundColor: "#ffffff00" }}><FaTrashAlt color="#0d6efd" size="20" /></Button></td>
                        <td><Button onClick={() => setEditedItem(item)} style={{ border: 0, backgroundColor: "#ffffff00" }}><FaUserEdit color="#0d6efd" size="24" /></Button></td>
                      </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
              <div style={{ width: '100%', padding: '10px' }}>
                <Button variant='primary' onClick={() => setNewItem()} >Přidat nového uživatele</Button>
              </div>
            </Col>
          </Row>
        </Container>

        <NewUserModal
          show={newUserModalShow}
          onHide={() => setNewUserModalShow(false)}
          item={itemToBeAdded}
        />

        <EditUserModal
          show={editUserModalShow}
          onHide={() => setEditUserModalShow(false)}
          item={itemToBeEdited}
        />

        <DeleteUserModal
          show={deleteUserModalShow}
          onHide={() => setDeleteUserModalShow(false)}
          item={itemToBeDeleted}
        />

      </>
    )
  }
}