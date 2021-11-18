import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function UserDetail(bag) {
  return (
    <Form onSubmit={bag.handleSubmit}>
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridEmail">
          <Form.Label>E-mailová adresa</Form.Label>
          <Form.Control type="text" name="email" placeholder="Zadejte uživatelké jméno" onChange={bag.handleChange} value={bag.values.email}/>
          {bag.errors.email && bag.touched.email? <div style={{color:'red'}}>{bag.errors.email}</div> : null}
        </Form.Group>
        
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridPassword">
          <Form.Label>Heslo</Form.Label>
          <Form.Control type="password" name="password" placeholder="Zadejte heslo" onChange={bag.handleChange} value={bag.values.password}/>
          {bag.errors.password && bag.touched.password? <div style={{color:'red'}}>{bag.errors.password}</div> : null}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridName">
          <Form.Label>Jméno</Form.Label>
          <Form.Control type="text" name="name" placeholder="Zadejte jméno" onChange={bag.handleChange} value={bag.values.name}/>
          {bag.errors.name && bag.touched.name? <div style={{color:'red'}}>{bag.errors.name}</div> : null}
        </Form.Group>

        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridSurname">
          <Form.Label>Příjméní</Form.Label>
          <Form.Control type="text" name="surname" placeholder="Zadejte příjmení" onChange={bag.handleChange} value={bag.values.surname}/>
          {bag.errors.surname&& bag.touched.surname? <div style={{color:'red'}}>{bag.errors.surname}</div> : null}
        </Form.Group>

        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridRole">
          <Form.Label>Role uživatele</Form.Label>
          <Form.Select aria-label="Výběr rolí" name="role" value={bag.values.role} onChange={bag.handleChange}>
            <option>Vyberte roli</option>
            <option value="0">Neregistrovaný uživatel</option>
            <option value="1">Registrovaný uživatel</option>
            <option value="2">Licitátor</option>
            <option value="3">Administrátor</option>
          </Form.Select>
          {bag.errors.role&& bag.touched.role? <div style={{color:'red'}}>{bag.errors.role}</div> : null}
        </Form.Group>
      </Row>
        
        <div style={{wight:'100%'}}>
          <Button variant="primary" style={{maxWidth:200,marginInline:10, float:'right'}} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
          <Button variant='secondary' style={{maxWidth:200,marginInline:10, float:'right'}} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
        </div>

    </Form>
    )
}