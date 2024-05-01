import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditPolicy = () => {
  const { nodeId } = useParams();
  const [policy, setPolicy] = useState(null);  
  const navigate = useNavigate();

  const handleHomeClick = (nodeId) => {
    navigate(`/`);
  };
  useEffect(() => {
    fetch(`http://localhost:3001/policies/${nodeId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched policy:', data);
        setPolicy(data); 
      })
      .catch(error => {
        console.error('Error fetching policy details:', error);
        alert('Failed to fetch policy data');
      });
  }, [nodeId]);

  if (!policy) {
    return <div>Loading...</div>;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/policies/${nodeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(policy)
    })
    .then(response => response.ok ? alert('Policy updated successfully!') : alert('Failed to update policy'))
    .catch(error => console.error('Error updating policy:', error));
  };

  const handlePortChange = (index, value, type) => {
    const updatedPorts = [...policy[type]];
    updatedPorts[index].port = value;
    setPolicy({ ...policy, [type]: updatedPorts });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Edit Policy</h2>
        <button onClick={handleHomeClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z" fill="currentColor"/>
          </svg>
          Home
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {policy && policy.ingress.map((ingress, index) => (
          <div key={`ingress-${index}`} className="flex flex-col">
            <label className="mb-2">Ingress Port from Node {ingress.sourceNode}:</label>
            <input
              type="text"
              value={ingress.port}
              onChange={e => handlePortChange(index, e.target.value, 'ingress', 'port')}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}
        {policy && policy.egress.map((egress, index) => (
          <div key={`egress-${index}`} className="flex flex-col">
            <label className="mb-2">Egress Port to Node {egress.destNode}:</label>
            <input
              type="text"
              value={egress.port}
              onChange={e => handlePortChange(index, e.target.value, 'egress', 'port')}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}  

export default EditPolicy;
