import { Button } from '@aragon/ui';
import React, { useState } from 'react';
import { Card, Col, Container, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import sendEmail from '../functions/sendEmail';

const Home = () => {

    const [mailSent, setMailSent] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    })

    const handleContactFormInput = e => {
        const {name, value} = e.target
        console.log(name, value)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
            })
        )
    }
    
    const submitContactFormData = async (e) => {
        e.preventDefault()
        // TODO: add validation/sanitization
        let request = await sendEmail(formData)
        // set status for user msg//
        setMailSent(true)
    }
    return(
        //this div represents the 'whole' homepage//
        <div className='homepage'>
            <Container>
            {/*this div represents the first element (hero) of the landing page*/}
                    <Row  className='homepage-hero'>
                        <Col  className="flexContainer" pull-right lg={4} md={6}>
                        <Card className='logo-card'>
                            <Card.Body>
                                <Card.Text>
                                    <Card.Img className='logo' variant='top' src='logo.png' />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                      </Col>
                        <Col lg={8} className="margins" >
                             <h1 className="centerText hero-title">Research Collective</h1>
                             <h1 className="centerText hero-sub-title pushUp">An anchor for the scientific Web-of-Trust</h1>
                             <h1 className="centerText hero-sub-title pushUp">a moderately friendly network of Expert DAOs</h1>
                             <div className="buttonContainer pushDown flexContainer">
                               <a  className="" target="_blank" rel="noopener noreferrer"  href="https://luisivan.net/posts/expert-daos"><Button className="exp-dao-button" label="What is an Expert DAO?" mode="neutral"/></a>
                                <a className="" target="_blank" rel="noopener noreferrer"  href="https://tristanerr.typeform.com/to/VOEZ4F"><Button className="rc-button" label="Join an Expert DAO" /></a>
                             </div>
                        </Col>
                    </Row>
            </Container>

            {/*this section is for 'Resources'*/}
            <Container>
                <div className='resources-section'>
                    <p className='section-header'>Covid19 Resources</p>
                        <p className='homepage-resources-text'>
                            curated lists of vendors, articles, and registries with label 'covid'
                        </p>
                        <Link to="/resources">
                        <Image src='homepage-glyph/resources-image.png' fluid={true}/>
                        <Button mode="strong" className='rc-button resources-link'>Browse All Resources</Button>
                        </Link>
                </div>
            </Container>

            {/*this is how it works section*/}
            <Container>
                <div>
                    <p className="section-header sectionBreak">Method</p>
                    <Row>
                        <Col lg={3} className='hiw-box' md={6}>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/propose.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Curate</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>Researchers identify the open questions that academics don't want to admit exist.</p> <br/>
                                        <p>A knowledge market is instantiated, allowing bets for and against the hypothesis. </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6}  className='hiw-box' >
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/test.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Test</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>A network of credentialed researchers performs an experiment to test the hypothesis.<br/>
                                         Samples are analyzed, and the results are signed by a trusted third party.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col  lg={3} className='hiw-box' md={6}>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/review.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Review</Card.Title>
                                    <Card.Text className='hiw-body'>
                                        <p>If the data is conclusive, the Collective takes a position on the knowledge market... <br/>
                                        ...just moments before making the experiment's data available to the public.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col  md={6}   lg={3} className='hiw-box'l>
                            <Card className='hiw-card'>
                                <Card.Img className='hiw-glyph' variant='top' src='homepage-glyph/gift.png' />
                                <Card.Body>
                                    <Card.Title className='hiw-title'>Develop</Card.Title>
                                    <Card.Text className='hiw-body'>
                                    <p>The winnings from the knowledge market are used to fund clinical development via <a href="https://www.molecule.to">Molecule.</a><br/>
                                     A token allows researchers and institutions to align incentives to bring the idea to market.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/*this section is for "Why Research Collective"*/}
            <Container>
                <div className='homepage-why'>
                   <p className='sectionBreak section-header'>Principles</p>
                    <Row lg={12} >
                        {/*Resilient*/}
                        <Col className="hiw-box" lg={3} md={6}>
                            <Card className="CardB">
                                <Card.Img className='glyph' variant='top' src='homepage-glyph/resilient.png' />
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Anti-Fragile</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        With luck and planning, stress becomes a signal for growth.<br/> <br/>
                                        An ever shifting aggregation of
                                        social, legal, and ethereal organizations
                                        can accomplish otherwise impossible tasks.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/*Immutable*/}
                        <Col className="hiw-box " lg={1} md={0}/>
                        <Col className="hiw-box " lg={3} md={6}>
                            <Card className="CardB ">
                                <Card.Img className='glyph' variant='top' src='/homepage-glyph/immutable.png' />
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Immutable</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        What is made public, for better or worse, should inform the future.<br/><br/>Distributed ledgers can be used to timestamp evidence, make intellectual property claims, and call out misconduct.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                                      <Col className="hiw-box " lg={1} md={0}/>
                        {/*Open*/}
                        <Col className="hiw-box" lg={3} md={6}>
                            <Card className="CardB">
                                <Card.Img className='glyph' variant='top' src='/homepage-glyph/open.png'/>
                                <Card.Body>
                                    <Card.Title className='why-rs-title'>Distributed</Card.Title>
                                    <Card.Text className='why-rs-body'>
                                        It is possible to be in all places at once, yet hostage to none.
                                        <br/><br/>
                                        Anonymous, revokable credentials tied to decentralized identifiers enable self-sovereign data collection and publishing.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                  </div>
            </Container>

            {/*}
            <Container>
              <div>
                <p className='about-rs'>Develop your expertise. </p>
                <p> Earn currency and kudos. </p>
                <p className='about-rs'>Expert DAO members curate content and arbitrate decisions in a swarm of domains.</p>
                <span className='call-to-action'>
                    <a href="https://tristanerr.typeform.com/to/VOEZ4F"><Button mode="strong" className='call-to-action-btn'>Apply to be a Curator</Button></a>
                </span>

              </div>
            </Container> */}


            {/* this is contact form section*/}
            {/*// email should go to social@researchcollective.io*/}
            <Container>
              <Row>
                <Col lg={2}/>
                <Col lg={8}>
                <div className='contact-us'>
                    <p className='section-header sectionBreak'>Contact Us</p>
                    if (mailSent) {
                        <div className="alert alert-primary" role="alert">
                            Thank you!!! We will get back to you soon.
                        </div>
                    }
                        <InputGroup className='contact-form-input mb-3'>
                            <FormControl
                                placeholder='Full Name'
                                aria-label='Enter Your Full Name'
                                aria-describedby='basic-addon2'
                                name='fullName'
                                value={formData.fullName}
                                onChange={e => handleContactFormInput(e)}
                            />
                        </InputGroup>
                        <InputGroup className='contact-form-input mb-3'>
                            <FormControl
                                placeholder='Email'
                                aria-label='Enter Your Email'
                                aria-describedby='basic-addon2'
                                name='email'
                                value={formData.email}
                                onChange={e => handleContactFormInput(e)}
                            />
                        </InputGroup>
                        <Form.Group className='contact-form-input'>
                            <Form.Control 
                                as='textarea' 
                                rows='5' 
                                placeholder='What is on your mind?'
                                name='message'
                                value={formData.message}
                                onChange={e => handleContactFormInput(e)}
                            />
                        </Form.Group>
                        <Button mode="strong" className='rc-button contact-send-btn' onClick={(e) => submitContactFormData(e)}>Send</Button>
                </div>
                </Col>
                  <Col lg={2}/>
                </Row>
            </Container>
        </div>
    )
}
export default Home;
