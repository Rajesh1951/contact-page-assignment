import React, { useState } from 'react'
import { Container, Alert, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ExtraText from './ExtraText';
import '../styles/flex.css'
const apiKey = process.env.REACT_APP_API_KEY;
function Contact() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [feedback, setFeedback] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  })
  const [validity, setValidity] = useState({
    name: true,
    email: true,
    phone: true,
    message: true
  })
  const [visible, setVisible] = useState(false);
  const [queue, setQueue] = useState(0);

  const onDismiss = () => setVisible(false);
  function handleChange(event) {
    const { name, value } = event.target;
    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
    setFeedback(prev => {
      return {
        ...prev,
        [name]: false
      }
    })
    if (name === 'name') {
      setValidity(prev => {
        return {
          ...prev,
          name: /^[A-Za-z]+$/gi.test(value)
        }
      })
    }
    else if (name === 'email') {
      setValidity(prev => {
        return {
          ...prev,
          [name]: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        }
      })
    }
    else if (name === 'phone') {
      setValidity(prev => {
        return {
          ...prev,
          [name]: /^[0-9]{10}$/.test(value)
        }
      })
    }
    else if (name === 'message') {
      setValidity(prev => {
        return {
          ...prev,
          [name]: value.length > 0
        }
      })
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { name, phone, email, message } = validity;
    if (!name) {
      setFeedback(prev => {
        return {
          ...prev,
          name: true
        }
      })
      return;
    }
    else if (!phone) {
      setFeedback(prev => {
        return {
          ...prev,
          phone: true
        }
      })
      return;
    }
    else if (!email) {
      setFeedback(prev => {
        return {
          ...prev,
          email: true
        }
      })
      return;
    }
    else if (!message) {
      setFeedback(prev => {
        return {
          ...prev,
          message: true
        }
      })
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    const raw = "{body}";

    const requestOptions = {
      method: 'PUT',
      redirect: 'follow',
      headers: myHeaders,
      body: raw
    };

    fetch("https://api.apilayer.com/mem_db/incr/react-assignment", requestOptions)
      .then(response => response.json())
      .then(result => {
        alertUser();
      })
      .catch(error => console.log('error', error));
  }
  function alertUser() {
    let myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);
    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/mem_db/get/react-assignment", requestOptions)
      .then(response => response.json())
      .then(result => {
        setQueue(result.result)
        setVisible(true)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <Container className='mt-4'>
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Your message has been successfully sent, and you are currently in position {queue} in the queue.
      </Alert>
      <div className="flexContainer">
        <div className="left d-flex flex-column w-auto">
          <h1 className='m-2'>Send us a message</h1>
          <p className='text-secondary'>You can contact us on anything related to our Products. We'll get in touch with you as soon as possible.</p>
          <Form>
            <FormGroup>
              <Label for="name">Your Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name here"
                onChange={(e) => handleChange(e)}
                value={data.name}
                className={validity.name ? 'focus-ring focus-ring-primary' : ' focus-ring focus-ring-danger'}
              />
              {feedback.name && <div className='text-danger m-2'>
                Name is invalid
              </div>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Adderess<address></address></Label>
              <Input type="email" name="email" id="email" placeholder="Email here"
                onChange={(e) => handleChange(e)}
                value={data.email}
                className={validity.email ? 'focus-ring focus-ring-primary' : ' focus-ring focus-ring-danger'}
              />
              {feedback.email && <div className='text-danger m-2'>
                Enter valid Email-id
              </div>}
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone<address></address></Label>
              <Input type="phone" name="phone" id="phone" placeholder="Number here"
                onChange={(e) => handleChange(e)}
                value={data.phone}
                className={validity.phone ? 'focus-ring focus-ring-primary' : ' focus-ring focus-ring-danger'}
              />
              {feedback.phone && <div className='text-danger m-2'>
                Phone number is invalid
              </div>}
            </FormGroup>
            <FormGroup>
              <Label for="message">Your Message</Label>
              <Input type="textarea" name="message" id="message" placeholder="Your Message"
                onChange={(e) => handleChange(e)}
                value={data.message}
                className={validity.message ? 'focus-ring focus-ring-primary' : ' focus-ring focus-ring-danger'}
              />
              {feedback.message && <div className='text-danger m-2'>
                Message should not be empty
              </div>}
            </FormGroup>
            <Button color="primary" onClick={(e) => handleSubmit(e)}>Contact Us</Button>
          </Form>
        </div>
        <div className="d-flex flex-column w-50">
          <ExtraText />
        </div>
      </div>
    </Container>
  )
}

export default Contact