import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function PickWinnerForm(bag) {
  const arr = [{a:"asdfasdf", b:2}, {a:"J493F894l", b:4}, {a:"8490489", b:4}]
  return (
    <Form onSubmit={bag.handleSubmit}>
      <Row className="mb-3">
      <Form.Group style={{minWidth:200}} as={Col} controlId="formGridRole">
          <Form.Label>Role uživatele</Form.Label>
          <Form.Select aria-label="Výběr rolí" name="bidders" value={bag.value.bidders} onChange={bag.handleChange}>
            {console.log(bag.values.bidders)}
            <option>Nevybráno</option>
            {//bag.values.bidders && bag.values.bidders.map((x,y) => <option key={y} /*value={x.id}*/>{x.user.name}</option>)
            }
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