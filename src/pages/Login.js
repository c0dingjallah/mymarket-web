import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { useAccountContext } from '../hooks/useAccountContext'
   



function Login() {

    const navigate = useNavigate();
    const [show2, setShow2] = useState(false);


    const [username, setUsername] = useState("");
    const [userlocation, setuserLocation] = useState("");
    const [userpassword, setuserPassword] = useState("");
    const [confirmuserPassword, setuserConfirmPassword] = useState("");
   
    const [usernum, setusernum] = useState("")
    const [userloginpassword, setuserloginpassword] = useState("")

    const { account, dispatch } = useAccountContext();

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  function validatePhoneNumber(phoneNumber) {
    let sanitizedPhoneNumber = phoneNumber.replace(/^0+/, ''); // Remove leading 0s
    sanitizedPhoneNumber = sanitizedPhoneNumber.replace(/^2310?/, ''); // Remove 231 or 2310 from beginning
    const firstTwoDigits = sanitizedPhoneNumber.substring(0, 2);
    const firstThreeDigits = sanitizedPhoneNumber.substring(0, 3);
    if (
      (firstThreeDigits === '555' || firstTwoDigits === '88' || firstTwoDigits === '77') &&
      sanitizedPhoneNumber.length === 9 // assuming a 10-digit phone number
    ) {
      return true;
    }
    return false;
  }
  

  const userLogin = async (event) => {
    event.preventDefault();
    
    const loginData = {
    phonenumber: usernum,
    password: userloginpassword
    };
    

    if(usernum !== "" && userloginpassword !== ""){
      try {
        const response = await fetch('http://localhost:9000/api/user/login', {
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
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'SET_ACCOUNT', payload: data }) 
        navigate('/Home', { replace: true });
      } catch (error) {
        console.error(error);
        alert(error);
      }
    } else{
        alert("enter value for each field!");
    }


    };
    

    const signupuser = async (event) => {
      event.preventDefault();
    
      const signupData = {
        phonenumber: usernum,
        username: username,
        location: userlocation,
        password: userpassword
      };
    
      if (validatePhoneNumber(usernum)) {
        if (userpassword === confirmuserPassword) {
          try {
            const response = await fetch("http://localhost:9000/api/user/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(signupData)
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
              console.log(data.error);
              alert(data.error);
              return;
            }
    
            localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: 'SET_ACCOUNT', payload: data }) 
        navigate('/Home', { replace: true });
          } catch (error) {
            console.error(error);
            alert(error)
          }
        } else {
          alert("Passwords must match!");
        }
      } else {
        alert("Invalid Phone Number - Check Phone Number");
      }
    };
    

    return (
        <>
    <Container className="container0">
  
      <Row className="container1"><Col className="d-none d-lg-block" lg={3}></Col><Col style={{margin: '0 auto'}}>
   

        <div className="new-div">
          <h3>user Login</h3>
    <Form onSubmit={userLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Phone number</Form.Label>
        <Form.Control type="text" 
         value={usernum}
         onChange={(e) => setusernum(e.target.value)}
        placeholder="Enter Lonestar number" required />
        
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
        value={userloginpassword}
        onChange={(e) => setuserloginpassword(e.target.value)}
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

 
            <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={signupuser}>
            <Form.Group controlId="formEmailPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number"
              value={usernum}
              onChange={(e) => setusernum(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
                required />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location"
               value={userlocation}
               onChange={(e) => setuserLocation(e.target.value)}
                required />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
               value={userpassword}
               onChange={(e) => setuserPassword(e.target.value)}
              required />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
             value={confirmuserPassword}
             onChange={(e) => setuserConfirmPassword(e.target.value)}
            required />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>
            </Modal.Body>
            </Modal>


  </>
  );
}

export default Login;