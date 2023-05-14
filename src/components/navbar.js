import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { useAccountContext } from '../hooks/useAccountContext'


const NavbarH = () => {

  const { account, dispatch } = useAccountContext();
    // const { logout } = useLogout()
   
  return (
    <header>
    <Navbar style={{background: 'white'}}>
      <Container>
        <Navbar.Brand style={{border: '1px solid black', padding: 5, borderRadius: 5}} href="#home"> 
        
        {account === null ? (
                  
            <React.Fragment>
             <FontAwesomeIcon icon={faStore} />MyMarket
            </React.Fragment>
        
        ) : (
        
          <Link style={{color: 'black'}} to="/Home"><FontAwesomeIcon icon={faStore} />MyMarket</Link>
        )}
        
        </Navbar.Brand>
        <Navbar.Toggle />
        <Link to="/">Market Place</Link>
        <Navbar.Collapse className="justify-content-end">
       
          <Navbar.Text>
            {/* Signed in as: <a href="#login">Tutor</a> */}
          </Navbar.Text>
        </Navbar.Collapse>
       {account === null && <Link to="/Login">Login / Signup</Link>}
      </Container>
    </Navbar>
    </header>
  )
}

export default NavbarH