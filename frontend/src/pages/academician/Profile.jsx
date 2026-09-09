import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Mail,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialProfile = {
  name: "Dr. Priya Sharma",
  email: "priya.sharma@learnbridge.com",
  phone: "+91 98765 43210",
  employeeId: "FAC2024001",
  department: "Computer Science & Engineering",
  designation: "Associate Professor",
  qualification: "Ph.D. in Computer Science",
  experience: "8 Years",
  specialization: "Artificial Intelligence & Machine Learning",
  institution: "LearnBridge Institute of Technology",
  bio: "Experienced academician passionate about teaching, research, student mentoring, and industry collaboration.",
};

function AcademicianProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("learnbridgeAcademicianProfile");
      return saved ? { ...initialProfile, ...JSON.parse(saved) } : initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [form, setForm] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(form);
    localStorage.setItem(
      "learnbridgeAcademicianProfile",
      JSON.stringify(form)
    );

    window.dispatchEvent(new Event("learnbridge-academician-profile-updated"));

    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleCancel = () => {
    setForm(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                LearnBridge
              </h1>
              <p className="text-xs text-slate-500">Academician Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => navigate("/academician/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <GraduationCap className="w-5 h-5" />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/academician/students")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <User className="w-5 h-5" />
            Students
          </button>

          <button
            onClick={() => navigate("/academician/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <Briefcase className="w-5 h-5" />
            Faculty Opportunities
          </button>

          <button
            onClick={() => navigate("/academician/fdp-programs")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <BookOpen className="w-5 h-5" />
            FDP Programs
          </button>

          <button
            onClick={() => navigate("/academician/research")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <BookOpen className="w-5 h-5" />
            Research Projects
          </button>

          <button
            onClick={() => navigate("/academician/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <Briefcase className="w-5 h-5" />
            Collaborations
          </button>

          <button
            onClick={() => navigate("/academician/workshops")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <BookOpen className="w-5 h-5" />
            Workshops
          </button>

          <button
            onClick={() => navigate("/academician/messages")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            <Mail className="w-5 h-5" />
            Messages
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={() => {
              localStorage.removeItem("learnbridgeAuth");
              navigate("/login");
            }}
            className="w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/academician/dashboard")}
              className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Profile
              </h2>
              <p className="text-slate-500 mt-1">
                Manage your academician profile and professional information.
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Success */}
        {saved && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
            Profile updated successfully.
          </div>
        )}

        {/* Profile Hero */}
        <section className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border border-white/30">
              {profile.name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((word) => word[0])
                .join("")}
            </div>

            <div>
              <h3 className="text-2xl font-bold">{profile.name}</h3>
              <p className="text-blue-100 mt-1">{profile.designation}</p>
              <p className="text-blue-100 text-sm mt-2">
                {profile.department}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                editing={isEditing}
              />

              <InputField
                label="Employee ID"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                editing={isEditing}
              />

              <InputField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                editing={isEditing}
                type="email"
              />

              <InputField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                editing={isEditing}
              />

              <InputField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                editing={isEditing}
              />

              <InputField
                label="Designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                editing={isEditing}
              />
            </div>
          </section>

          {/* Academic Summary */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              Academic Summary
            </h3>

            <div className="space-y-5">
              <InfoItem
                icon={<GraduationCap className="w-5 h-5" />}
                label="Qualification"
                value={profile.qualification}
              />

              <InfoItem
                icon={<Briefcase className="w-5 h-5" />}
                label="Experience"
                value={profile.experience}
              />

              <InfoItem
                icon={<BookOpen className="w-5 h-5" />}
                label="Specialization"
                value={profile.specialization}
              />

              <InfoItem
                icon={<GraduationCap className="w-5 h-5" />}
                label="Institution"
                value={profile.institution}
              />
            </div>
          </section>
        </div>

        {/* Professional Information */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 mt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Professional Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <InputField
              label="Highest Qualification"
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              editing={isEditing}
            />

            <InputField
              label="Experience"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              editing={isEditing}
            />

            <InputField
              label="Area of Specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              editing={isEditing}
            />

            <InputField
              label="Institution"
              name="institution"
              value={form.institution}
              onChange={handleChange}
              editing={isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              About
            </label>

            {isEditing ? (
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-slate-600 leading-7">
                {profile.bio}
              </p>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          <StatCard
            icon={<User className="w-6 h-6" />}
            value="128"
            label="Students Mentored"
          />

          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            value="12"
            label="Research Projects"
          />

          <StatCard
            icon={<Briefcase className="w-6 h-6" />}
            value="8"
            label="Industry Collaborations"
          />
        </section>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  editing,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      {editing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-700 min-h-12 flex items-center">
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default AcademicianProfile;