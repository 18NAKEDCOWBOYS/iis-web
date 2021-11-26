import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Styles from './../css/ErrorPage.module.css'

export default function ErrorPage(props) {
    return (
        <>
            <Container className={Styles.centerContent}>
                <h1 style={{ fontSize: 90 }}>{props.errorId}</h1>
                <h2> {props.errorText}</h2>
                <Button variant='primary' href='/' size="lg" style={{ margin: 20 }}>Home</Button>
            </Container>
        </>
    )
}