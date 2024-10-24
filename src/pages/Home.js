import React, { useState, useEffect } from "react";
import { Typography, List, Card } from "antd";
import audiobooks from "../data/audiobooks";

const { Text } = Typography;

const Home = ({ handleCardClick, setIsBackVisible }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); // Set loading to false when the component mounts
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Display a list of audiobooks */}
      <List
        style={{ marginTop: 20 }}
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={audiobooks}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.id}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Display audiobook title */}
                  <Text
                    ellipsis
                    style={{
                      maxWidth: 150,
                      fontSize: "16px",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {item.title}
                  </Text>
                </div>
              }
              onClick={() => {
                handleCardClick(item); // Handle card click event
                setIsBackVisible(true); // Show the back button
              }}
            >
              {/* Display audiobook cover image */}
              <img
                src={item.cover}
                alt={item.title}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;
