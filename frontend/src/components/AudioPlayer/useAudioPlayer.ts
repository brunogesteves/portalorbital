import { useState, useEffect, useRef, useCallback } from "react";

function extractTextFromHTML(html: string): string {
  if (!html) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  doc.querySelectorAll("script, style").forEach((el) => el.remove());
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

function splitIntoChunks(text: string, maxLength = 200): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

export default function useAudioPlayer({ content }: { content: string }) {
  const [contentText, setContentText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const chunksRef = useRef<string[]>([]);
  const currentChunkRef = useRef(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    const text = extractTextFromHTML(content);

    setContentText(text);
  }, [content]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakChunk = useCallback((index: number) => {
    const chunks = chunksRef.current;
    if (index >= chunks.length || cancelledRef.current) {
      console.log("[AudioPlayer] ⏹ Todos os chunks falados ou cancelado.");
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    const text = chunks[index];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1.1;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      currentChunkRef.current = index + 1;
      speakChunk(index + 1);
    };

    utterance.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") return;

      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const startSpeaking = () => {
    if (!contentText) {
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
      setIsPaused(false);
      return;
    }

    // const voices = window.speechSynthesis.getVoices();

    cancelledRef.current = false;
    chunksRef.current = splitIntoChunks(contentText);
    currentChunkRef.current = 0;

    window.speechSynthesis.cancel();
    setTimeout(() => {
      speakChunk(0);
    }, 200);
  };

  const pauseSpeaking = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return {
    data: { isSpeaking, isPaused, contentText },
    methods: { startSpeaking, pauseSpeaking, stopSpeaking, setContentText },
  };
}
