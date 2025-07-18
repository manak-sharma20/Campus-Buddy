import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Adjust path as needed
import './ProfileCard.css';

const ProfileCard = () => {
  const navigate = useNavigate();
  const { signOut, user, getUserDisplayName } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(getUserDisplayName() || 'Alex Johnson');
  const [email, setEmail] = useState(user?.email || 'alex.johnson@university.edu');

  const handleClose = () => {
    navigate('/home');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        navigate('/login'); // Redirect to login page after sign out
      }
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="profile-overlay">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <div className="avatar-placeholder">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="online-indicator"></div>
          </div>

          <div className="profile-info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-input"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="edit-input"
                />
                <div className="button-group">
                  <button className="edit-btn" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{name}</h2>
                <p>{email}</p>
                <div className="status-badge">
                  <span className="status-dot"></span>
                  Active Member
                </div>
                <div className="button-group">
                  <button className="edit-btn" onClick={handleEdit}>
                    Edit
                  </button>
                  <button className="signout-btn" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>

          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <span className="stat-number">24</span>
              <span className="stat-label">Events Attended</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <span className="stat-number">92%</span>
              <span className="stat-label">Attendance Rate</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <div className="detail-box">
              <div className="detail-icon">🎓</div>
              <div className="detail-content">
                <span className="detail-label">Department</span>
                <span className="detail-value">Computer Science Engineering</span>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <span className="detail-label">Academic Year</span>
                <span className="detail-value">3rd Year</span>
              </div>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-box">
              <div className="detail-icon">🏆</div>
              <div className="detail-content">
                <span className="detail-label">Achievements</span>
                <span className="detail-value">Hackathon Winner 2024</span>
              </div>
            </div>
            <div className="detail-box">
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">September 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;