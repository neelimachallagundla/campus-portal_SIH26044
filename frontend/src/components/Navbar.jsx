import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-slate-950"
        >
          Learn<span className="text-blue-600">Bridge</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            How it Works
          </a>

          <a
            href="#students"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            For Students
          </a>

          <a
            href="#industry"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            For Industry
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            About
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden text-sm font-semibold text-slate-700 transition hover:text-blue-600 sm:block"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;