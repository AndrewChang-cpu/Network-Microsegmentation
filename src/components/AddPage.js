import React, { useState } from 'react';
import axios from 'axios';

const AddNetworkPolicy = () => {
  const goToHome = () => window.location.href = '/';
  const [device, setDevice] = useState('');
  const [ingressRules, setIngressRules] = useState([]);
  const [egressRules, setEgressRules] = useState([]);

  const handleDeviceChange = (e) => setDevice(e.target.value);

  
  const handleRuleChange = (rules, setRules) => (index, field, value) => {
    const updatedRules = rules.map((rule, i) => {
      if (i === index) {
        return { ...rule, [field]: value };
      }
      return rule;
    });
    setRules(updatedRules);
  };

  const handleAddRule = (setRules) => () => {
    setRules(rules => [...rules, { device: '', port: '', protocol: 'TCP' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      device,
      ingress: ingressRules.map(rule => ({
        device: rule.device,
        port: rule.port,
        protocol: rule.protocol
      })),
      egress: egressRules.map(rule => ({
        device: rule.device,
        port: rule.port,
        protocol: rule.protocol
      }))
    };

    try {
      const response = await axios.post('http://18.118.164.72:3000/api/addNetworkPolicy', postData);
      alert('Network Policy Created Successfully: ' + response.data.networkPolicyId);
    } catch (error) {
      console.error('Error creating network policy:', error);
      alert('Failed to create network policy');
    }
  };


  return (
    <div style={styles.container}>
      <button onClick={goToHome} style={styles.homeButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z" fill="#222222"/>
        </svg>
      </button>
      <h1>Create Network Policy</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Device:
          <select value={device} onChange={handleDeviceChange} style={styles.input}>
            <option value="">Select a device</option>
            <option value="drone1">Drone1</option>
            <option value="drone2">Drone2</option>
            <option value="drone3">Drone3</option>
            <option value="drone4">Drone4</option>
          </select>
        </label>
        <div style={styles.section}>
          <h2>Ingress</h2>
          {ingressRules.map((rule, index) => (
            <div key={index} style={styles.rule}>
              <select value={rule.device} onChange={(e) => handleRuleChange(ingressRules, setIngressRules)(index, 'device', e.target.value)} style={styles.input}>
                <option value="">From Device</option>
                <option value="drone1">Drone1</option>
                <option value="drone2">Drone2</option>
                <option value="drone3">Drone3</option>
                <option value="drone4">Drone4</option>
              </select>
              <input type="number" value={rule.port} onChange={(e) => handleRuleChange(ingressRules, setIngressRules)(index, 'port', e.target.value)} placeholder="Port" style={styles.input} />
              <select value={rule.protocol} onChange={(e) => handleRuleChange(ingressRules, setIngressRules)(index, 'protocol', e.target.value)} style={styles.input}>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddRule(setIngressRules)} style={styles.button}>+ Add Rule</button>
        </div>
        <div style={styles.section}>
          <h2>Egress</h2>
          {egressRules.map((rule, index) => (
            <div key={index} style={styles.rule}>
              <select value={rule.device} onChange={(e) => handleRuleChange(egressRules, setEgressRules)(index, 'device', e.target.value)} style={styles.input}>
                <option value="">To Device</option>
                <option value="drone1">Drone1</option>
                <option value="drone2">Drone2</option>
                <option value="drone3">Drone3</option>
                <option value="drone4">Drone4</option>
              </select>
              <input type="number" value={rule.port} onChange={(e) => handleRuleChange(egressRules, setEgressRules)(index, 'port', e.target.value)} placeholder="Port" style={styles.input} />
              <select value={rule.protocol} onChange={(e) => handleRuleChange(egressRules, setEgressRules)(index, 'protocol', e.target.value)} style={styles.input}>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddRule(setEgressRules)} style={styles.button}>+ Add Rule</button>
        </div>
        <button type="submit" style={styles.submitButton}>Generate Allow Policy</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    margin: '5px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  section: {
    marginBottom: '20px'
  },
  rule: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '500px'
  },
  homeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AddNetworkPolicy;

// import React, { useState } from 'react';
// import axios from 'axios';

// const AddNetworkPolicy = () => {
//   const [device, setDevice] = useState('');
//   const [ingressRules, setIngressRules] = useState([]);
//   const [egressRules, setEgressRules] = useState([]);

//   const handleDeviceChange = (e) => setDevice(e.target.value);

//   const handleAddIngressRule = () => {
//     setIngressRules([...ingressRules, { device: '', port: '', protocol: 'TCP' }]);
//   };

//   const handleAddEgressRule = () => {
//     setEgressRules([...egressRules, { device: '', port: '', protocol: 'TCP' }]);
//   };

//   const handleIngressRuleChange = (index, field, value) => {
//     const updatedRules = ingressRules.map((rule, i) => {
//       if (i === index) {
//         return { ...rule, [field]: value };
//       }
//       return rule;
//     });
//     setIngressRules(updatedRules);
//   };
  
//   const handleEgressRuleChange = (index, field, value) => {
//     const updatedRules = egressRules.map((rule, i) => {
//       if (i === index) {
//         return { ...rule, [field]: value };
//       }
//       return rule;
//     });
//     setEgressRules(updatedRules);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Device:', device);
//     console.log('Ingress Rules:', ingressRules);
//     console.log('Egress Rules:', egressRules);
//     const postData = {
//       device,
//       ingress: ingressRules.map(rule => ({ 
//         from: { 
//           podSelector: { 
//             matchLabels: { 
//               app: rule.device 
//             }
//           },
//           ports: [{
//             port: rule.port,
//             protocol: rule.protocol
//           }]
//         }
//       })),
//       egress: egressRules.map(rule => ({
//         to: { 
//           podSelector: { 
//             matchLabels: { 
//               app: rule.device 
//             }
//           },
//           ports: [{
//             port: rule.port,
//             protocol: rule.protocol
//           }]
//         }
//       }))
//     };
  
//     try {
//       const response = await axios.post('http://18.118.164.72:3000/api/addNetworkPolicy', postData);
//       alert('Network Policy Created Successfully: ' + response.data.networkPolicyId);
//     } catch (error) {
//       console.error('Error creating network policy:', error);
//       alert('Failed to create network policy');
//     }
//   };
  

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Create Network Policy</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Device:</label>
//           <select value={device} onChange={handleDeviceChange}>
//             <option value="">Select a device</option>
//             <option value="drone1">Drone1</option>
//             <option value="drone2">Drone2</option>
//             <option value="drone3">Drone3</option>
//           </select>
//         </div>
//         <h2>Ingress</h2>
//         {ingressRules.map((rule, index) => (
//           <div key={index}>
//             <select value={rule.device} onChange={(e) => handleIngressRuleChange(index, 'device', e.target.value)}>
//               <option value="">From Device</option>
//               <option value="drone1">Drone1</option>
//               <option value="drone2">Drone2</option>
//               <option value="drone3">Drone3</option>
//             </select>
//             <input type="number" value={rule.port} onChange={(e) => handleIngressRuleChange(index, 'port', e.target.value)} placeholder="Port" />
//             <select value={rule.protocol} onChange={(e) => handleIngressRuleChange(index, 'protocol', e.target.value)}>
//               <option value="TCP">TCP</option>
//               <option value="UDP">UDP</option>
//             </select>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddIngressRule}>+ Add Rule</button>
//         <h2>Egress</h2>
//         {egressRules.map((rule, index) => (
//           <div key={index}>
//             <select value={rule.device} onChange={(e) => handleEgressRuleChange(index, 'device', e.target.value)}>
//               <option value="">To Device</option>
//               <option value="drone1">Drone1</option>
//               <option value="drone2">Drone2</option>
//               <option value="drone3">Drone3</option>
//             </select>
//             <input type="number" value={rule.port} onChange={(e) => handleEgressRuleChange(index, 'port', e.target.value)} placeholder="Port" />
//             <select value={rule.protocol} onChange={(e) => handleEgressRuleChange(index, 'protocol', e.target.value)}>
//               <option value="TCP">TCP</option>
//               <option value="UDP">UDP</option>
//             </select>
//           </div>
//         ))}
//         <button type="button" onClick={handleAddEgressRule}>+ Add Rule</button>
//         <br />
//         <button type="submit">Generate Allow Policy</button>
//       </form>
//     </div>
//   );
// };

// export default AddNetworkPolicy;
