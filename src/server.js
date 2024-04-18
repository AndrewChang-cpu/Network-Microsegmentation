const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let policies = [
  { id: 1, src: 'NODE 1', dest: 'NODE 0', ingressPort: 'PORT X', egressPort: 'PORT A' },
  { id: 2, src: 'NODE 4', dest: 'NODE 2', ingressPort: 'PORT Y', egressPort: 'PORT B' },
  { id: 3, src: 'NODE 3', dest: 'NODE 1', ingressPort: 'PORT Z', egressPort: 'PORT X' }
];

app.get('/policies', (req, res) => {
  res.json(policies);
});

app.post('/policies', (req, res) => {
  const newPolicy = { id: policies.length + 1, ...req.body };
  policies.push(newPolicy);
  res.status(201).json(newPolicy);
});

app.put('/policies/:id', (req, res) => {
  const index = policies.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    policies[index] = { ...policies[index], ...req.body };
    res.json(policies[index]);
  } else {
    res.status(404).send('Policy not found');
  }
});

app.delete('/policies/:id', (req, res) => {
  policies = policies.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));