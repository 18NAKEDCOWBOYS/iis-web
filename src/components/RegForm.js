import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function RegForm(props) {
  return (
    <Form>
      <label style={{width:"100%",textAlign:'center' ,paddingBottom:40, color:"#0d6efd", fontSize:"30px"}}>Registrační formulář</label>

      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridUsername">
          <Form.Label>Uživatelké jméno</Form.Label>
          <Form.Control type="text" placeholder="Zadejte uživatelké jméno" />
        </Form.Group>
      
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control type="password" placeholder="Zadejte heslo" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridName">
          <Form.Label>Jméno</Form.Label>
          <Form.Control type="text" placeholder="Zadejte jméno" />
        </Form.Group>

        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridSurname">
          <Form.Label>Příjméní</Form.Label>
          <Form.Control type="text" placeholder="Zadejte příjmení" />
        </Form.Group>

        
      </Row>

      <div style={{ paddingTop: 30 }} className="d-grid align-items-center">
        <Button variant="primary" type="submit" size="lg">Zaregistovat se</Button>
      </div>
    </Form>
    )
}