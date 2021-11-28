import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


export default function AuctionForm(bag) {
  
  const convertBase64 = (file) =>{
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const onFileChange = (e) => {
    var filesArray = e.target.files;
    var base64 =[]
    Array.from(filesArray).forEach(file=> {
      console.log(file)
      convertBase64(file)
      .then(inBase => {
        console.log(inBase)
        base64.push(inBase)})
    });
    bag.setFieldValue("photos", base64); 
  }

  return (
    <Form onSubmit={bag.handleSubmit} encType="multipart/form-data">
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridName">
          <Form.Label>Název aukce<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Control type="text" name="name" placeholder="Zadejte uživatelké jméno" onChange={bag.handleChange} value={bag.values.name}/>
          {bag.errors.name && bag.touched.name? <div style={{color:'red'}}>{bag.errors.name}</div> : null}
        </Form.Group>
        
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridType">
          <Form.Label>Typ aukce<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Select aria-label="Výběr typu" name="is_demand" value={bag.values.is_demand} onChange={bag.handleChange}>
            <option >Vyberte typ aukce</option>
            <option value="true">Poptávková</option>
            <option value="false">Nabídková</option>
          </Form.Select>
          {bag.errors.is_demand && bag.touched.is_demand? <div style={{color:'red'}}>{bag.errors.is_demand}</div> : null}
        </Form.Group>
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridType">
          <Form.Label>Pravidla aukce<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Select aria-label="Výběr typu" name="is_open" value={bag.values.is_open} onChange={bag.handleChange}>
            <option >Vyberte typ aukce</option>
            <option value="true">Otevřená</option>
            <option value="false">Uzavřená</option>
          </Form.Select>
          {bag.errors.is_open && bag.touched.is_open? <div style={{color:'red'}}>{bag.errors.is_open}</div> : null}
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridPrice">
          <Form.Label>Vyvolávací cena<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Control type="number" name="price" placeholder="Zadejte vyvolávací cenu" onChange={bag.handleChange}/>
          {bag.errors.price&& bag.touched.price? <div style={{color:'red'}}>{bag.errors.price}</div> : null}
        </Form.Group>
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridMinBid">
          <Form.Label>Minimální příhoz</Form.Label>
          <Form.Control type="number" placeholder="Toto pole nemusí být zadané" name='mim_bid' onChange={bag.handleChange} value={bag.values.min_bid}/>
        </Form.Group>
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridMaxBid">
          <Form.Label>Maximální příhoz</Form.Label>
          <Form.Control type="number" placeholder="Toto pole nemusí být zadané" name='max_bid' onChange={bag.handleChange} value={bag.values.max_bid}/>
        </Form.Group>
      </Row>
      <Row  className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formFile">
          <Form.Label>Obrázky<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Control type="file" accept="image/*" multiple name='photos' onChange={onFileChange}/>
          {bag.errors.photos&& bag.touched.photos? <div style={{color:'red'}}>{bag.errors.photos}</div> : null}
        </Form.Group>
      </Row>
     
      <Row className="mb-3">
        <Form.Group style={{minWidth:200}} as={Col} controlId="formGridDescription">
          <Form.Label>Popisek<label style={{color:'red'}}>*</label></Form.Label>
          <Form.Control as="textarea" name="description" placeholder="Zadejte popisek" onChange={bag.handleChange} value={bag.values.description}/>
          {bag.errors.description && bag.touched.description? <div style={{color:'red'}}>{bag.errors.description}</div> : null}
        </Form.Group>
      </Row>

      <div>
        <label style={{color:'red'}}>* požadované pole</label>
        <Button variant="primary" style={{maxWidth:200,marginInline:10, float:'right'}} type="submit" disabled={bag.isSubmitting} >Uložit změny</Button>
        <Button variant='secondary' style={{maxWidth:200,marginInline:10, float:'right'}} disabled={bag.isSubmitting} onClick={bag.onHide} >Zrušit</Button>
         
      </div>

    </Form>
    )
}