import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router'
import Styles from './../css/ErrorPage.module.css'
import {Link} from "react-router-dom"
export default function ErrorPage(props) {
    const {errorId, errorText} = useParams()
    return (
        <>
            <Container className={Styles.centerContent}>
                <h1 style={{ fontSize: 90 }}>{errorId}</h1>
                <h2> {errorText}</h2>
                <Link to="/"><Button variant='primary'  size="lg" style={{ margin: 20 }}>Home</Button></Link>
            </Container>
        </>
    )
}