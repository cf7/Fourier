import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <header>
          <Container>
            <Navbar expand="lg" variant="light" bg="light">
              <Container>
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
              </Container>
            </Navbar>
          </Container>
        </header>

          { this.props.children }

        <footer>
          ©2021
        </footer>
      </Container>
    );
  }
}

export { Layout };