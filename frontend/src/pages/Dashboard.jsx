import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const PRODUCTS = [
  { id: 1, name: 'Unga Sembe 2kg',    price: 3500 },
  { id: 2, name: 'Mchele Zambia 5kg', price: 12000 },
  { id: 3, name: 'Mafuta ya Kula 1L', price: 5500 },
  { id: 4, name: 'Sukari 1kg',        price: 2800 },
  { id: 5, name: 'Sabuni ya Nguo',    price: 1500 },
  { id: 6, name: 'Maziwa 500ml',      price: 1200 },
  { id: 7, name: 'Maji Baridi 1.5L',  price: 1000 },
  { id: 8, name: 'Soda Coca-Cola',    price: 1500 },
];

export default function Dashboard({ user, onLogout }) {
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [payStatus, setPayStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePayment = async () => {
    if (!cart.length) return;
    setPayStatus('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/payments/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: customerId || 'WALK-IN', amount: total }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setPayStatus('success');
        setCart([]);
        setCustomerId('');
      } else {
        setPayStatus('failed');
      }
    } catch {
      setPayStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-6">
            {/* Product grid */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addToCart(p)}
                    className="bg-white rounded-xl p-4 text-left shadow-sm hover:shadow-md hover:ring-2 hover:ring-green-400 transition"
                  >
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-green-600 font-bold mt-1">TZS {p.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart / checkout */}
            <div className="w-72 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-sm text-gray-400">No items yet. Tap a product.</p>
                ) : (
                  <ul className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{item.name} × {item.qty}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">TZS {(item.price * item.qty).toLocaleString()}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>TZS {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Customer ID (optional)"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={handlePayment}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-semibold rounded-lg py-2 text-sm transition"
                >
                  {loading ? 'Processing…' : 'Pay via M-Pesa'}
                </button>
                {payStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center font-medium">✓ Payment successful!</p>
                )}
                {payStatus === 'failed' && (
                  <p className="text-red-500 text-sm text-center font-medium">✗ Payment failed. Try again.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
