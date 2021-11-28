import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Container } from 'react-bootstrap';

import Styles from '../css/Loading.module.css'

export default function Loading(bag) {

  return (
    <Container className={Styles.fullCenterContent}>
      <h1 style={{ fontSize: 90 }}>Loading</h1>
      <Button variant='primary' href='/' size="lg" style={{ margin: 20 }}>Home</Button>
    </Container>
  )
}