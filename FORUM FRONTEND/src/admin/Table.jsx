import React from 'react';
import './Table.css'; // Ensure this path is correct

const Table = ({ title }) => {
  // Sample data
  const data = [
    { id: 1, name: 'Lisa Manoban', activity: 'Logged In', date: '2024-11-01' },
    { id: 2, name: 'Kim Jisoo', activity: 'Joined Forum', date: '2024-11-04' },
    { id: 3, name: 'Kim Jennie', activity: 'Posted a Comment', date: '2024-11-05' },
    { id: 4, name: 'Park Chaeyong', activity: 'Liked a Post', date: '2024-07-23' },
    // Add more data as needed
  ];

  return (
    <div className="table-container">
      <h3>{title}</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Activity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.activity}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
