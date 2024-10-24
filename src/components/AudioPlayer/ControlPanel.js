import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const ControlPanel = ({
  isPlaying,
  togglePlayPause,
  currentTime,
  duration,
  formatTime,
}) => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {/* Play/Pause Button */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        onClick={togglePlayPause}
        icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      />
      {/* Display current time and duration */}
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
};

export default ControlPanel; // Export the ControlPanel component
