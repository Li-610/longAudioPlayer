import React from "react";
import { List } from "antd";

// Define the AudioList component
const AudioList = ({
  audioFiles, // Array of audio file objects
  currentAudio, // Currently selected audio file
  setCurrentAudio, // Function to set the current audio file
  setIsPlaying, // Function to control playback state
}) => {
  return (
    <List
      bordered
      dataSource={audioFiles} // Data source for the list
      renderItem={(item) => (
        <List.Item
          style={{
            cursor: "pointer", // Change cursor to pointer on hover
            backgroundColor: currentAudio.id === item.id ? "#e6f7ff" : "white", // Highlight current audio
          }}
          onClick={() => {
            setCurrentAudio(item); // Set the selected audio as current
            setIsPlaying(true); // Start playing the selected audio
          }}
        >
          <List.Item.Meta title={item.name} />{" "}
          {/* Display the audio file name */}
        </List.Item>
      )}
    />
  );
};

export default AudioList; // Export the AudioList component
