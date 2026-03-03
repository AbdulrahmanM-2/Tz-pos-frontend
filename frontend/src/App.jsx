import React, { useState } from 'react';
export default function App() {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const handlePayment = async () => {
    const res = await fetch('http://localhost:8080/api/payments/mpesa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, amount })
    });
    const data = await res.json();
    setMessage(`Payment ${data.status.toUpperCase()}!`);
  };
  return (
    <div className="p-5">
      <h1>POS M-Pesa Payment</h1>
      <input placeholder="Customer ID" value={customerId} onChange={e=>setCustomerId(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button onClick={handlePayment}>Pay</button>
      <p>{message}</p>
    </div>
  );
}
