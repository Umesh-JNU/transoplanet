import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import axiosInstance from './axiosUtils';

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '8ba274f078ce4249b3d828db6e191952',
    'Ocp-Apim-Subscription-Region': 'southeastasia'
  },
  params: {
    'api-version': '3.0'
  }
};

function App() {
  const [languages, setLanguages] = useState([]);
  const [to, setTo] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get('/languages', options);

        console.log({ data });
        const langList = Object.entries(data.translation);
        console.log({ langList });
        setLanguages(langList);
      } catch (error) {
        console.log({ error });
        alert(error);
      }
    })();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post('/translate', {
        headers: options.headers,
        params: {
          'api-version': '3.0',
          'to': to,
        },
        data: [{
          'text': text
        }]
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error.message);
    }
  }
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Input Texts</Form.Label>
          <Form.Control placeholder="Type text here..." />
        </Form.Group>

        <Form.Group className='mb-3' controlId='langauges'>
          <Form.Label>Select Language</Form.Label>
          <Form.Select aria-label="Default select example"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option key="blankChoice" hidden value>None</option>
            {languages.map(([code, { name }]) => {
              return <option key={code} value={code}>{name}</option>
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Translated Texts</Form.Label>
          <Form.Control as='textarea' placeholder="..." />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default App;