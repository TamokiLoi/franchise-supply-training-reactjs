const ClientFooter = () => {
  return (
    <footer className="bg-[#111] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-bold text-white">FOODIX</h3>
          <p className="mt-4 text-sm">Fresh and delicious food every day.</p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <p className="text-sm">+84 123 456 789</p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Newsletter</h4>
          <input className="w-full rounded bg-[#222] px-3 py-2 text-sm outline-none" placeholder="Your email" />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs">© 2026 Foodix. All rights reserved.</div>
    </footer>
  );
};

export default ClientFooter;
