import React from 'react'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Formik} from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import NavigationBar from './../components/NavigationBar';
import Styles from './../css/LoginPage.module.css'
import { UseUserContext } from "../userContext";

export default function LoginPage(props) {
  const {setIsLoggedIn, setUser} = UseUserContext()
  const navigate = useNavigate();

  return (
    <>
    <NavigationBar page="Login"/>
    <Container style={{height:"100%"}}>
      <Row style={{height:"100%"}}>
        <Col className={Styles.centerContent}>
          <div className={Styles.loginForm}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if(!values.email){
                  errors.email = 'Nezadali jste e-mailovou adresu';
                }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Nesprávný formát e-mailové adresy';
                }
                
                if(!values.password){
                  errors.password = 'Nezadali jste heslo';
                }
                /* TODO: else if (values.password.length < 8){
                  errors.password = 'Heslo je příliš krátké';
                }*/
                return errors;
              }}
              onSubmit={(values, bag) => {
                fetch('https://iis-api.herokuapp.com/auth/login', {
                  method:'POST',
                  headers: {"Content-type": "application/json; charset=UTF-8"},
                  body: JSON.stringify(values)
                  }
                )
                .then(response=>response.text()) 
                .then((authRsp)=>{
                  if(authRsp === 'Username or password incorrect'){
                    bag.setStatus('Zadali jste špatný e-mail nebo heslo')
                  }else{
                    let authUser = JSON.parse(authRsp)
                    
                    sessionStorage.setItem('accessToken', authUser.accessToken)
                    setIsLoggedIn(true)
                    
                    fetch('https://iis-api.herokuapp.com/users/current', {
                      method:'GET',
                      headers:{'Authorization': 'Bearer ' + authUser.accessToken}
                    })
                    .then((response)=>response.text())
                    .then((usrRsp)=>{
                      setUser(JSON.parse(usrRsp))
                      navigate('/')
                    })
                  }
                  bag.setSubmitting(false)
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
                  <label style={{width:"100%",textAlign:'center' ,paddingBottom:40, color:"#0d6efd", fontSize:"30px"}}>Zadejte přihlašovací údaje</label>

                  <FloatingLabel controlId="floatingInput" label="E-mailová adresa" className="mb-3">
                    <Form.Control type="text" name='email' placeholder="example@domain.net"  onChange={handleChange} value={values.email}/>
                    {errors.email && touched.email? <div style={{color:'red'}}>{errors.email}</div> : null}
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Heslo">
                    <Form.Control type="password" name='password' placeholder="Heslo" onChange={handleChange} value={values.password}/>
                    {errors.password && touched.password ? <div style={{color:'red'}}>{errors.password}</div> : null}
                  </FloatingLabel>

                  <div style={{ paddingTop: 30 }} className="d-grid align-items-center">
                    <Button variant="primary" type="submit" disabled={isSubmitting} size="lg">Přihlásit se</Button>
                    {status? <div style={{color:'red', width:'100%', paddingTop:10, textAlign:'center'}}>{status}</div> : null}
                  </div>

                  <div style={{width:"100%", textAlign:"center", paddingTop:10}}>
                    <label style={{marginRight:5}}>Ještě nemáte účet?</label><Link style={{color:"#0d6efd"}} to="/register">Zaregistrujte se!</Link>
                  </div>
                </Form>
              )}
            </Formik>  
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}