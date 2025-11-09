const express = require('express');
const app = express();
app.use(express.json());

app.get('/healthz', (req, res) => res.send('ok'));

// Validate a QR/entry (mock):
// GET /v1/checkins/validate?t=<token>&siteId=<site>
app.get('/v1/checkins/validate', (req, res) => {
  const { t, siteId } = req.query;
  if (!t || !siteId) return res.status(400).json({ error: 'missing t or siteId' });
  // TODO: verify token (Redis/JWT), check membership+booking, anti-fraud
  return res.json({ valid: true, siteId, memberStatus: 'active', requiresBooking: false });
});

// Record a check-in (mock)
app.post('/v1/checkins', (req, res) => {
  const payload = req.body || {};
  // TODO: persist + emit CheckInRecorded event
  res.status(201).json({ id: 'ci-001', ...payload, recordedAt: new Date().toISOString() });
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`checkin up on ${port}`));