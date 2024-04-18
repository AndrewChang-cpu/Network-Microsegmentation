import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/policies')
      .then(response => response.json())
      .then(data => setPolicies(data))
      .catch(error => console.error('Error fetching policies:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Network Policy Management</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table style={{ width: '80%', textAlign: 'center', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '10px' }}>Policy</th>
              <th style={{ padding: '10px' }}>Source</th>
              <th style={{ padding: '10px' }}>Destination</th>
              <th style={{ padding: '10px' }}>Ingress Port</th>
              <th style={{ padding: '10px' }}>Egress Port</th>
              <th style={{ padding: '10px' }}>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.id}>
                <td style={{ padding: '10px' }}>{policy.id}</td>
                <td style={{ padding: '10px' }}>{policy.src}</td>
                <td style={{ padding: '10px' }}>{policy.dest}</td>
                <td style={{ padding: '10px' }}>{policy.ingressPort}</td>
                <td style={{ padding: '10px' }}>{policy.egressPort}</td>
                <td style={{ padding: '10px' }}>
                  <button style={{ marginRight: '5px' }}>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
