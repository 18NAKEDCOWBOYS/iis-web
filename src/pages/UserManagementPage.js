import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {Formik} from 'formik';

import { FaTrashAlt, FaUserEdit } from "react-icons/fa";

import NavigationBar from '../components/NavigationBar';
import UserDetail from '../components/UserDetail';

import Styles from './../css/UserManagementPage.module.css'

function NewModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{color:"#0d6efd"}} id="contained-modal-title-vcenter">
          Tvorba nového uživatele 
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
              }) => <UserDetail values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting}/>}
            </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Zrušit</Button>
        <Button variant='primary' onClick={props.onHide}>Uložit nového uživatele</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{color:"#0d6efd"}} id="contained-modal-title-vcenter">
          Upravení uživatele
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
              }) => <UserDetail values={values} errors={errors} status={status} touched={touched} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting}/>}
            </Formik>        

      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.onHide}>Zrušit</Button>
        <Button variant='primary' onClick={props.onHide}>Uložit změny</Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props){
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{color:"#0d6efd"}}>Vymazat uživatele</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Opravdu chcete vymazat uživatele: "někdo"
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Zrušit</Button>
        <Button variant="danger" onClick={props.onHide}>Vymazat</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function UserManagementPage(props) {
    const [newModalShow, setNewModalShow] = React.useState(false);
    const [editModalShow, setEditModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const str_role=["Neregistrovaný", "Registrovaný", "Licitátor", "Administrátor"]
    const users= [
   {
    "id":1,
    "login":"xblbec92",
    "email":"xblbec92@naseskola.com",
    "name":"Pan",
    "surname":"Blbec",
    "password":"NejakejHash",
    "role_id":1
   },{
    "id":2,
    "login":"muj-login",
    "email":"gahmednabeel6c@litg.site",
    "name":"IQ",
    "surname":"Nulove",
    "password":"123456",
    "role_id":2
   },{
    "id":3,
    "login":"camelwater",
    "email":"ujuelzj84i@ebialrh.com",
    "name":"Jana",
    "surname":"Ivanečková",
    "password":"TonamoTaTEnT",
    "role_id":0
   },{
    "id":4,
    "login":"kittenbee",
    "email":"9haithamewushl@sewce.com",
    "name":"Karel",
    "surname":"Prdel",
    "password":"DORShINdbaND",
    "role_id":2
   },{
    "id":5,
    "login":"papillonfox",
    "email":"emidodola9312@nproxi.com",
    "name":"Papi",
    "surname":"Fox",
    "password":"KIstOsTRIXEn",
    "role_id":3
   },
] 
  return (
    <>
    <NavigationBar page="usr-man"/>
    <Container style={{paddingTop:70}}>
      <Row >
        <Col className={Styles.centerContent}>
          <label style={{width:"100%",textAlign:'left' ,paddingBottom:40, color:"#0d6efd", fontSize:"30px"}}>Seznam uživatelů</label>
          <Table hover striped style={{textAlign:'center'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Uživatelké jméno</th>
                <th>Jméno</th>
                <th>Příjmení</th>
                <th>Heslo</th>
                <th>Role</th>
                <th>Smazat</th>
                <th>Upravit</th>
              </tr>
            </thead>
            <tbody>
              {users.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{ item.id}</td> 
                    <td>{ item.login}</td>
                    <td>{ item.name}</td>
                    <td>{ item.surname}</td>
                    <td>{ item.password}</td>
                    <td>{ str_role[item.role_id]}</td>
                    <td><Button onClick={() => setDeleteModalShow(true)} style={{border:0, backgroundColor:"#ffffff00"}}><FaTrashAlt color="#0d6efd" size="20"/></Button></td>
                    <td><Button onClick={() => setEditModalShow(true)} style={{border:0, backgroundColor:"#ffffff00"}}><FaUserEdit color="#0d6efd" size="24"/></Button></td>
                  </tr>
                );
              })}  
            </tbody>
          </Table>
          <div style={{width:'100%', padding:'10px'}}>
            <Button variant='primary' onClick={() => setNewModalShow(true)} >Přidat nového uživatele</Button>
          </div>
        </Col>
      </Row>
    </Container>
    
    <NewModal
      show={newModalShow}
      onHide={() => setNewModalShow(false)}
    />

    <EditModal
      show={editModalShow}
      onHide={() => setEditModalShow(false)}

    />

    <DeleteModal
      show={deleteModalShow}
      onHide={() => setDeleteModalShow(false)}
    />

    </>
  )
}