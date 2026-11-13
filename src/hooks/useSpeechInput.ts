import { useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export function useSpeechInput(onTranscript: (text: string, isFinal: boolean) => void) {
  const { langMode, setVoiceNotice } = useApp();
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors if already ended
      }
    }
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }

    if (typeof window === 'undefined') return;
    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRec) {
      setVoiceNotice({
        te: 'ఈ బ్రౌజర్‌లో వాయిస్ టైపింగ్ అందుబాటులో లేదు. దయచేసి Chrome లేదా Android ఫోన్ బ్రౌజర్ ఉపయోగించండి.',
        en: 'Speech recognition is not supported in this browser. Please try Chrome or type your message.',
      });
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = langMode === 'en' ? 'en-IN' : 'te-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setVoiceNotice(null);
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let fullTranscript = '';
        let hasFinal = false;
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          fullTranscript += result[0]?.transcript || '';
          if (result.isFinal) hasFinal = true;
        }
        if (fullTranscript.trim()) {
          onTranscriptRef.current(fullTranscript.trim(), hasFinal);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setVoiceNotice({
            te: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో మైక్రోఫోన్ అనుమతించండి.',
            en: 'Microphone permission was denied. Please allow microphone access in your browser settings.',
          });
        } else if (event.error !== 'aborted' && event.error !== 'no-speech') {
          setVoiceNotice({
            te: 'వాయిస్ గుర్తించడంలో సమస్య వచ్చింది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
            en: 'Could not recognize speech. Please try again.',
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceNotice({
        te: 'మైక్రోఫోన్ ప్రారంభించడంలో సమస్య వచ్చింది.',
        en: 'Unable to start microphone speech recognition.',
      });
    }
  }, [isListening, langMode, setVoiceNotice, stopListening]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return { isListening, toggleListening, stopListening };
}
