import { useEffect, useState } from "react";
import * as usersApi from "../../api/users.api";
import { getUserId } from "../../utils/authStorage";
import "./Userprofile.css";

const getInitials = (name) => {
  if (!name) return "?";
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
};

export const Userprofile = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    name: "",
    email: "",
    phonenum: "",
    address: "",
    image: null,
  });
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const userId = getUserId();

  useEffect(() => {
    if (userId) {
      usersApi
        .getUser(userId)
        .then((response) => {
          const user = response.data.data;
          setUserData(user);
          setEditableData({
            name: user.name,
            email: user.email,
            phonenum: user.phonenum || "",
            address: user.address || "",
            image: user.image || null,
          });
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
          setStatus({
            type: "error",
            message: "Couldn't load your profile. Please refresh the page.",
          });
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditableData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleUpdate = () => {
    setSaving(true);
    setStatus(null);
    const formData = new FormData();
    formData.append("name", editableData.name);
    formData.append("phonenum", editableData.phonenum);
    formData.append("address", editableData.address);
    if (editableData.image instanceof File) {
      formData.append("image", editableData.image);
    }

    usersApi
      .updateUser(userId, formData)
      .then((response) => {
        setUserData(response.data.data);
        setStatus({ type: "success", message: "Profile updated successfully." });
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        setStatus({ type: "error", message: "Failed to update profile. Please try again." });
      })
      .finally(() => setSaving(false));
  };

  const getCurrentImageSrc = () => {
    if (editableData.image && editableData.image instanceof File) {
      return URL.createObjectURL(editableData.image);
    } else if (userData?.image) {
      return `${import.meta.env.VITE_BACKEND_URL}/uploads/${userData.image}`;
    }
    return null;
  };

  const currentImageSrc = getCurrentImageSrc();

  return (
    <div className="user-profile">
      <div className="profile-cover">
        <img src="/photos/vintage-postcards.jpeg" alt="" className="profile-cover__bg" />
        <div className="profile-cover__scrim" />
        <div className="profile-cover__text">
          <span className="profile-cover__eyebrow">Your account</span>
          <h1>Profile</h1>
          <p>Manage the details on your Tourists account</p>
        </div>
      </div>

      <div className="profile-container">
        {userData ? (
          <>
            <div className="profile-image-section">
              <div className="profile-image-container">
                {currentImageSrc ? (
                  <img
                    src={currentImageSrc}
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="profile-image profile-image--placeholder">
                    {getInitials(editableData.name)}
                  </div>
                )}
                <label className="image-upload-label" htmlFor="image-upload">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-upload-input"
                />
              </div>
              {!currentImageSrc && (
                <p className="no-image-message">Click the icon to upload a profile picture</p>
              )}
            </div>

            {status && (
              <div className={`profile-status profile-status--${status.type}`}>
                {status.message}
              </div>
            )}

            <div className="profile-form">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={editableData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleInputChange}
                  disabled
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="input-group">
                <label htmlFor="phonenum">Phone Number</label>
                <input
                  id="phonenum"
                  type="tel"
                  name="phonenum"
                  value={editableData.phonenum}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={editableData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
              </div>

              <button className="update-button" onClick={handleUpdate} disabled={saving}>
                {saving ? "Saving..." : "Update Profile"}
              </button>
            </div>
          </>
        ) : (
          <div className="loading-message">
            <div style={{ textAlign: "center" }}>
              <div className="loading-spinner" />
              Loading your profile...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
