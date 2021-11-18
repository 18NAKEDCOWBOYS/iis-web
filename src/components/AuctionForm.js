import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function AuctionForm(bag) {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridName">
          <Form.Label>Název aukce</Form.Label>
          <Form.Control type="text" name="name" placeholder="Zadejte uživatelké jméno" onChange={bag.handleChange} value={bag.values.name}/>
          {bag.errors.name && bag.touched.name? <div style={{color:'red'}}>{bag.errors.name}</div> : null}
        </Form.Group>
        
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridType">
          <Form.Label>Typ aukce</Form.Label>
          <Form.Select aria-label="Výběr typu" name="is_open" value={bag.values.is_open} onChange={bag.handleChange}>
            <option>Vyberte typ aukce</option>
            <option value="true">Otevřená</option>
            <option value="false">Uzavřená</option>
          </Form.Select>
          {bag.errors.is_open && bag.touched.is_open? <div style={{color:'red'}}>{bag.errors.is_open}</div> : null}
        </Form.Group>

        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridPrice">
          <Form.Label>Vyvolávací cena</Form.Label>
          <Form.Control type="text" name="price" placeholder="Zadejte vyvolávací cenu" onChange={bag.handleChange} value={bag.values.price}/>
          {bag.errors.price&& bag.touched.price? <div style={{color:'red'}}>{bag.errors.price}</div> : null}
        </Form.Group>
      </Row>

      <Row  className="mb-3">
        TODO - přidat možnost vložit více obrázků
        <Form.Group style={{minWidth:200}} as={Col} controlId="formFile">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Row>
     
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridDescription">
          <Form.Label>Jméno</Form.Label>
          <Form.Control as="textarea" name="description" placeholder="Zadejte popisek" onChange={bag.handleChange} value={bag.values.description}/>
          {bag.errors.description && bag.touched.description? <div style={{color:'red'}}>{bag.errors.description}</div> : null}
        </Form.Group>
      </Row>
        
      <div style={{ wight:'100%'}}>
        <Button variant="primary" style={{maxWidth:200,marginInline:10, float:'right'}} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
        <Button variant='secondary' style={{maxWidth:200,marginInline:10, float:'right'}} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
      </div>

    </Form>
    )
}