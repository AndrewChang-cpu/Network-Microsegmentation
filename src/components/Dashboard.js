import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch('http://18.118.164.72:3000/api/getNetworkPolicies')
      .then(response => response.json())
      .then(data => setPolicies(data))
      .catch(error => console.error('Error fetching policies:', error));
  }, []);

  const handleDelete = (policyName) => {
    fetch('http://18.118.164.72:3000/api/deleteNetworkPolicy', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policyName })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        setPolicies(policies.filter(policy => policy.name !== policyName));
    })
    .catch(error => {
        console.error('Error deleting policy:', error);
        alert('Failed to delete the policy');
    });
};

  const handleAddPolicy = () => {
    navigate('/add');
  };

  const renderPorts = (ports) => (
    <ul>
      {ports.map((port, index) => (
        <li key={index}>Port {port.port}, {port.protocol}</li>
      ))}
    </ul>
  );

  const renderPods = (rules, type) => rules.map((rule, idx) => (
    <div key={idx}>
      {rule[type]?.map((entry, index) => (
        <div key={index}>
          <p>{type === 'from' ? 'From' : 'To'} {entry.podSelector.matchLabels.app}</p>
          {entry.ports && renderPorts(entry.ports)}
        </div>
      ))}
      {rule.ports && renderPorts(rule.ports)}
    </div>
  ));

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-semibold mb-8">Network Policy Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-3">Policy Name</th>
              <th className="p-3">Main Device</th>
              <th className="p-3">Ingress</th>
              <th className="p-3">Egress</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.name} className="border-b border-gray-200">
                <td className="p-3">{policy.name}</td>
                <td className="p-3">{policy.podSelector.matchLabels.app}</td>
                <td className="p-3">{policy.ingress && renderPods(policy.ingress, 'from')}</td>
                <td className="p-3">{policy.egress && renderPods(policy.egress, 'to')}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(policy.name)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleAddPolicy}
          className="mt-4 block mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Policy
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
