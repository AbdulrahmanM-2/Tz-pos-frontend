export default function Sidebar({ user, onLogout }) {
  const nav = [
    { label: 'Point of Sale', icon: '🧾' },
    { label: 'Products',      icon: '📦' },
    { label: 'Orders',        icon: '📋' },
    { label: 'Customers',     icon: '👥' },
    { label: 'Reports',       icon: '📊' },
    { label: 'Settings',      icon: '⚙️' },
  ];

  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col">
      <div className="px-5 py-5 border-b border-gray-700">
        <p className="text-green-400 font-bold text-lg">TZ POS</p>
        <p className="text-xs text-gray-400 mt-0.5">Point of Sale System</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ label, icon }) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition text-left"
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      {user && (
        <div className="px-4 py-4 border-t border-gray-700">
          <p className="text-xs text-gray-400">{user.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          <button
            onClick={onLogout}
            className="mt-2 text-xs text-red-400 hover:text-red-300 transition"
          >
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}
