import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Import CSS eksternal
import Navbar from "../Navbar";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("User not logged in.");

        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhbnRlbmdtYWtzaW1hbEB5b3BtYWlsLmNvbSIsInVzZXJJZCI6IjYzODVkMzkyLWE0NjktNDgyYS1iOTA3LTYxYWY1OWU0NGRjNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjE1OTczOH0.hRN2WhZ8Jqt5KBKsTl5ANCoQXbc3PNyLfFJWc_omqEU`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setProfile(response.data.data);
        setName(response.data.data.name);
        setPhoneNumber(response.data.data.phoneNumber || "");
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_details");
    navigate("/login");
  };

  const handleEditProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("User not logged in.");

      const payload = { name, phoneNumber };

      const response = await axios.put(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhbnRlbmdtYWtzaW1hbEB5b3BtYWlsLmNvbSIsInVzZXJJZCI6IjYzODVkMzkyLWE0NjktNDgyYS1iOTA3LTYxYWY1OWU0NGRjNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjE1OTczOH0.hRN2WhZ8Jqt5KBKsTl5ANCoQXbc3PNyLfFJWc_omqEU`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setProfile(response.data.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-page">
        <Navbar/>
      <h1>Profile</h1>
      {profile && (
        <div className="profile-container">
          <div className="profile-picture-section">
            <img
              src={profile.profilePictureUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-picture"
            />
            <label htmlFor="upload-photo" className="upload-label">
              Change Profile Picture
              <input
                id="upload-photo"
                type="file"
                className="upload-input"
                onChange={() => alert("Fitur sedang dalam pengembangan.")}
              />
            </label>
          </div>

          {isEditing ? (
            <div className="edit-section">
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input"
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="edit-input"
                />
              </div>
              <div className="button-group">
                <button onClick={handleEditProfile} className="btn save-btn">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="btn cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="info-section">
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phoneNumber || "N/A"}
              </p>
              <button onClick={() => setIsEditing(true)} className="btn edit-btn">
                Edit Profile
              </button>
            </div>
          )}

          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
