import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [policies, setPolicies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/policies')
      .then(response => response.json())
      .then(data => setPolicies(data))
      .catch(error => console.error('Error fetching policies:', error));
  }, []);

  const handleEdit = (nodeId) => {
    navigate(`/edit/${nodeId}`);
  };

  const handleAddPolicy = () => {
    navigate('/add');
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-3xl font-semibold mb-8">Network Policy Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-3">Node ID</th>
              <th className="p-3">Ingress</th>
              <th className="p-3">Egress</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.nodeId} className="border-b border-gray-200">
                <td className="p-3">Node {policy.nodeId}</td>
                <td className="p-3">
                  {policy.ingress.map(ing => (
                    <div key={`${policy.nodeId}-ing-${ing.sourceNode}`}>
                      Node {ing.sourceNode}: Port {ing.port}
                    </div>
                  ))}
                </td>
                <td className="p-3">
                  {policy.egress.map(eg => (
                    <div key={`${policy.nodeId}-eg-${eg.destNode}`}>
                      Node {eg.destNode}: Port {eg.port}
                    </div>
                  ))}
                </td>
                <td className="p-3">
                  <button 
                    onClick={() => handleEdit(policy.nodeId)} 
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button 
          onClick={handleAddPolicy} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Policy
        </button>
      </div>
    </div>
  );
};

export default Dashboard;