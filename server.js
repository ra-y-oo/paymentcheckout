// server.js
const express = require('express');
const bodyParser = require('body-parser');
const stkPush = require('./stkPush');
const callbackRoute = require('./routes/callback');

const app = express();
app.use(bodyParser.json());
app.use('/api/callback', callbackRoute);

app.post('/api/pay', async (req, res) => {
  const { phone, amount } = req.body;
  try {
    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment initiation failed');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
