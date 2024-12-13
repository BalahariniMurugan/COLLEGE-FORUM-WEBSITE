import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile from an API or state based on user ID
    setUser({
      id,
      name: 'Sample User',
      email: 'user@example.com',
      bio: 'This is a sample user bio.',
      avatar: 'https://via.placeholder.com/150'
    });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container user-profile my-4">
      <img src={user.avatar} alt="Avatar" className="avatar" />
      <h1>{user.name}</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
};

export default UserProfile;
