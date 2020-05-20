import React from 'react'
import {Container, Row, Col, Button, Image} from 'react-bootstrap'
import  {Card} from "react-bootstrap";

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
                            <p>Research Collective?</p>
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

            {/*this section is for "Why Research Collective"*/}
            <div className='homepage-why'>
                <p className='section-header'>Why Research Collective ?</p>
                <Container>
                    <Row>
                        {/*Resilient*/}
                        <Col>
                            <Card>
                                <Card.Img className='glyph' variant='top' src='homepage-glyph/resilient.png' />
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Resilient</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        Research Collective is an
                                        evolving social protocol that
                                        fosters coordination between
                                        DAOs, humans, and legal entities
                                        to accomplish feats that may
                                        seem impossible.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/*Immutable*/}
                        <Col>
                            <Card>
                                <Card.Img className='glyph' variant='top' src='/homepage-glyph/immutable.png' />
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Immutable</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        Distributed ledgers are
                                        used to timestamp
                                        evidence, streamlining intellectual property claims and preventing researchers from changing their
                                        hypotheses to fit their experiment’s data.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/*Open*/}
                        <Col>
                            <Card>
                                <Card.Img className='glyph' variant='top' src='/homepage-glyph/open.png'/>
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Open</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        We are a non-hierarchical, global
                                        network of researchers working towards
                                        open-source biotechnology and its
                                        availability to the masses as rapidly
                                        as ethically possible.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>


            {/*this section is for 'Resources'*/}
            <Container>
                <div className='resources-section'>
                    <p className='section-header'>Resources</p>
                        <p className='homepage-resources-text'>
                            It is a long established fact that a reader will be distracted by the readable content
                            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                            more-or-less normal distribution of letters
                        </p>
                        <Image src='homepage-glyph/resources-image.png' fluid={true}/>
                        <Button>Check Out Our Resources</Button>
                </div>
            </Container>
        </div>
    )
}
export default Home;