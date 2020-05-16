import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
const Home = () => {
    return(
        //this div represents the 'whole' homepage//
        <div className='homepage'>
            {/*this div represents the first element (hero) of the landing page*/}
            <div className='homepage-hero'>
                <Container>
                    <Row>
                        <Col className='homepage-hero-c1'>
                            <p>What is</p>
                            <p>Research Collective</p>
                            <button>Contact Us</button>
                        </Col>
                        <Col>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Home;