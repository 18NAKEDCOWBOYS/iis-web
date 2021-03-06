import React from 'react'
import { Container } from 'react-bootstrap'
import { Tab, Tabs } from 'react-bootstrap'
import AuctionPreviewStyles from './../css/AuctionsPage.module.css'
import AuctionCard from '../components/AuctionCard'
import { UseUserContext } from "../userContext";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../components/Loading"
export default function UserProfilePage() {

    
    const [auctions, setAuctions] = useState([]);
    const {User, IsLoggedIn } = UseUserContext()
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadAuctions = () => {
        return (fetch("https://iis-api.herokuapp.com/auctions")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAuctions(result)

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            ))
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(!IsLoggedIn)
        {
            navigate("/error/403/Unauthorized")
        }
        loadAuctions()
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
       return <Loading/>
    }
    else {
        return (
            <>
                <Container className="mainContainer">
                    <h1>{User.name + " " + User.surname}</h1>
                    <div style={{ fontSize: 20 }}>
                        <p>Email: {User.email}</p>
                        <p>Role: {User.role.name}</p>
                    </div>

                    <Tabs defaultActiveKey="MyAuctions" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="MyAuctions" title="Moje aukce">
                            <h2>Moje aukce</h2>
                            <Container className={AuctionPreviewStyles.flexContainer}>
                                {auctions.sort((a,b)=>{return a.id < b.id ? 1 : -1}).map(item => {
                                    if (item.author_id === User.id) {
                                        return (
                                            <AuctionCard {...item} link={'/auction-detail/' + item.id} />
                                        )
                                    }
                                        return null
                                })}
                            </Container>
                        </Tab>
                        <Tab eventKey="RegisteredAuctions" title="Aukce, do kter??ch jste se registroval">
                            <h2>Aukce, do kter??ch jste se registroval</h2>
                            <Container className={AuctionPreviewStyles.flexContainer}>
                                {auctions.sort((a,b)=>{return a.id < b.id ? 1 : -1}).map(item => {
                                    if (item.bidders.some(bidder => bidder.user_id == User.id)) {
                                        return (
                                            <AuctionCard {...item} link={'/auction-detail/' + item.id} />
                                        )
                                    }
                                    return null
                                })}
                            </Container>
                        </Tab>
                        {User.role_id > 1 ?
                            <Tab eventKey="AuctioneerAuctions" title="Aukce, v kter??ch jste licit??torem ">
                                <h2>Aukce, v kter??ch jste licit??torem </h2>
                                <Container className={AuctionPreviewStyles.flexContainer}>
                                    {auctions.sort((a,b)=>{return a.id < b.id ? 1 : -1}).map(item => {
                                        if (item.auctioneer_id == User.id) {
                                            return (
                                                <AuctionCard {...item} link={'/auction-detail/' + item.id} />
                                            )
                                        }
                                        return null
                                    })}
                                </Container>
                            </Tab> 
                            :

                            ""

                        }
                    </Tabs>


                </Container>
            </>
        )
    }
}