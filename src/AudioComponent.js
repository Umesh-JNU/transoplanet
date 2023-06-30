import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const apiKey = "d9296001bb0545fea50327c98cdd0fea";
const region = "eastus";

export default function AudioComponent({ languageList, lang, text }) {
  console.log({ lang, text });
  const [audioData, setAudioData] = useState(null);
  const [audioSynthesized, setAudioSynthesized] = useState(false);

  useEffect(() => {
    // setAudioData(null);

    const idx = languageList.findIndex(ln => ln.code === lang);
    if (text) {
      if (idx >= 0) {
        console.log({ idx, text });
        // Create the speech config with the API key and endpoint
        const speechConfig = sdk.SpeechConfig.fromSubscription(apiKey, region);

        speechConfig.speechSynthesisLanguage = languageList[idx].nativeArea;

        // Create the speech synthesizer
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);

        // Start synthesis and wait for the audio data
        synthesizer.speakTextAsync(
          text,
          result => {
            console.log({ result })
            console.log({ r1: result.reason, r2: sdk.ResultReason.SynthesizingAudioCompleted });
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
              const audio = result.audioData;
              setAudioData(audio);
            }
          },
          error => {
            console.error("Speech synthesis error:", error);
          }
        );
      } else {
        window.alert('Something went wrong.')
      }
    }
  }, [lang, text]);

  const download = () => {
    if (audioData) {
      const blob = new Blob([audioData], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'speech.mp3';
      downloadLink.click();

      URL.revokeObjectURL(audioUrl);
    }
  };

  console.log({ audioData })
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <audio key={URL.createObjectURL(new Blob([audioData], { type: 'audio/wav' }))} controls="controls">
        <source src={URL.createObjectURL(new Blob([audioData], { type: 'audio/wav' }))} type="audio/wav" />
      </audio>

      {/* <Button onClick={() => download()} disabled={!audioUrl}>Download Audio</Button> */}

      <Button onClick={() => download()}>Download Audio</Button>
    </div>
  );
};
