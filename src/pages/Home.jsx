import React from 'react'
import {Container, Row, Col, Image, InputGroup, FormControl, Form} from 'react-bootstrap';
import { Button }  from '@aragon/ui'
import { Link } from "react-router-dom";
import  {Card} from "react-bootstrap";

const Home = () => {

    return(
        //this div represents the 'whole' homepage//
        <div className='homepage'>
            <Container>
            {/*this div represents the first element (hero) of the landing page*/}
                <div className='homepage-hero'>
                    <Row>
                        <Col className='homepage-hero-c1'>
                            <h1>Decentralized Science</h1>
                            <p>Powered by Self-Sovereign Researchers & </p>
                            <p>a Swarm of Expert DAOs</p>
                            <a target="_blank" href="https://luisivan.net/posts/expert-daos"><Button className='contact-us-btn'>What is an Expert DAO?</Button></a>
                        </Col>
                        <Col className='homepage-hero-c2'>
                            <p className='about-rs'>Develop your expertise. </p>
                            <p> Earn currency and kudos. </p>
                            <p className='about-rs'>Expert DAO members curate content and arbitrate decisions in a swarm of domains.</p>
                            <span className='call-to-action'>
                                <a href="https://tristanerr.typeform.com/to/VOEZ4F"><Button mode="strong" className='call-to-action-btn'>Apply to be a Curator</Button></a>
                            </span>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/*this section is for "Why Research Collective"*/}
            <Container>
                <div className='homepage-why'>
                    <Row>
                        {/*Resilient*/}
                        <Col>
                            <Card>
                                <Card.Img className='glyph' variant='top' src='homepage-glyph/resilient.png' />
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Resilient</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        Research Collective is an
                                        evolving social, legal, and ethereal
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
                                    <Card.Title className='why-rs-title'>Distributed</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        We are a global network
                                        of researchers working towards
                                        open-source biotechnology and its
                                        availability to the masses,
                                        as rapidly and ethically possible.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>


            {/*this section is for 'Resources'*/}
            <Container>
                <div className='resources-section'>
                    <p className='section-header'>Resources</p>
                        <p className='homepage-resources-text'>
                            It is a long established fact that a reader will be distracted by the readable content
                            of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
                            more-or-less normal distribution of letters
                        </p>
                        <Link to="/resources">
                        <Image src='homepage-glyph/resources-image.png' fluid={true}/>
                        <Button mode="strong" className='resources-link'>See All Resources</Button>
                        </Link>
                </div>
            </Container>

            {/*this is how it works section*/}
            <Container>
                <div className='hiw-section'>
                    <p className='section-header'>Decentralized Science</p>
                    <Row>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/propose.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Propose</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>Researchers identify the open questions that your professors wouldn't talk about.</p> <br/>
                                        <p>A knowledge market is instantiated, allowing bets for and against the hypothesis. </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/test.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Test</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>A network of credentialed researchers performs an experiment to test the hypothesis.</p><br/>
                                        <p>Samples are analyzed, and the results are signed by a trusted third party.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/review.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Review</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>If the data is conclusive, the Collective takes a position on the knowledge market...</p> <br/>
                                        <p>...just moments before making the experiment's data available publicly.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/gift.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Develop</Card.Title>
                                    <Card.Text className='hiw-body'>
                                    <p>The winnings from the knowledge market are used to initiate development via <a href="https://www.molecule.to">Molecule.</a> </p><br/>
                                    <p>A tokenized bonded curve allows researchers, institutions, and corporations to align incentives to bring the idea to market.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/* this is contact form section*/}
            <Container>
                <div className='contact-us'>
                    <p className='section-header'>Contact Us</p>
                        <InputGroup className='contact-form-input mb-3'>
                            <FormControl
                                placeholder='Enter Your Name'
                                aria-label='Enter Your Name'
                                aria-describedby='basic-addon2'
                            />
                        </InputGroup>
                        <InputGroup className='contact-form-input mb-3'>
                            <FormControl
                                placeholder='Enter Your Email'
                                aria-label='Enter Your Email'
                                aria-describedby='basic-addon2'
                            />
                        </InputGroup>
                        <Form.Group className='contact-form-input'>
                            <Form.Control as='textarea' rows='5' placeholder='Enter Your Message'/>
                        </Form.Group>
                        <Button mode="strong" className='contact-send-btn'>Send</Button>
                </div>
            </Container>
        </div>
    )
}
export default Home;
