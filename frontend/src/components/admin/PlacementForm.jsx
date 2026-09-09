import { X } from "lucide-react";
import { useState } from "react";

function PlacementForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    student: "",
    company: "",
    role: "",
    package: "",
    location: "",
    placementDate: "",
    status: "Placed",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Add Placement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a student's placement details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2">

            {/* Student */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Student
              </label>

              <select
                name="student"
                value={formData.student}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
              >
                <option value="">Select student</option>
                <option value="Rahul Kumar">Rahul Kumar</option>
                <option value="Priya Sharma">Priya Sharma</option>
                <option value="Arjun Reddy">Arjun Reddy</option>
                <option value="Sneha Patel">Sneha Patel</option>
              </select>
            </div>

            {/* Company */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Company
              </label>

              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
              >
                <option value="">Select company</option>
                <option value="TCS">TCS</option>
                <option value="Infosys">Infosys</option>
                <option value="Accenture">Accenture</option>
                <option value="Deloitte">Deloitte</option>
                <option value="Amazon">Amazon</option>
                <option value="Wipro">Wipro</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Job Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
              >
                <option value="">Select role</option>
                <option value="Software Engineer">
                  Software Engineer
                </option>
                <option value="System Engineer">
                  System Engineer
                </option>
                <option value="Associate Software Engineer">
                  Associate Software Engineer
                </option>
                <option value="Analyst">Analyst</option>
                <option value="SDE I">SDE I</option>
                <option value="Project Engineer">
                  Project Engineer
                </option>
              </select>
            </div>

            {/* Package */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Package (LPA)
              </label>

              <input
                type="number"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g. 8.5"
                step="0.1"
                min="0"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Hyderabad"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Placement Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Placement Date
              </label>

              <input
                type="date"
                name="placementDate"
                value={formData.placementDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Status */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
              >
                <option value="Placed">Placed</option>
                <option value="Processing">Processing</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add Placement
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default PlacementForm;

