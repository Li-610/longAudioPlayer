// AudioPlayer.js
import React, { useState } from "react";
import { Layout, Row, Col, Card } from "antd";
import ControlPanel from "./ControlPanel";
import ProgressBar from "./ProgressBar";
import AudioList from "./AudioList";
import BookmarkManager from "./BookmarkManager";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { formatTime, getDistanceToSegment } from "../../utils"; // Import getDistanceToSegment

const { Content } = Layout;

const AudioPlayer = ({ audiobook }) => {
  // Destructure data from audiobook
  const { title, descriptions, cover, audio } = audiobook;

  // Adjust cover image path
  const coverPath = `${process.env.PUBLIC_URL}${cover}`;

  // State for bookmarks, lifted to AudioPlayer component
  const [bookmarks, setBookmarks] = useState([]);

  // Adjust audio file paths
  const audioFiles = audio.map((url, index) => ({
    id: index,
    name: `Track ${index + 1}`,
    url: `${process.env.PUBLIC_URL}${url}`,
  }));

  const [currentAudio, setCurrentAudio] = useState(audioFiles[0]);

  // Use custom hook for audio player functionality
  const {
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
  } = useAudioPlayer(currentAudio.url);

  // Define points for the polyline progress bar
  const polylinePoints = [
    [10, 10],
    [750, 10],
    [750, 80],
    [10, 80],
    [10, 150],
    [750, 150],
    [750, 220],
    [10, 220],
    [10, 290],
    [750, 290],
  ];

  // Get start and end points
  const startPoint = polylinePoints[0];
  const endPoint = polylinePoints[polylinePoints.length - 1];

  // Handle click on progress bar to seek audio
  const handleProgressClick = (
    e,
    totalLength,
    segmentLengths,
    polylinePoints,
    pathElement
  ) => {
    // Get SVG point of click event
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    // Initialize variables to find closest segment
    let minDistance = Infinity;
    let closestSegmentIndex = -1;
    let closestPointOnPath = null;
    let lengthUpToSegment = 0;

    let accumulatedLength = 0;

    // Loop through segments to find the closest one to click point
    for (let i = 0; i < polylinePoints.length - 1; i++) {
      const start = { x: polylinePoints[i][0], y: polylinePoints[i][1] };
      const end = { x: polylinePoints[i + 1][0], y: polylinePoints[i + 1][1] };

      // Use getDistanceToSegment to find distance and closest point
      const { distance, closestPoint } = getDistanceToSegment(
        svgPoint,
        start,
        end
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestSegmentIndex = i;
        closestPointOnPath = closestPoint;
        lengthUpToSegment = accumulatedLength;
      }

      accumulatedLength += segmentLengths[i];
    }

    // Calculate the length to the clicked point
    const dx = closestPointOnPath.x - polylinePoints[closestSegmentIndex][0];
    const dy = closestPointOnPath.y - polylinePoints[closestSegmentIndex][1];
    const lengthOnSegment = Math.hypot(dx, dy);

    const totalLengthToPoint = lengthUpToSegment + lengthOnSegment;

    // Calculate new progress and time
    const newProgress = totalLengthToPoint / totalLength;
    const newTime = newProgress * duration;

    // Update audio current time and progress
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row style={{ height: "100%" }}>
          {/* Left side */}
          <Col
            span={12}
            style={{
              padding: "20px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Fixed title */}
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Audio File List
            </div>
            {/* Scrollable list */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              <AudioList
                audioFiles={audioFiles}
                currentAudio={currentAudio}
                setCurrentAudio={setCurrentAudio}
                setIsPlaying={() => {}}
              />
            </div>
            {/* Audio player at the bottom */}
            <div style={{ marginTop: "20px" }}>
              {/* Custom polyline progress bar */}
              <ProgressBar
                progress={progress}
                onProgressClick={handleProgressClick}
                polylinePoints={polylinePoints}
                startPoint={startPoint}
                endPoint={endPoint}
                bookmarks={bookmarks} // Pass bookmarks data
                duration={duration} // Pass audio duration
              />
              {/* Control panel */}
              <ControlPanel
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                currentTime={currentTime}
                duration={duration}
                formatTime={formatTime}
                onRewind={handleRewind}
                onFastForward={handleFastForward}
              />
              {/* Bookmark manager */}
              <BookmarkManager
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                currentTime={currentTime}
                formatTime={formatTime}
                audioRef={audioRef}
                duration={duration}
                setCurrentTime={setCurrentTime}
                setProgress={setProgress}
              />
            </div>
          </Col>

          {/* Right side */}
          <Col
            span={12}
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Card
              hoverable
              style={{ width: "60%" }}
              cover={
                <img src={coverPath} style={{ width: "100%" }} alt="Cover" />
              }
            >
              <Card.Meta title={title} description={descriptions} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AudioPlayer;
