export const mpesaPayment = async (req, res) => {
  const { customerId, amount } = req.body;
  const success = Math.random() > 0.2;
  setTimeout(() => {
    res.json({ status: success ? 'success' : 'failed', amount, customerId });
  }, 1500);
};
