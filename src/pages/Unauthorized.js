import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Styles from './../css/Unauthorized.module.css'

export default function Unauthorized(props) {
    return (
        <>
            <Container className={Styles.centerContent}>
                <h1 style={{ fontSize: 90 }}>Error 401</h1>
                <h2> Unauthorized</h2>
                <Button variant='primary' href='/' size="lg" style={{ margin: 20 }}>Home</Button>
            </Container>
        </>
    )
}