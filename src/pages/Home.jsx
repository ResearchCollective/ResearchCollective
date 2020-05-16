import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
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
                            <Button className='contact-us-btn'>Contact Us</Button>
                        </Col>
                        <Col className='homepage-hero-c2'>
                            <p className='about-rs'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                            <span className='call-to-action'>
                                <Button className='call-to-action-btn'>I am here to publish</Button>
                                <Button className='call-to-action-btn'>I am here to research</Button>
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Home;