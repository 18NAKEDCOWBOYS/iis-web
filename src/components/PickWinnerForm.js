import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function PickWinnerForm(bag) {

  return (
    <Form onSubmit={bag.handleSubmit}>
      <Row className="mb-3">
      <Form.Group style={{minWidth:200}} as={Col} controlId="formGridRole">
          <Form.Label>Role uživatele</Form.Label>
          <Form.Select aria-label="Výběr rolí" name="role_id" value={bag.values.role_id} onChange={bag.handleChange}>
            <option>Vyberte roli</option>
            <option value="1">Registrovaný uživatel</option>
            <option value="2">Licitátor</option>
            <option value="3">Administrátor</option>
          </Form.Select>
          {bag.errors.role_id&& bag.touched.role_id? <div style={{color:'red'}}>{bag.errors.role_id}</div> : null}
        </Form.Group> 
      </Row>

      <div>
        <Button variant="primary" style={{maxWidth:200,marginInline:10, float:'right'}} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
        <Button variant='secondary' style={{maxWidth:200,marginInline:10, float:'right'}} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
      </div>

    </Form>
    )
}