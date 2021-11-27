import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { UseUserContext } from "../userContext";
import NavigationBar from '../components/NavigationBar';
import RegForm from '../components/RegForm';
import Styles from './../css/RegisterPage.module.css'
import { useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';

export default function RegisterPage(props) {
  const navigate = useNavigate();
  const {IsLoggedIn} = UseUserContext()
  useEffect(() => {
    if (IsLoggedIn)
    {
      navigate("/")
    }
  }, [])

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