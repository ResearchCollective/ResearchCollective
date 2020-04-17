import React, { Component } from 'react';
import {Button, Container, Row, Card} from 'react-bootstrap';


class Credentials extends Component {
  constructor(props) {
    super(props);
  }


  render() {
      return (
        <Container>
          <h3> Credentials </h3>
            <Row>
              <h6><i> There are no credentials to display yet.</i></h6>
            </Row>
        </Container>
    );
  }
}


export default Credentials;
