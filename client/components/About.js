import React from 'react';
import Container from 'react-bootstrap/Container';
import { Layout } from './Layout.js';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <Container>
          <p>
            About Page
          </p>
        </Container>
      </Layout>
    );
  }
}

export { About };