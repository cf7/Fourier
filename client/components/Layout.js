import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container id="layout">
        <header>
          <Container>
            <Navbar expand="lg" variant="light" bg="light">
              <Navbar.Brand id="brand" href="/">Fourier</Navbar.Brand>
              <Nav className="nav-options">
                <Nav.Link href="/about.html">About</Nav.Link>
              </Nav>
            </Navbar>
          </Container>
        </header>

          { this.props.children }

        <footer>
          © 2021
        </footer>
      </Container>
    );
  }
}

export { Layout };