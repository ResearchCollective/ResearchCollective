import React from 'react'
import {Container, Row, Col, Button, Image, InputGroup, FormControl, Form} from 'react-bootstrap'
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
                            <p>What is</p>
                            <p>Research Collective?</p>
                            <Button className='contact-us-btn'>Contact Us</Button>
                        </Col>
                        <Col className='homepage-hero-c2'>
                            <p className='about-rs'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </p>
                            <span className='call-to-action'>
                                <a href="https://tristanerr.typeform.com/to/VOEZ4F"><Button className='call-to-action-btn'>Curate</Button></a>
                                <Button className='call-to-action-btn'>Research</Button>
                            </span>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/*this section is for "Why Research Collective"*/}
            <Container>
                <div className='homepage-why'>
                    <p className='section-header'>Why Research Collective ?</p>
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
                        <Button className='resources-link'>Check Out Our Resources</Button>
                        <Image src='homepage-glyph/resources-image.png' fluid={true}/>
                </div>
            </Container>

            {/*this is how it works section*/}
            <Container>
                <div className='hiw-section'>
                    <p className='section-header'>How It Works</p>
                    <Row>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/propose.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Propose</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        Protocols are drafted by
                                        researchers and posted for
                                        approval by the community.
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
                                        The experiment’s data is
                                        stashed on immutable,
                                        distributed ledgers.
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
                                        The results of the
                                        experiment are analyzed
                                        by the community.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/gift.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Gift</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        Notes on the method are
                                        made open source at the
                                        conclusion of the project.
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
                        <Button className='contact-send-btn'>Send</Button>
                </div>
            </Container>
        </div>
    )
}
export default Home;
