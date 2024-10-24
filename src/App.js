import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppHeader from "./components/Header/AppHeader";
import Home from "./pages/Home";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import { Layout } from "antd";

const { Content } = Layout;

const App = () => {
  // State variables
  const [loading, setLoading] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [currentAudiobook, setCurrentAudiobook] = useState(null);

  // Handler for when an audiobook card is clicked
  const handleCardClick = (audiobook) => {
    setCurrentAudiobook(audiobook);
    setIsPlayerVisible(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Layout>
      {/* Application header */}
      <AppHeader
        isBackVisible={isBackVisible}
        setIsPlayerVisible={setIsPlayerVisible}
        setIsBackVisible={setIsBackVisible}
      />

      {/* Conditionally render AudioPlayer or Home component */}
      {isPlayerVisible ? (
        <AudioPlayer audiobook={currentAudiobook} />
      ) : (
        <Home
          handleCardClick={handleCardClick}
          setIsBackVisible={setIsBackVisible}
        />
      )}
    </Layout>
  );
};

export default App; // Export the App component
