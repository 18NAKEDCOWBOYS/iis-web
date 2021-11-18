import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { Container } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import AuctionPreviewStyles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard' 
export default function UserProfilePage() {

    let myAuctions = [
        {
            "id": 0,
            "name": "Aukce A",
            "type": "Nabídka",
            "rules": "Otevřená",
            "price": 12354,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": true,
            "auctioneer_id": 2,
            "author_id": 0
        }]

    let followedAuctions = [
        {
            "id":3,
            "name": "Aukce D",
            "type": "Nabídka",
            "rules": "Otevřená",
            "price": 2,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": true,
            "auctioneer_id": 1,
            "author_id": 2
          },
          {
            "id":4,
            "name": "Aukce E",
            "type": "Poptávka",
            "rules": "Uzavřená",
            "price": 7823,
            "images": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "approved": false,
            "auctioneer_id": undefined,
            "author_id": 1
          }
    ]

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
                        <Container className={AuctionPreviewStyles.flexContainer}>
                            {myAuctions.map(item => {
                                return (
                                    <div style={{ padding: 15 }}>
                                        <AuctionCard {...item} link={'/auction-detail/' + item.id} />
                                    </div>
                                )
                            })}
                        </Container>
                    </Tab>
                    <Tab eventKey="FollowedAuctions" title="Aukce, kterých se účastním">
                        <h2>Sledované aukce</h2>
                        <Container className={AuctionPreviewStyles.flexContainer}>
                            {followedAuctions.map(item => {
                                return (
                                    <div style={{ padding: 15 }}>
                                        <AuctionCard {...item} link={'/auction-detail/' + item.id} />
                                    </div>
                                )
                            })}
                        </Container>
                    </Tab>
                </Tabs>


            </Container>
        </>
    )
}