import { NavLink, Outlet } from 'react-router';

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? 'font-semibold underline' : 'opacity-80 hover:opacity-100';
}

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-800 text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between p-4">
          <NavLink to="/" className="text-xl font-semibold">
            🚆 NSW Commute Board
          </NavLink>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>
            <NavLink to="/alerts" className={navClass}>
              Alerts
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
