import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export default function LoginPage(props) {
  return (
    <Container>
      <Row className="text-center align-items-center" style={{ height: 100 }}>
        {/* TODO - Přidat obrázek kladívka*/}
      </Row>
      <Row>
        <Col>
        </Col>
        <Col xs={6} className="example-square bg-primary shadow-lg" style={{ padding: 50, borderRadius: 17 }}>
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
                  <Button variant="dark" type="submit" size="lg">Submit</Button>
                </div>

              </Row>
            </Container>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <a href="/">Zpátky</a>
    </Container>
  )
}