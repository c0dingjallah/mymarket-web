import React, { useEffect, useState, useContext  } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import { generate } from 'random-password-generator';
// import { usePostsContext } from '../hooks/usePostsContext' 
import { useAccountContext } from '../hooks/useAccountContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Home() {

   
    const navigate = useNavigate();

    // const { posts, dispatch } = usePostsContext();
    const { account, dispatch } = useAccountContext();
    const [posts, setPosts] = useState([]);

    const logout = (e) => {
    
      e.preventDefault();
      localStorage.removeItem('admin');
          navigate('/Login2', { replace: true });
         
  }


    useEffect(() => {
        async function fetchPosts() {
      
            try {
              const response = await fetch(`http://localhost:9000/api/orders/getall`);
              const data = await response.json();
              setPosts(data);
            } catch (error) {
              console.error(error);
            }
         
        }
      fetchPosts();
    }, []);
       

      async function fetchPosts() {
      
       
        try {
          const response = await fetch(`http://localhost:9000/api/orders/getall`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error(error);
        }
     
      }

    return (
        <>
  <Container fluid>
    <Row>
        
        <Col>

      <Row><Col>
      <Navbar style={{background: 'white'}}>
      <Container>
       
        <Navbar.Collapse className="justify-content-end">
       
         
        </Navbar.Collapse>
        <a href="" onClick={(e) => logout(e)}> <FontAwesomeIcon icon={faSignOutAlt} />logout</a>
      </Container>
    </Navbar>
      </Col></Row>

      
        <Row>
          <Col></Col>
          <Col>
          <div>
         
      {posts.length > 0 && posts.map((post) => (
        <div  style={{backgroundColor: '#edeade', borderRadius: '10px'}} key={post.postid}>
          <h2>{post.name}</h2>
          <p>{post.category}</p>
          <p>Buyer: {post.buyer}</p>
          <p>Buyer Location: {post.buyerlocation}</p>
          <p>Buyer Phone Number: {post.buyerphonenumber}</p>
          <p>Seller: {post.seller}</p>
          <p>Seller Phone Number: {post.sellerphonenumber}</p>
          <p>Seller Location: {post.sellerlocation}</p>
          <p>Pickup Option: {post.pickupoption}</p>

          <img src={`data:image/png;base64,${post.image}`} alt={post.name} />
          <p>{post.price} LRD</p>
          <p>For {post.quantity}</p>
        </div>
      ))}
    </div>
          </Col>
          <Col></Col>
        </Row>

        
        </Col>
        </Row>
        </Container>


        
  </>
  );
}

export default Home;