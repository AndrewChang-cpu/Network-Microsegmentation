import React, { useState, useEffect } from 'react';

const EditPolicy = ({ policyId }) => {
  const [policy, setPolicy] = useState({
    src: '',
    dest: '',
    ingressPort: '',
    egressPort: '',
  });

  useEffect(() => {
    fetch(`http://localhost:3001/policies/${policyId}`)
      .then(response => response.json())
      .then(data => setPolicy(data))
      .catch(error => console.error('Error fetching policy:', error));
  }, [policyId]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Policy</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <label htmlFor="src">Source</label>
        <input id="src" value={policy.src} onChange={(e) => setPolicy({ ...policy, src: e.target.value })} />

        <label htmlFor="dest">Destination</label>
        <input id="dest" value={policy.dest} onChange={(e) => setPolicy({ ...policy, dest: e.target.value })} />

        <label htmlFor="ingressPort">Ingress Port</label>
        <input id="ingressPort" value={policy.ingressPort} onChange={(e) => setPolicy({ ...policy, ingressPort: e.target.value })} />

        <label htmlFor="egressPort">Egress Port</label>
        <input id="egressPort" value={policy.egressPort} onChange={(e) => setPolicy({ ...policy, egressPort: e.target.value })} />

        <button type="submit" style={{ marginTop: '10px' }}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditPolicy;
