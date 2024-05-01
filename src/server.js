const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let policies = [
  {
    nodeId: 1,
    ingress: [
      { sourceNode: 0, port: 8000 },
      { sourceNode: 2, port: 4084 }
    ],
    egress: [
      { destNode: 0, port: 8081 }
    ]
  },
  {
    nodeId: 2,
    ingress: [
      { sourceNode: 1, port: 9001 }
    ],
    egress: [
      { destNode: 1, port: 4084 }
    ]
  },
  {
    nodeId: 3,
    ingress: [
      { sourceNode: 1, port: 7000 },
      { sourceNode: 2, port: 6000 }
    ],
    egress: [
      { destNode: 0, port: 5000 }
    ]
  },
  {
    nodeId: 4,
    ingress: [
      { sourceNode: 0, port: 4000 },
      { sourceNode: 3, port: 3000 }
    ],
    egress: [
      { destNode: 2, port: 2000 }
    ]
  }
];


app.get('/policies', (req, res) => {
  res.json(policies);
});

app.get('/policies/:nodeId', (req, res) => {
  const policy = policies.find(p => p.nodeId === parseInt(req.params.nodeId));
  if (policy) {
    res.json(policy);
  } else {
    res.status(404).send('Policy not found');
  }
});

app.post('/policies', (req, res) => {
  const newPolicy = { nodeId: policies.length + 1, ...req.body };
  policies.push(newPolicy);
  res.status(201).json(newPolicy);
});

app.put('/policies/:nodeId', (req, res) => {
  const index = policies.findIndex(p => p.nodeId === parseInt(req.params.nodeId));
  if (index !== -1) {
    policies[index] = { ...policies[index], ...req.body };
    res.json(policies[index]);
  } else {
    res.status(404).send('Policy not found');
  }
});

app.delete('/policies/:nodeId', (req, res) => {
  policies = policies.filter(p => p.nodeId !== parseInt(req.params.nodeId));
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));