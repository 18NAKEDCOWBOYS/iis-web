import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import NavigationBar from '../components/NavigationBar';
import RegForm from '../components/RegForm';

import Styles from './../css/RegisterPage.module.css'
import AuctionCard from '../components/AuctionCard';

export default function AuctionsPage(props) {
  return (
    <>
    <NavigationBar page="Auctions"/>
    <Container style={{paddingTop:70}}>
    <AuctionCard title="Aukce A" text="Totot je nějaká aukce A. Je fakt mega dobrá"/> <AuctionCard title="Aukce B" text="Totot je nějaká aukce B. Je fakt nahovno"/> 
    </Container>
    </>
  )
}