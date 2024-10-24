// useAudioPlayer.js

import { useState, useRef, useEffect } from "react";

const useAudioPlayer = (audioSrc) => {
  // Reference to the audio element
  const audioRef = useRef(new Audio(audioSrc));

  // State variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Value between 0 and 1
  const [currentTime, setCurrentTime] = useState(0); // Current playback time in seconds
  const [duration, setDuration] = useState(0); // Total duration of the audio in seconds

  // Update progress, currentTime, and duration as the audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        const current = audio.currentTime;
        const dur = audio.duration;
        setProgress(current / dur);
        setCurrentTime(current);
        setDuration(dur);
      }
    };

    // Event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  // Load new audio source when audioSrc changes
  useEffect(() => {
    audioRef.current.src = audioSrc;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  }, [audioSrc]);

  // Toggle play and pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // Rewind by 10 seconds
  const handleRewind = () => {
    const audio = audioRef.current;
    const newTime = Math.max(0, audio.currentTime - 10);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newTime / duration);
  };

  // Fast forward by 10 seconds
  const handleFastForward = () => {
    const audio = audioRef.current;
    const newTime = Math.min(duration, audio.currentTime + 10);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newTime / duration);
  };

  return {
    audioRef,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlayPause,
    handleRewind,
    handleFastForward,
    setProgress,
    setCurrentTime,
  };
};

export default useAudioPlayer;
