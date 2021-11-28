import React from 'react';

import { Container } from 'react-bootstrap';

import Styles from '../css/Loading.module.css'

export default function Loading(bag) {

  return (
    <Container className={Styles.fullCenterContent}>
      <h1 style={{ fontSize: 90 }}>Loading</h1>
    </Container>
  )
}