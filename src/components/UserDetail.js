import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function UserDetail(props) {
  return (
    <Form>
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

        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridRole">
          <Form.Label>Role uživatele</Form.Label>
          <Form.Select aria-label="Výběr rolí">
            <option>Vyberte roli</option>
            <option value="1">Neregistrovaný uživatel</option>
            <option value="2">Registrovaný uživatel</option>
            <option value="3">Licitátor</option>
            <option value="4">Administrátor</option>
          </Form.Select>
        </Form.Group>
        
      </Row>
    </Form>
    )
}