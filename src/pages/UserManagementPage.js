import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

import NewUserModal from '../components/NewUserModal';
import EditUserModal from '../components/EditUserModal';
import DeleteModal from '../components/DeleteModal';

import Styles from './../css/UserManagementPage.module.css'
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';

export default function UserManagementPage(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getAllUsers()
  }, [])
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
  const getAllUsers = () => {
    return (
      fetch("https://iis-api.herokuapp.com/users", {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        }
      }).then(CheckError)
        .then(jsonResponse => {
          setItems(jsonResponse)
          setIsLoaded(true)
        }).catch((error) => {
          console.log(error)
        })
    )}

const str_role = ["Neregistrovaný", "Uživatel", "Licitátor", "Administrátor"]

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

const onNewUserModalSubmit = (values, bag) => {
  values.role_id = Number(values.role_id)

  fetch('https://iis-api.herokuapp.com/users', {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
    },
    body: JSON.stringify(values)
  }).then(CheckError)
  .then(() => {
    getAllUsers()
    bag.setSubmitting(false)
    setNewUserModalShow(false)
  })
}

// Functions and states for editUserModal
const [editUserModalShow, setEditUserModalShow] = React.useState(false);
const [itemToBeEdited, setItemToBeEdited] = React.useState('');
const setEditedItem = (item) => {
  setItemToBeEdited(item);
  setEditUserModalShow(true);
};

const onEditUserModalSubmit = (values, bag) => {
  values.role_id = Number(values.role_id)

  fetch('https://iis-api.herokuapp.com/users', {
    method: 'PUT',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
    },
    body: JSON.stringify(values)
  }).then(CheckError)
  .then(() => {
    getAllUsers()
    bag.setSubmitting(false)
    setEditUserModalShow(false);
  })
}

// Functions and states for deleteUserModal
const [deleteUserModalShow, setDeleteUserModalShow] = React.useState(false);
const [itemToBeDeleted, setItemToBeDeleted] = React.useState({});
const setDeletedItem = (item) => {
  setItemToBeDeleted(item);
  setDeleteUserModalShow(true);
};

const deleteUser = function (props) {
  fetch('https://iis-api.herokuapp.com/users/' + props.item.id, {
    headers: { "Content-type": "application/json; charset=UTF-8", 'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') },
    method: 'DELETE'
  }).then(CheckError)
  .then(() => {
    getAllUsers()
    setDeleteUserModalShow(false)
  })
}

if (error) {
  console.log(error)
  return (
    <>
      {navigate("/error/" + error.ID + "/" + error.Text)}
    </>)
} else if (!isLoaded) {
  return (
    <>
      <Loading/>
    </>
  )
} else {
  return (
    <>
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
                    return (
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
        onSubmit={onNewUserModalSubmit}
      />

      <EditUserModal
        show={editUserModalShow}
        onHide={() => setEditUserModalShow(false)}
        item={itemToBeEdited}
        onSubmit={onEditUserModalSubmit}
      />

      <DeleteModal
        show={deleteUserModalShow}
        onHide={() => setDeleteUserModalShow(false)}
        item={itemToBeDeleted}
        title={"Vymazat uživatele"}
        bodyText={"Opravdu chcete vymazat uživatele " + itemToBeDeleted.email + "?"}
        action={deleteUser}
      />

    </>
  )
}
}