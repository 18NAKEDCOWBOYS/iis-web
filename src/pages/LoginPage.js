import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import NavigationBar from './../components/NavigationBar';

import Styles from './../css/LoginPage.module.css'

export default function LoginPage(props) {
  return (
    <>
    <NavigationBar page="Login"/>
    <Container style={{height:"100%"}}>
      <Row style={{height:"100%"}}>
        <Col className="example-square shadow-lg" className={Styles.centerContent}>
          <div className={Styles.loginForm}>
            <Form>
              <label style={{width:"100%",textAlign:'center' ,paddingBottom:40, color:"#0d6efd", fontSize:"30px"}}>Zadejte přihlašovací údaje</label>

              <FloatingLabel controlId="floatingInput" label="Emailová adresa" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Heslo">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>

              <div style={{ paddingTop: 30 }} className="d-grid align-items-center">
                <Button variant="primary" type="submit" size="lg">Přihlásit se</Button>
              </div>

              <div style={{width:"100%", textAlign:"center", paddingTop:10}}>
                <label style={{marginRight:5}}>Ještě nemáte účet?</label><Link to="/register">Zaregistrujte se!</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}