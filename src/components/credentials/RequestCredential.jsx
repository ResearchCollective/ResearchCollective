// @ts-ignore
import {Button, Modal, IconPlus} from '@aragon/ui';
import * as React from "react";
// @ts-ignore
import VerifiableCredential from "@docknetwork/sdk/verifiable-credential";
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// remote API
const SERVER_URL = "http://api.researchcollective.io/";
// local API
// const SERVER_URL = "http://127.0.0.1:3001/";

// Endpoints
const RESOURCE_CREDENTIAL = SERVER_URL +  "credentials/v1"; // return context-json-ld.json
// TODO: NEW ENDPOINTS NEEDED:
const EXAMPLE_CREDENTIAL = SERVER_URL + "ExampleResearchCollectiveExpertDAOResource";
const COVID_ISSUER = SERVER_URL + "issuers/covidresearch"; // must return our info containing our pubkey

// TODO: this should be added via proposal form for each dao
const EXPERT_DAO_DEFAULT = "covidresearch";
// TODO: let's enable the expert DAO to supply with a rating and rating description
const EXPERT_DAO_RATING = 5;
const EXPERT_DAO_RATING_DESCRIPTION = "Passed Inspection";

function RequestCredential (subject, itemType, description, resourceName, resourceURL ) {
        //TODO: already contains "https://www.w3.org/2018/credentials/v1" ?
        let vc = new VerifiableCredential(RESOURCE_CREDENTIAL);
        vc.addContext(RESOURCE_CREDENTIAL);
        const schemaContexts = {
            '@context': {
                DataFeedItem: 'https://schema.org/DataFeedItem',
                EndorsementRating: 'https://schema.org/EndorsementRating',
                dateCreated: "http://schema.org/dateCreated",
                item: "http://schema.org/item",
                description:"http://schema.org/description",
                name:"http://schema.org/name",
                url: "http://schema.org/url",
                author: "http://schema.org/author",
                ratingValue: "http://schema.org/ratingValue",
                ratingExplanation: "http://pending.schema.org/ratingExplanation"
            },
        };
        vc.addContext(schemaContexts);

        vc.addType("ResearchCollectiveExpertDAOResource");
        vc.addSubject({
            id:subject, // this should be their DID or other identifier
            type:"ResearchCollectiveExpertDAOResource",
            DataFeedItem:{
                type:"DataFeedItem",
                dateCreated: new Date(),
                item:itemType,
                description:description,
                name:resourceName,
                url:resourceURL
            },
            EndorsementRating:{
                type:"http://schema.org/EndorsementRating",
                author:EXPERT_DAO_DEFAULT,
                ratingValue: EXPERT_DAO_RATING,
                ratingExplanation:EXPERT_DAO_RATING_DESCRIPTION,
            }
        });
        vc.issuer = COVID_ISSUER;
        // console.log("vc:", vc);
        return vc;
}



const handleSubmitPostResource = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    let itemType = "";
    if (form.formVendor.checked){
        itemType = "Vendor"
    } else if (form.formArticle.checked){
        itemType = "Article"
    } else if (form.formOtherResource.checked){
        itemType = "Resource"
    }

    let newRequestedCredential = RequestCredential(
        form.formHorizontalResourceName.value,
        itemType,
        form.formResourceDescription.value,
        form.formHorizontalResourceName.value,
        form.formHorizontalResourceURL.value
        );

    const payload = {
        contactEmail:form.formHorizontalEmail.value,
        contactName:form.formHorizontalContactName.value,
        credential:newRequestedCredential
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    // send the vc over to the backend to submit to the Telegram channel
    fetch(SERVER_URL + 'submitNewProposal', requestOptions)
        .then(async response =>
        {
            // const jsonResponse = await response.json();
            console.log("credential submitted:", response);

            // when we sign the credential, set the proof
            // newRequestedCredential.proof = jsonResponse.proof;
            // newRequestedCredential.issuer = jsonResponse.issuer;
        }).catch(err=>{
            console.log("error on credential request:", err)
    });
}



export default function PostItemModal() {
    const [opened, setOpened] = React.useState(false)
    const open = () => setOpened(true)
    const close = () => setOpened(false)
    return (
        <>
            <Button className=" rc-button" mode="normal"   icon={<IconPlus/>} onClick={open} label="Post Resource"/>
            <Modal visible={opened} onClose={close}>

            <Form onSubmit={handleSubmitPostResource} >
                <Form.Group as={Row} controlId="formHorizontalContactName">
                    <Form.Label column sm={2}>
                        Contact Name<sup>*</sup>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control  type="name" placeholder="Contact Name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Contact Email<sup>*</sup>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" placeholder="Contact Email" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalResourceName">
                    <Form.Label column sm={2}>
                        Resource Identifier<sup>*</sup>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="name" placeholder="Resource Identifier" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalResourceURL">
                    <Form.Label column sm={2}>
                        Resource URL<sup>*</sup>
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="url" placeholder="Resource URL" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formResourceDescription">
                    <Form.Label column sm={2}>Resource Description<sup>*</sup> </Form.Label>
                    <Col sm={10}>
                    <Form.Control as="textarea" rows="3" />
                    </Col>
                </Form.Group>


                <fieldset>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Resource Label<sup>*</sup>
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Vendor"
                                name="formHorizontalRadios"
                                id="formVendor"
                            />
                            <Form.Check
                                type="radio"
                                label="Article"
                                name="formHorizontalRadios"
                                id="formArticle"
                            />
                            <Form.Check
                                type="radio"
                                label="Other"
                                name="formHorizontalRadios"
                                id="formOtherResource"
                            />
                            <Form.Check
                                type="radio"
                                label="Registry"
                                name="formHorizontalRadios"
                                id="formRegistry"
                            />
                            <Form.Check
                                type="radio"
                                label="Covid"
                                name="formHorizontalRadios"
                                id="formCovid"
                            />
                        </Col>
                    </Form.Group>
                </fieldset>

                <Form.Label column sm={10}><sup>*</sup> Required </Form.Label>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={close} type="submit">Submit for Review</Button>
                        {/*<Button type="submit">Submit for Review</Button>*/}
                    </Col>
                </Form.Group>
            </Form>
        </Modal>
</>
    )
}
