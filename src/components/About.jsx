import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
         <Container>
            <h3> About </h3>
            <p> Tristan will put some text here explaining about the Research Collective and this registry project.</p>
        </Container>
    );
  }
}

export default About;
