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
import { generate } from 'random-password-generator';
import { usePostsContext } from '../hooks/usePostsContext'
import { useAccountContext } from '../hooks/useAccountContext'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Market() {

   
    // const { posts, dispatch } = usePostsContext();
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const { account, dispatch } = useAccountContext();
  
    const handleCloseModal = () => setShowModal(false);
  
    const handleOptionChange = (event) => setSelectedOption(event.target.value);
      
    const openPost = async (postid) => {
      const response = await fetch(`http://localhost:9000/api/posts/single/${postid}`);
      const data = await response.json();
      console.log(data);
      setSelectedPost(data);
      setShowModal(true);
    };

    const changeCategory = async (category) => {
      const response = await fetch(`http://localhost:9000/api/posts/category/${category}`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };

    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await fetch(`http://localhost:9000/api/posts/getall`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchPosts();
    }, []);

    async function fetchAllPosts() {
      try {
        const response = await fetch(`http://localhost:9000/api/posts/getall`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    const handleBuySubmit = async (event) => {
      event.preventDefault();

      var orderid = generate({
        length: 7,
        characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      });

    
      var obj = {
        orderid: orderid,
        buyer: account.username,
        buyerphonenumber: account.phonenumber,
        buyerlocation: account.location,
        pickupoption: selectedOption,
        postid: selectedPost.postid,
        image: selectedPost.image,
        name: selectedPost.name,
        category: selectedPost.category,
        price: selectedPost.price,
        quantity: selectedPost.quantity,
        seller: selectedPost.user,
        sellerphonenumber: selectedPost.userphonenumber,
        sellerlocation: selectedPost.location,

      }
    
      console.log(obj);

      
      try {

        const response = await fetch('http://localhost:9000/api/orders/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj)
        });
        const data = await response.json();
        console.log("response")
        console.log(data);

      } catch (error) {
        console.error(error);
      }
      setShowModal(false);
    };
   

    return (
        <>
  <Container>
    <Row>
        
        <Col>

        <Row>
  <Col>
    <div style={{ height: '60px', overflowY: 'auto', whiteSpace: 'nowrap' }}>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => fetchAllPosts()}>All</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Fish")}>Fish</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Fruits")}>Fruits</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Vegetables")}>Vegetables</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Sea Food")}>Sea Food</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Eggs")}>Eggs</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Greens")}>Greens</Button>
      <Button variant="dark" style={{ display: 'inline-block', verticalAlign: 'top', marginRight: '5px' }} onClick={() => changeCategory("Other")}>Other</Button>
      </div>

  </Col>
</Row>

        <Row>
          
          <Col>
          <Row>
          {posts.length > 0 ? (
          
          posts.map((post) => (
           
           <React.Fragment key={post.postid}>
              <Col sm={6}>
              <div
                className="postDiv"
                style={{
                  backgroundColor: "#edeade",
                  borderRadius: "10px",
                  backgroundImage: `url('data:image/png;base64,${post.image}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: '400px'
                }}
                onClick={() => openPost(post.postid)}
              >
                <p style={{backgroundColor: '#fff', borderRadius: '10px', width: '40%', fontWeight: 'bold', fontSize: '30px'}}>{post.name}</p>
                <p>{post.price} LRD</p>
                <p>For {post.quantity}</p>
              </div>

              </Col>
            </React.Fragment>
          ))
        ) : (
        
          <div>No posts found.</div>
        )}

      </Row>
          </Col>
      
        </Row>

        
        </Col>
        </Row>
        </Container>

        {selectedPost && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPost.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Category: {selectedPost.category}</p>
            <img src={`data:image/png;base64,${selectedPost.image}`} alt={selectedPost.name} />
            <p>Price: {selectedPost.price} LRD</p>
            <p>Location: {selectedPost.location}</p>
            <p>In stock: {selectedPost.instock ? 'Yes' : 'No'}</p>
            <p>Quantity: {selectedPost.quantity}</p>

            {account === null ? (
                  
                  <p><Link to="/Login">Login</Link> to purchase</p>            
              ) : (
              
                <Form onSubmit={handleBuySubmit}>
                <Form.Group>
                  <Form.Label>Select an option:</Form.Label>
                  <Form.Control as="select" onChange={handleOptionChange} value={selectedOption}>
                    <option value="">Choose option</option>
                    <option value="pickup">Pick up in person</option>
                    <option value="delivery">Delivery</option>
                  </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Buy
                </Button>
              </Form>
              )}
           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
  </>
  );
}

export default Market;