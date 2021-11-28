import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function PickWinnerForm(bag) {
  const arr = [{ a: "asdfasdf", b: 2 }, { a: "J493F894l", b: 4 }, { a: "8490489", b: 4 }]
  return (
    <Form onSubmit={bag.handleSubmit}>
      <Row className="mb-3">
        <Form.Group style={{ minWidth: 200 }} as={Col} controlId="formGridRole">
          <Form.Label>Role uživatele</Form.Label>
          <Form.Select aria-label="Výběr výherce" name="winner_id" value={bag.values.winner_id} onChange={bag.handleChange}>
            <option value="">Vyberte výherce</option>
            {bag.values.bidders && bag.values.bidders.map((x, y) => {
              return (
                <option key={y} value={x.user_id}>{x.user.name}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
      </Row>

      <div>
        <Button variant="primary" style={{ maxWidth: 200, marginInline: 10, float: 'right' }} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
        <Button variant='secondary' style={{ maxWidth: 200, marginInline: 10, float: 'right' }} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
      </div>

    </Form>
  )
}