import { useState } from 'react'
import { Container, Navbar, Nav, Row, Col, Card } from 'react-bootstrap';
import './assets/Home.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar bg="light" className="custom-navbar sticky-top" expand="lg">
  <Container>
    <Navbar.Brand href="#home" className="navbar-brand-custom">
      🌱 Plant Detector
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto nav-links-custom">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#upload">Upload</Nav.Link>
        <Nav.Link href="#login">Login</Nav.Link>
        <Nav.Link href="#blog">Blog</Nav.Link>
        <Nav.Link href="#market">Marketplace</Nav.Link>
        <Nav.Link href="#announcements">Announcements</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="title text-center my-4">Plant Disease Detector</h1>
        <h3 className="subtitle text-center mb-5">
          Easy One Step Solution to Detect Plant Disease!
        </h3>

        {/* How We Do It Section */}
        <section className="how-we-do-it text-center mb-5">
          <h2>How We Do It</h2>
          <p>Explanation goes here</p>
        </section>

        {/* Credits Section with Gallery */}
        <section className="credits text-center">
          <h2 className="mb-4">Credits</h2>
          <Container>
            <Row className="g-4">
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://via.placeholder.com/300" />
                  <Card.Body>
                    <Card.Title>Person One</Card.Title>
                    <Card.Text>Role / Contribution</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://via.placeholder.com/300" />
                  <Card.Body>
                    <Card.Title>Person Two</Card.Title>
                    <Card.Text>Role / Contribution</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src="https://via.placeholder.com/300" />
                  <Card.Body>
                    <Card.Title>Person Three</Card.Title>
                    <Card.Text>Role / Contribution</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  )
}

export default App
