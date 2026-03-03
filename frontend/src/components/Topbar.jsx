export default function Topbar({ user }) {
  const now = new Date().toLocaleDateString('en-TZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-base font-semibold text-gray-800">Point of Sale</h1>
        <p className="text-xs text-gray-400">{now}</p>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
            {user.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
      )}
    </header>
  );
}
