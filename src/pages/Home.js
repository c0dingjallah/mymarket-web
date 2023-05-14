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

   
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    // const { posts, dispatch } = usePostsContext();
    const { account, dispatch } = useAccountContext();
    const [posts, setPosts] = useState([]);

    const logout = (e) => {
    
      e.preventDefault();
      localStorage.removeItem('user');
      dispatch({ type: 'SET_ACCOUNT', payload: null }) 
          navigate('/', { replace: true });
         
  }


    useEffect(() => {
      async function fetchPosts() {
        const account1 = JSON.parse(localStorage.getItem('user'));
        console.log(account1)
        if(account1.username !== ""){
          var user = account1.username;
        try {
          const response = await fetch(`http://localhost:9000/api/posts/user/${user}`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error(error);
        }
      }else{
        console.log("error: no data")
      }
      }
      fetchPosts();
    }, []);
       
      const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !category || !price || !quantity || !image) {
          alert("Please fill in all required fields");
          return;
        }
    
        var postid = generate({
          length: 7,
          characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        });

        const formData = new FormData();
        formData.append('postid', postid);
        formData.append('image', image);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('user', account.username);
        formData.append('location', account.location);
        formData.append('userphonenumber', account.phonenumber);
    
        try {
          const response = await fetch('http://localhost:9000/api/posts/insert', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          console.log(data);
          fetchPosts();
          setName("");
          setImage(null);
          setCategory("");
          setPrice("");
          setQuantity("");
          document.getElementById("formimage").value = "";

        } catch (error) {
          console.error(error);
        }
      };

      async function fetchPosts() {
        const account1 = JSON.parse(localStorage.getItem('user'));
        console.log(account1)
        if(account1.username !== ""){
          var user = account1.username;
        try {
          const response = await fetch(`http://localhost:9000/api/posts/user/${user}`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error(error);
        }
      }else{
        console.log("error: no data")
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
          <form>
          <label>
        Image:
        <input id="formimage" type="file" 
         onChange={(e) => setImage(e.target.files[0])} />
      </label>
          <Form.Group controlId="1">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" 
         value={name}
         onChange={(e) => setName(e.target.value)}
        placeholder="Enter Product Name" required />
        
      </Form.Group>
      <Form.Group controlId="2">
              <Form.Label>Product Category</Form.Label>
              <Form.Control as="select"
               value={category}
               onChange={(e) => setCategory(e.target.value)}
              required >
                <option>Select an option</option>
                <option>Fish</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Sea Food</option>
                <option>Greens</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="3">
              <Form.Label>Price</Form.Label>
              <Form.Control as="select"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
              required >
               <option>Select an option</option>
                <option value={50} >50 LRD</option>
                <option value={100}>100 LRD</option>
                <option value={125}>125 LRD</option>
                <option value={150}>150 LRD</option>
                <option value={175}>175 LRD</option>
                <option value={500}>500 LRD</option>
                <option value={1000}>1000 LRD</option>
                <option value={1500}>1500 LRD</option>
                <option value={2000}>2000 LRD</option>
                <option value={3000}>3000 LRD</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="4">
              <Form.Label>Quantity</Form.Label>
              <Form.Control as="select"
               value={quantity}
               onChange={(e) => setQuantity(e.target.value)}
              required >
               <option>Select an option</option>
                <option value={1} >1</option>
                <option value={2} >2</option>
                <option value={5} >5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Control>
            </Form.Group>
      
      <Button variant='info' onClick={handleSubmit}>Submit</Button>
    </form>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
          <div>
      {posts && posts.map((post) => (
        <div  style={{backgroundColor: '#edeade', borderRadius: '10px'}} key={post.postid}>
          <h2>{post.name}</h2>
          <p>{post.category}</p>
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