import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function AuctionTimeForm(bag) {

  return (
    <Form onSubmit={bag.handleSubmit}>
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridStartTime">
          <Form.Label>Čas začátku aukce</Form.Label>
          <Form.Control type="datetime-local" name="start_time" placeholder="Zadejte čas začátku aukce" onChange={bag.handleChange} value={bag.values.start_time}/>
          {bag.errors.start_time && bag.touched.start_time ? <div style={{color:'red'}}>{bag.errors.start_time}</div> : null}
        </Form.Group>
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridEndTime">
          <Form.Label>Čas konce aukce</Form.Label>
          <Form.Control type="datetime-local" name="end_time" placeholder="Zadejte čas konce aukce" onChange={bag.handleChange} value={bag.values.end_time}/>
          {bag.errors.end_time && bag.touched.end_time ? <div style={{color:'red'}}>{bag.errors.end_time}</div> : null}
        </Form.Group>
      </Row>

      <div>
        <Button variant="primary" style={{maxWidth:200,marginInline:10, float:'right'}} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
        <Button variant='secondary' style={{maxWidth:200,marginInline:10, float:'right'}} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
      </div>

    </Form>
    )
}