const express = require('express');
const app = express();
app.use(express.json());

// ✅ Root route for k8s probes
app.get('/', (_req, res) => res.status(200).send('OK'));

// Health route (also 200)
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));

// List bookings (mock)
app.get('/v1/bookings', (_req, res) => {
  res.json([
    { id: 'b-001', memberId: 'm-001', classId: 'c-101', startsAt: '2025-11-10T18:00:00Z', status: 'confirmed' }
  ]);
});

// Create booking (mock)
app.post('/v1/bookings', (req, res) => {
  const payload = req.body || {};
  res.status(201).json({ id: 'b-new', ...payload, status: 'confirmed' });
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`booking up on ${port}`));
