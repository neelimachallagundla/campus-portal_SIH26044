function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-xl font-bold text-slate-950">
            Learn<span className="text-blue-600">Bridge</span>
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Bridging learning, skills and industry.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          SIH Prototype • Academia × Industry Collaboration
        </p>
      </div>
    </footer>
  );
}

export default Footer;