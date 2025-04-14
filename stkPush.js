// stkPush.js
const axios = require('axios');
const getAccessToken = require('./token');

const stkPush = async (phone, amount) => {
  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone, // 2547XXXXXXXX
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: "https://yourdomain.com/api/callback",
    AccountReference: "Order123",
    TransactionDesc: "Payment for Order",
  };

  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

module.exports = stkPush;
