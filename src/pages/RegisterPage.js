import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import NavigationBar from '../components/NavigationBar';
import RegForm from '../components/RegForm';

import Styles from './../css/RegisterPage.module.css'

export default function RegisterPage(props) {
  return (
    <>
    <NavigationBar page="Home"/>
    <Container style={{height:"100%"}}>
      <Row style={{height:"100%"}}>
        <Col className={Styles.centerContent}>
          <div className={Styles.registerForm}>
            <RegForm/>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}