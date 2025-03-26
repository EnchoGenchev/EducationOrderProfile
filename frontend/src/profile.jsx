import React, { useState } from 'react';
import './Profile.module.css'; // Create this file (optional) for component-specific styles

function Profile() {
  const [username, setUsername] = useState('John Doe');
  const [description, setDescription] = useState('A passionate coder');
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState(username);
  const [editDescription, setEditDescription] = useState(description);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = () => {
    setUsername(editUsername);
    setDescription(editDescription);
    toggleEdit();
  };

  return (
    <section>
      <div className="profile-menu">
        <h2>Your Profile</h2>
        <div className="profile-info">
          <img src="https://via.placeholder.com/100" alt="Profile Picture" />
          <p id="username">Username: {username}</p>
          <p id="description">Description: {description}</p>
          <button className="edit-button" onClick={toggleEdit}>Edit Profile</button>
        </div>
        {isEditing && (
          <div className="profile-edit">
            <h3>Edit Profile</h3>
            <input
              type="text"
              id="edit-username"
              placeholder="Enter new username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
            <textarea
              id="edit-description"
              placeholder="Enter new description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            >
              {editDescription}
            </textarea>
            <button className="save-button" onClick={saveProfile}>Save Changes</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;