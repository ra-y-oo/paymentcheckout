// routes/callback.js
const express = require('express');
const router = express.Router();

router.post('/callback', (req, res) => {
  const data = req.body;
  console.log("Payment Callback:", JSON.stringify(data));

  // You can store in DB or trigger order fulfillment here

  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

module.exports = router;
