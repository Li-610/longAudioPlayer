// Function to format time in seconds to "minutes:seconds" format
export const formatTime = (time) => {
  if (!time || isNaN(time)) {
    return "0:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Function to calculate the shortest distance from a point to a line segment and find the closest point on the segment
export const getDistanceToSegment = (point, segmentStart, segmentEnd) => {
  // Extract coordinates
  const x = point.x;
  const y = point.y;
  const x1 = segmentStart.x;
  const y1 = segmentStart.y;
  const x2 = segmentEnd.x;
  const y2 = segmentEnd.y;

  // Calculate the parameters for the line segment
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  let param = -1;
  if (len_sq !== 0) {
    param = dot / len_sq;
  }

  let xx, yy;

  if (param < 0) {
    // Closest point is before the start of the segment
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    // Closest point is after the end of the segment
    xx = x2;
    yy = y2;
  } else {
    // Closest point is within the segment
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  // Calculate the distance from the point to the closest point on the segment
  const dx = x - xx;
  const dy = y - yy;
  const distance = Math.hypot(dx, dy);

  return { distance, closestPoint: { x: xx, y: yy } };
};
