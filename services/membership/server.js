const express = require('express');
const app = express();
app.use(express.json());

app.get('/healthz', (req,res)=>res.send('ok'));
app.get('/v1/memberships', (req,res)=>{
  // mock: later read from DB
  res.json([{id:"m-001", userId:"u-123", status:"active", plan:"Basic"}]);
});

// simple token check (mock “QR token”)
app.get('/v1/checkin-token/validate', (req,res)=>{
  const t = req.query.t;
  if (!t) return res.status(400).json({error:"missing t"});
  // TODO: verify Redis/JWT etc.
  return res.json({valid:true, memberStatus:"active"});
});

const port = process.env.PORT || 80;
app.listen(port, ()=>console.log(`membership up on ${port}`));