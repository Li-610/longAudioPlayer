import React, { useState } from "react";
import { Layout, Dropdown, Button, Menu } from "antd";
import { RxExit } from "react-icons/rx";

const { Header } = Layout;

const AppHeader = ({ isBackVisible, setIsPlayerVisible, setIsBackVisible }) => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "transparent",
          borderBottom: "2px solid #ccc",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Back button, visible when isBackVisible is true */}
          {isBackVisible && (
            <Button
              type="link"
              icon={<RxExit />}
              onClick={() => {
                setIsPlayerVisible(false);
                setIsBackVisible(false);
              }}
              style={{ fontSize: 24, color: "#55A9F3" }}
            />
          )}
        </div>

        {/* Centered title */}
        <div
          style={{
            position: "absolute", // Absolute positioning
            left: "50%", // Move to the center of the parent container
            transform: "translateX(-50%)", // Precisely center the element
            fontSize: 30,
            fontWeight: 800,
            color: "#55A9F3",
          }}
        >
          Long Audio Player
        </div>
      </Header>
    </Layout>
  );
};

export default AppHeader;
