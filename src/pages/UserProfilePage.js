import React from 'react'
import { Container } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import AuctionPreviewStyles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard' 
export default function UserProfilePage() {

    let myAuctions = [
        {
            "id":0,
            "name": "Aukce A",
            "is_demand": false,
            "is_open": true,
            "price": 12354,
            "author_id": 1,
            "auctioneer_id": 2,
            "start_time":  new Date(2021, 12, 20, 10, 0, 0, 0),
            "end_time": new Date(2021, 12, 2, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png", "https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg", "https://pbs.twimg.com/media/E12BaOYXMAQeV9a.jpg", "https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg", "https://ichef.bbci.co.uk/news/976/cpsprodpb/13F00/production/_95146618_bills.jpg"],
            "winner_id": null,
            "state_id":1, //schvaleno
            "min_bid": 250,
            "max_bid": null
          }]

    let followedAuctions = [
        {
            "id":3,
            "name": "Aukce D",
            "is_demand": false,
            "is_open": true,
            "price": 5613,
            "author_id": 0,
            "auctioneer_id": 2,
            "start_time":  new Date(2021, 11, 18, 10, 0, 0, 0),
            "end_time": new Date(2021, 11, 22, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": null,
            "state_id":3, //probihajici
            "min_bid": 250,
            "max_bid": null
          },
          {
            "id":4,
            "name": "Aukce D",
            "is_demand": false,
            "is_open": true,
            "price": 5613,
            "author_id": 0,
            "auctioneer_id": 1,
            "start_time":  new Date(2021, 10, 17, 10, 0, 0, 0),
            "end_time": new Date(2021, 10, 18, 10, 0, 0, 0),
            "description": "Skvělá aukce o věc v hodnotě milionů!",
            "photos": ["https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"],
            "winner_id": null,
            "state_id":1, //schvalena
            "min_bid": 250,
            "max_bid": null
          }
    ]

    return (
        <>
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