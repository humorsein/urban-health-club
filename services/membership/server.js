const express = require('express');
const app = express();
app.use(express.json());

app.get('/healthz', (req, res) => res.send('ok'));

app.get('/v1/memberships', (req, res) => {
  res.json([{ id: 'm-001', plan: 'basic', status: 'active' }]);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`membership up on ${port}`));
