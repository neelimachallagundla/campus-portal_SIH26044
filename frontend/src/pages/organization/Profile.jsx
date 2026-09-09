import {
  Building2,
  BriefcaseBusiness,
  Edit3,
  FileText,
  Globe,
  Handshake,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Save,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultProfile = {
  name: "TechNova Solutions",
  email: "contact@technova.com",
  phone: "+91 98765 43210",
  website: "www.technova.com",
  industry: "Information Technology",
  organizationType: "Technology Company",
  location: "Hyderabad, Telangana",
  companySize: "500-1000 Employees",
  founded: "2015",
  registrationId: "ORG2024001",
  description:
    "TechNova Solutions is a technology organization focused on software development, artificial intelligence, cloud computing and industry-oriented skill development.",
  contactPerson: "Rahul Mehta",
  designation: "HR & Talent Acquisition Manager",
};

function getInitials(name) {
  if (!name) return "TN";

  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0].charAt(0) +
    words[words.length - 1].charAt(0)
  ).toUpperCase();
}

export default function OrganizationProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [form, setForm] = useState(defaultProfile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("learnbridgeOrganizationProfile") ||
          "null"
      );

      if (stored) {
        setProfile({
          ...defaultProfile,
          ...stored,
        });

        setForm({
          ...defaultProfile,
          ...stored,
        });
      }
    } catch {
      setProfile(defaultProfile);
      setForm(defaultProfile);
    }
  }, []);

  const startEditing = () => {
    setForm(profile);
    setEditing(true);
  };

  const cancelEditing = () => {
    setForm(profile);
    setEditing(false);
  };

  const saveProfile = () => {
    localStorage.setItem(
      "learnbridgeOrganizationProfile",
      JSON.stringify(form)
    );

    setProfile(form);
    setEditing(false);
    setSaved(true);

    window.dispatchEvent(
      new Event("learnbridge-profile-updated")
    );

    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Building2 className="w-8 h-8 text-blue-600 mr-3" />

          <div>
            <h1 className="font-bold text-slate-900">
              LearnBridge
            </h1>
            <p className="text-xs text-slate-500">
              Organization Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate("/organization/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Building2 size={19} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/organization/opportunities")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <BriefcaseBusiness size={19} />
            Post Opportunities
          </button>

          <button
            onClick={() => navigate("/organization/internships")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <FileText size={19} />
            Internships
          </button>

          <button
            onClick={() => navigate("/organization/applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Users size={19} />
            Applications
          </button>

          <button
            onClick={() => navigate("/organization/collaborations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <Handshake size={19} />
            Collaborations
          </button>

          <button
            onClick={() => navigate("/organization/messages")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50"
          >
            <MessageSquare size={19} />
            Messages
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="md:ml-64 min-h-screen p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Organization Profile
            </h2>

            <p className="text-slate-500 mt-1">
              Manage your organization information.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={startEditing}
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white flex items-center gap-2"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEditing}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>

              <button
                onClick={saveProfile}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white flex items-center gap-2"
              >
                <Save size={18} />
                Save
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-green-50 text-green-700 border border-green-100">
            Organization profile updated successfully.
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white border rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
            <div className="w-24 h-24 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {getInitials(profile.name)}
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900">
                {profile.name}
              </h3>

              <p className="text-blue-600 mt-1">
                {profile.industry}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {profile.location}
                </span>

                <span className="flex items-center gap-1">
                  <Mail size={16} />
                  {profile.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6">
              Organization Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <ProfileField
                label="Organization Name"
                value={form.name}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, name: value })
                }
              />

              <ProfileField
                label="Email"
                value={form.email}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, email: value })
                }
              />

              <ProfileField
                label="Phone"
                value={form.phone}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, phone: value })
                }
                icon={<Phone size={16} />}
              />

              <ProfileField
                label="Website"
                value={form.website}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, website: value })
                }
                icon={<Globe size={16} />}
              />

              <ProfileField
                label="Industry"
                value={form.industry}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, industry: value })
                }
              />

              <ProfileField
                label="Organization Type"
                value={form.organizationType}
                editing={editing}
                onChange={(value) =>
                  setForm({
                    ...form,
                    organizationType: value,
                  })
                }
              />

              <ProfileField
                label="Location"
                value={form.location}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, location: value })
                }
              />

              <ProfileField
                label="Company Size"
                value={form.companySize}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, companySize: value })
                }
              />

              <ProfileField
                label="Founded"
                value={form.founded}
                editing={editing}
                onChange={(value) =>
                  setForm({ ...form, founded: value })
                }
              />

              <ProfileField
                label="Registration ID"
                value={form.registrationId}
                editing={editing}
                onChange={(value) =>
                  setForm({
                    ...form,
                    registrationId: value,
                  })
                }
              />
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              {editing ? (
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full mt-2 border rounded-xl px-4 py-3"
                />
              ) : (
                <p className="text-slate-600 mt-2 leading-relaxed">
                  {profile.description}
                </p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white border rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-bold mb-6">
              Primary Contact
            </h3>

            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-4">
              {getInitials(form.contactPerson)}
            </div>

            <ProfileField
              label="Contact Person"
              value={form.contactPerson}
              editing={editing}
              onChange={(value) =>
                setForm({
                  ...form,
                  contactPerson: value,
                })
              }
            />

            <div className="mt-5">
              <ProfileField
                label="Designation"
                value={form.designation}
                editing={editing}
                onChange={(value) =>
                  setForm({
                    ...form,
                    designation: value,
                  })
                }
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                This contact person will be shown to academic
                institutions and students for organization-related
                communication.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileField({
  label,
  value,
  editing,
  onChange,
  icon,
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      {editing ? (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="flex items-center gap-2 mt-2 text-slate-800">
          {icon && (
            <span className="text-slate-400">{icon}</span>
          )}
          <span>{value || "Not provided"}</span>
        </div>
      )}
    </div>
  );
}