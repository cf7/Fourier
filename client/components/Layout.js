import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      hamburger: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }


  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    if (this.state.width < 500) {
      this.setState({ hamburger: true });
    } else {
      this.setState({ hamburger: false });
    }
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <Container id="layout">
        <header>
          <Container>
            {
              (

              this.state.hamburger

              ?

              <Navbar id="navbar" bg="light" expand={false}>
                <Container fluid>
                  {/*<Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>*/}
                  <Navbar.Toggle aria-controls="offcanvasNavbar" />
                  <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="start"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id="offcanvasNavbarLabel">Fourier</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/">Fourier</Nav.Link>
                        <Nav.Link href="/about.html">About</Nav.Link>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>

              :

              <Navbar id="navbar" expand="lg" variant="light" bg="light">
                <Navbar.Brand id="brand" data-text="Fourier" href="/">Fourier</Navbar.Brand>
                <Nav className="nav-options">
                  <Nav.Link data-text="About" href="/about.html">About</Nav.Link>
                </Nav>
              </Navbar>

              )
            }
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