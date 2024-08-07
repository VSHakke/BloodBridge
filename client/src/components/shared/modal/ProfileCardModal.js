// ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaHome, FaTint } from "react-icons/fa";
import "../../../styles/Profilecard.css";
// import axios from 'axios'; // Make sure to install axios
import API from "../../../services/API";

const ProfilePage = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messagePosition, setMessagePosition] = useState({});
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const response = await API.get("/inventory/get-latest-donation");
        if (response && response.data) {
          const { eligible, days } = response.data;
          setEligible(eligible);
          setMessage(
            eligible
              ? "Eligible to donate blood."
              : `You can donate after ${days} days.`
          );
          // console.log("Latest donation date:", latestDonation.lastDonationDate); // Access lastDonationDate
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching eligibility:", error);
      }
    };

    fetchEligibility();
  }, []);

  const handleMouseEnter = (msg, event) => {
    const rect = event.target.getBoundingClientRect();
    setMessage(msg);
    setShowMessage(true);
    setMessagePosition({
      top: rect.height + 5,
      left: rect.width / 2,
    });
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };

  return (
    <div className="profile-page-container">
      <Card className="p-4 shadow-lg rounded profile-card">
        <div className="close-btn" onClick={onClose}>
          &times;
        </div>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <div className="mb-4">
                <img
                  src={user?.image?.URL || "default-profile-pic.jpg"}
                  alt={
                    user?.name
                      ? `${user.name}'s profile picture`
                      : "Default profile picture"
                  }
                  className="rounded-circle img-fluid"
                  style={{ maxWidth: "180px", maxHeight: "180px" }}
                />
              </div>
            </Col>
            <Col md={8}>
              <Card.Title className="mb-4 text-center">{user?.name}</Card.Title>
              <Card.Text className="text-left">
                <div className="info-container">
                  <p>
                    <FaEnvelope /> {user?.email}
                  </p>
                  <p>
                    <FaPhone /> {user?.phone}
                  </p>
                  <p>
                    <FaHome /> {user?.address}
                  </p>
                  {user?.role === "donor" && (
                    <p>
                      <FaTint />{" "}
                      <span className="badge">{user?.bloodGroup}</span>
                    </p>
                  )}
                </div>
                {user?.role === "donor" && (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Button
                      onMouseEnter={(e) => handleMouseEnter(message, e)}
                      onMouseLeave={handleMouseLeave}
                      variant={eligible ? "success" : "danger"}
                      style={{
                        backgroundColor: eligible
                          ? "#28a745"
                          : "rgb(242, 71, 106)",
                        color: "white",
                        border: "none",
                        fontSize: "1rem",
                        padding: "0.5rem 1rem",
                        margin: "0.5rem",
                      }}
                    >
                      {eligible ? "Eligible" : "Ineligible"}
                    </Button>
                    {showMessage && (
                      <div
                        style={{
                          position: "absolute",
                          top: messagePosition.top,
                          left: messagePosition.left,
                          transform: "translateX(-50%)",
                          backgroundColor: "gray",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          zIndex: 1000,
                          width: "250px",
                          textAlign: "center",
                        }}
                      >
                        {message}
                      </div>
                    )}
                  </div>
                )}
              </Card.Text>
            </Col>
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <Button className="mr-2">Edit Profile</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
