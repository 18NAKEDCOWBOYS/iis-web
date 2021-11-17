import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
export default function UserProfilePage() {
    return (
        <>
            <NavigationBar page="user-profile" />
            <Container className="mainContainer">
                <h1>Bohuš Veselý</h1>
                <div style={{ fontSize: 20 }}>
                    <p>Email: Bohuš@email.cz</p>
                    <p>Role: Registrovaný uživatel</p>
                </div>

                <Tabs defaultActiveKey="MyAuctions" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="MyAuctions" title="Moje aukce">
                    <h2>Moje aukce</h2>
                TODO nahledy
                    </Tab>
                    <Tab eventKey="FollowedAuctions" title="Aukce, kterých se účastním">
                    <h2>Sledované aukce</h2>
                TODO nahledy
                    </Tab>
                </Tabs>
                
                
            </Container>
        </>
    )
}