import React from 'react'


import NavigationBar from './../components/NavigationBar';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import { Link } from 'react-router-dom';

export default function Home(props){
    return(
        <>
        <NavigationBar page="Home"/>
        <div>
            Čůs
            <a href="/Login">Login</a>
        </div>
        </>
    )
}