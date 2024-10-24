import React, { useState, useEffect } from "react";
import usePolyline from "../../hooks/usePolyline";
import { formatTime } from "../../utils";

const ProgressBar = ({
  progress,
  onProgressClick,
  polylinePoints,
  startPoint,
  endPoint,
  bookmarks,
  duration,
}) => {
  // Use custom hook to get polyline data
  const { totalLength, segmentLengths, pathRef, pointsString } =
    usePolyline(polylinePoints);

  // Calculate current progress length
  const currentLength = progress * totalLength;

  // Handle click on the progress bar
  const handleClick = (e) => {
    if (onProgressClick) {
      onProgressClick(
        e,
        totalLength,
        segmentLengths,
        polylinePoints,
        pathRef.current
      );
    }
  };

  // State to store bookmark positions on the polyline
  const [bookmarkPositions, setBookmarkPositions] = useState([]);

  // Update bookmark positions when bookmarks or polyline changes
  useEffect(() => {
    if (pathRef.current && bookmarks.length > 0 && duration > 0) {
      const positions = bookmarks.map((bookmark) => {
        const bookmarkProgress = bookmark.time / duration;
        const length = bookmarkProgress * totalLength;
        const point = pathRef.current.getPointAtLength(length);
        return { x: point.x, y: point.y, id: bookmark.id };
      });
      setBookmarkPositions(positions);
    } else {
      setBookmarkPositions([]);
    }
  }, [bookmarks, totalLength, pathRef, duration]);

  return (
    <svg
      width="100%"
      height="300"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* Background polyline */}
      <polyline
        points={pointsString}
        stroke="#ccc"
        strokeWidth="10"
        fill="none"
      />
      {/* Progress polyline */}
      <polyline
        points={pointsString}
        stroke="#1890ff"
        strokeWidth="10"
        fill="none"
        strokeDasharray={totalLength}
        strokeDashoffset={totalLength - currentLength}
        ref={pathRef}
      />
      {/* Start point indicator */}
      <circle cx={startPoint[0]} cy={startPoint[1]} r="8" fill="#52c41a" />
      {/* End point indicator */}
      <circle cx={endPoint[0]} cy={endPoint[1]} r="8" fill="#f5222d" />
      {/* Current progress indicator */}
      {pathRef.current && (
        <circle
          cx={pathRef.current.getPointAtLength(currentLength).x}
          cy={pathRef.current.getPointAtLength(currentLength).y}
          r="10"
          fill="#1890ff"
        />
      )}
      {/* Bookmark markers */}
      {bookmarkPositions.map((pos) => (
        <circle key={pos.id} cx={pos.x} cy={pos.y} r="6" fill="red">
          <title>
            {formatTime(bookmarks.find((b) => b.id === pos.id).time)}
          </title>
        </circle>
      ))}
    </svg>
  );
};

export default ProgressBar;
