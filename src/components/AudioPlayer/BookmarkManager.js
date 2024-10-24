// BookmarkManager.js

import React, { useState } from "react";
import { Button } from "antd";
import BookmarkList from "./BookmarkList";

const BookmarkManager = ({
  bookmarks,
  setBookmarks,
  currentTime,
  formatTime,
  audioRef,
  duration,
  setCurrentTime,
  setProgress,
}) => {
  // Function to add a new bookmark
  const addBookmark = () => {
    const newBookmark = {
      id: Date.now(), // Use timestamp as a unique ID
      time: currentTime,
      description: `Bookmark ${bookmarks.length + 1}`,
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  // Function to select a bookmark and jump to its time
  const handleSelectBookmark = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
    setProgress(time / duration);
  };

  // Function to delete a bookmark by its index
  const handleDeleteBookmark = (index) => {
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(index, 1);
    setBookmarks(newBookmarks);
  };

  return (
    <div>
      {/* Add Bookmark Button */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button onClick={addBookmark}>Add Bookmark</Button>
      </div>
      {/* Bookmark List */}
      <div style={{ marginTop: "20px", flex: 1, overflowY: "auto" }}>
        <BookmarkList
          bookmarks={bookmarks}
          onSelect={handleSelectBookmark}
          onDelete={handleDeleteBookmark}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};

export default BookmarkManager;
