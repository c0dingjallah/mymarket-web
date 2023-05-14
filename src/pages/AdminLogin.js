import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';  



function AdminLogin() {

    const navigate = useNavigate();
    const [show2, setShow2] = useState(false);

   
    const [admin, setAdmin] = useState("")
    const [password, setPassword] = useState("")

  const handleShow2 = () => setShow2(true);


  const adminLogin = async (event) => {
    event.preventDefault();
    
    const loginData = {
    admin: admin,
    password: password
    };
    

    if(admin !== "" && password !== ""){
      try {
        const response = await fetch('http://localhost:9000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
        const data = await response.json();
        
        if (!response.ok) {
          console.log(data.error);
          alert(data.error);
          return;
        }
      
        console.log(data);
        
        localStorage.setItem('admin', JSON.stringify(data));
        navigate('/Admin', { replace: true });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else{
        alert("enter value for each field!");
    }


    };
    
    

    return (
        <>
    <Container className="container0">
  
      <Row className="container1"><Col className="d-none d-lg-block" lg={3}></Col><Col style={{margin: '0 auto'}}>
   

        <div className="new-div">
          <h3>Admin Login</h3>
    <Form onSubmit={adminLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" 
         value={admin}
         onChange={(e) => setAdmin(e.target.value)}
        placeholder="Enter Lonestar number" required />
        
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password" required />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <p>Or</p>
    <Button id="signupbtn" variant="secondary" onClick={handleShow2}>Sign Up</Button>
        </div>
     

</Col><Col className="d-none d-lg-block" lg={3}></Col></Row>


  
  </Container>


  </>
  );
}

export default AdminLogin;