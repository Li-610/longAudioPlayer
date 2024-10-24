import React from "react";
import { List, Button } from "antd";

// Define the BookmarkList component
const BookmarkList = ({ bookmarks, onSelect, onDelete, formatTime }) => {
  return (
    <List
      header={<div>Bookmark List</div>} // Header title
      bordered
      dataSource={bookmarks} // Data source for the list items
      renderItem={(item, index) => (
        <List.Item
          actions={[
            // Delete button for each bookmark
            <Button type="link" onClick={() => onDelete(index)} danger>
              Delete
            </Button>,
          ]}
        >
          {/* Display bookmark description and time; clickable to select the bookmark */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(item.time)}
          >
            {item.description} - {formatTime(item.time)}
          </div>
        </List.Item>
      )}
    />
  );
};

export default BookmarkList; // Export the BookmarkList component
