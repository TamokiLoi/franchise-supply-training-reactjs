const ClientHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-red-500">FOODIX</div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a className="hover:text-red-500">Home</a>
            <a className="hover:text-red-500">Menu</a>
            <a className="hover:text-red-500">About</a>
            <a className="hover:text-red-500">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="rounded bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700">
              Book a Table
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
