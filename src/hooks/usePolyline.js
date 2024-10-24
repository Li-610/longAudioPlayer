// usePolyline.js

import { useState, useRef, useEffect } from "react";

// Custom hook to manage polyline calculations
const usePolyline = (polylinePoints) => {
  // State to store the total length of the polyline
  const [totalLength, setTotalLength] = useState(0);

  // State to store the length of each segment in the polyline
  const [segmentLengths, setSegmentLengths] = useState([]);

  // Reference to the SVG path element
  const pathRef = useRef(null);

  // Convert polyline points to a string format for the SVG <polyline> element
  const pointsString = polylinePoints.map((point) => point.join(",")).join(" ");

  // Effect to calculate total length and segment lengths when polylinePoints change
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength(); // Get total length of the path
      setTotalLength(length);

      // Calculate the length of each segment
      const lengths = [];
      const points = polylinePoints;
      for (let i = 0; i < points.length - 1; i++) {
        const dx = points[i + 1][0] - points[i][0];
        const dy = points[i + 1][1] - points[i][1];
        lengths.push(Math.hypot(dx, dy)); // Calculate distance between two points
      }
      setSegmentLengths(lengths);
    }
  }, [pathRef, polylinePoints]);

  // Return relevant data and references
  return {
    totalLength,
    segmentLengths,
    pathRef,
    pointsString,
  };
};

export default usePolyline;
