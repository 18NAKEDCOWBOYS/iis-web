import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import NavigationBar from './../components/NavigationBar';
export default function LoginPage(props) {
  return (
    <>
    <NavigationBar page="Home"/>
    <Container>
      <Row className="text-center align-items-center" style={{ height: 200 }}>
        {/* TODO - Přidat obrázek kladívka*/}
      </Row>
      <Row>
        <Col>
        </Col>
        <Col xs={5} className="example-square shadow-lg" style={{ padding: 50, borderRadius: 10, borderWidth:1, borderColor: "#8a8a8a", borderStyle:'solid' }}>
          <Form>
            <Container>
              <Row>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
              </Row>

              <Row>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
              </Row>

              <Row style={{ paddingTop: 30 }}>
                <div className="d-grid align-items-center">
                  <Button variant="primary" type="submit" size="lg">Submit</Button>
                </div>

              </Row>
            </Container>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <a href="/">Zpátky</a>
    </Container>
    </>
  )
}