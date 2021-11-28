import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {Formik} from 'formik';
import { UseUserContext } from "../userContext";
import { useNavigate  } from 'react-router-dom';

export default function RegForm(props) {
  const {setIsLoggedIn, setUser} = UseUserContext()
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '', name:'', surname:''}}
      validate={values => {
        const errors = {};
        if(!values.email){
          errors.email = 'Nezadali jste e-mailovou adresu';
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Nesprávný formát e-mailové adresy';
        }

        if(!values.password){
          errors.password = 'Nezadali jste heslo';
        }else if (values.password.length < 8){
          errors.password = 'Heslo je příliš krátké';
        }

        if(!values.name){
          errors.name = 'Nezadali jste jméno';
        }
        
        if(!values.surname){
          errors.surname = 'Nezadali jste příjmení';
        }
        
        return errors;
      }}
      onSubmit={(values, bag) => {

      fetch('https://iis-api.herokuapp.com/auth/register', {
          method:'POST',
          headers: {"Content-type": "application/json; charset=UTF-8"},
          body: JSON.stringify(values)
          }
        ) 
        .then((response)=>response.text())
        .then((regRsp)=>{
          if(regRsp == 'User already exists'){
            bag.setStatus('Uživatel již existuje')
          }else{
            let newUser = JSON.parse(regRsp)
            
            sessionStorage.setItem('accessToken', newUser.accessToken)
            setIsLoggedIn(true)
        
            fetch('https://iis-api.herokuapp.com/users/current', {
              method:'GET',
              headers:{'Authorization': 'Bearer ' + newUser.accessToken}
            })
            .then((response) => response.text())
            .then((usrRsp)=>{
              setUser(JSON.parse(usrRsp))
              navigate('/')
            })
          }
        })
      }}
    >
      {({
       values,
       errors,
       status,
       touched,
       handleChange,
       handleBlur,
       handleSubmit,
       isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <label style={{width:"100%",textAlign:'center' ,paddingBottom:40, color:"#0d6efd", fontSize:"30px"}}>Registrační formulář</label>

          <Row className="mb-3">
            <Form.Group style={{minWidth:200}} as={Col} controlId="formGridUsername">
              <Form.Label>E-mailová adresa</Form.Label>
              <Form.Control type="text" name="email" placeholder="Zadejte e-mailovou adresu" onChange={handleChange} value={values.email}/>
              {errors.email && touched.email? <div style={{color:'red'}}>{errors.email}</div> : null}
            </Form.Group>

            <Form.Group style={{minWidth:200}} as={Col} controlId="formGridPassword">
              <Form.Label>Heslo</Form.Label>
              <Form.Control type="password" name="password" placeholder="Zadejte heslo" onChange={handleChange} value={values.password}/>
              {errors.password && touched.password ? <div style={{color:'red'}}>{errors.password}</div> : null}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group style={{minWidth:200}} as={Col} controlId="formGridName">
              <Form.Label>Jméno</Form.Label>
              <Form.Control type="text" name="name" placeholder="Zadejte jméno" onChange={handleChange} value={values.name}/>
              {errors.name && touched.name ? <div style={{color:'red'}}>{errors.name}</div> : null}
            </Form.Group>

            <Form.Group style={{minWidth:200}} as={Col} controlId="formGridSurname">
              <Form.Label>Příjméní</Form.Label>
              <Form.Control type="text" name="surname" placeholder="Zadejte příjmení" onChange={handleChange} value={values.surname}/>
              {errors.surname && touched.surname? <div style={{color:'red'}}>{errors.surname}</div> : null}
            </Form.Group>
          </Row>

          <div style={{ paddingTop: 30 }} className="d-grid align-items-center">
            <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">Zaregistovat se</Button>
            {status? <div style={{color:'red', width:'100%', textAlign:'center'}}>{status}</div> : null}
          </div>
                
                  <div style={{width:"100%", textAlign:"center", paddingTop:10}}>
                    <Link style={{color:"#0d6efd"}} to="/login">Zpět ne přihlášení</Link>
                  </div>
   
        </Form>
      )}
    </Formik>
    )
}