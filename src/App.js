import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import AudioComponent from './AudioComponent';
import axios from 'axios';

function App() {
  const languages = [
    { code: 'af', language: 'Afrikaans', nativeArea: 'af-ZA' }, //
    { code: 'am', language: 'Amharic', nativeArea: 'am-ET' }, //
    { code: 'ar', language: 'Arabic', nativeArea: 'ar-AE' }, //
    { code: 'bn', language: 'Bengali', nativeArea: 'bn-BD' },
    { code: 'bo', language: 'Tibetan', nativeArea: 'bo-CN' },
    { code: 'da', language: 'Danish', nativeArea: 'da-DK' },
    { code: 'de', language: 'German', nativeArea: 'de-DE' },
    { code: 'el', language: 'Greek', nativeArea: 'el-GR' }, //
    { code: 'en', language: 'English', nativeArea: 'en-US' },
    { code: 'es', language: 'Spanish', nativeArea: 'es-ES' },
    { code: 'fa', language: 'Persian', nativeArea: 'fa-IR' },
    { code: 'fi', language: 'Finnish', nativeArea: 'fi-FI' },
    { code: 'fil', language: 'Filipino', nativeArea: 'fil-PH' },
    { code: 'fj', language: 'Fijian', nativeArea: 'fj-FJ' },
    { code: 'hi', language: 'Hindi', nativeArea: 'hi-IN' },
    { code: 'f', language: 'French', nativeArea: 'fr-FR' },
    { code: 'ja', language: 'Japanese', nativeArea: 'ja-JA' },
    { code: 'pa', language: 'Punjabi', nativeArea: 'pa-IN' },
    { code: 'ta', language: 'Tamil', nativeArea: 'ta-IN' },
    { code: 'te', language: 'Telugu', nativeArea: 'te-IN' },
    { code: 'tr', language: 'Turkish', nativeArea: 'tr-TR' },
  ];
  const [to, setTo] = useState('');
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please type something.');
      return;
    };

    try {
      const response = await axios({
        method: 'post',
        url: `https://api.cognitive.microsofttranslator.com/translate`,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '8ba274f078ce4249b3d828db6e191952',
          'Ocp-Apim-Subscription-Region': 'southeastasia'
        },
        params: {
          'api-version': '3.0',
          'to': to
        },
        data: [{
          'text': text
        }]
      });

      const translatedText = response.data[0].translations[0].text;
      setOutput(translatedText);
      console.log(`Translated text: ${translatedText}`);
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
          <Form.Control placeholder="Type text here..." value={text} onChange={e => setText(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='langauges'>
          <Form.Label>Select Language</Form.Label>
          <Form.Select aria-label="Default select example"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option key="blankChoice" hidden value>None</option>
            {languages.map(({ code, language }) => {
              return <option key={code} value={code}>{language}</option>
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Translated Texts</Form.Label>
          <Form.Control as='textarea' placeholder="..." value={output} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Translate
        </Button>
      </Form>

      <AudioComponent languageList={languages} lang={to} text={output} />
    </Container>
  )
}

export default App;