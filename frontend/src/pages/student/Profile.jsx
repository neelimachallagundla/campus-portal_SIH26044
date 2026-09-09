import {
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Save,
  Target,
  User,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultProfile = {
  firstName: "Student",
  lastName: "",
  email: "student@learnbridge.com",
  phone: "",
  college: "JNTU College",
  branch: "Computer Science & Engineering",
  year: "3rd Year",
  location: "Andhra Pradesh, India",
  bio: "Aspiring software engineer focused on building strong technical skills and preparing for a career in the software industry.",
  careerGoal: "Java Full Stack Developer",
  github: "",
  linkedin: "",
};

const defaultSkills = [
  { name: "Java", level: "Intermediate" },
  { name: "Python", level: "Intermediate" },
  { name: "SQL", level: "Intermediate" },
  { name: "JavaScript", level: "Beginner" },
  { name: "React", level: "Beginner" },
  { name: "Data Structures", level: "Intermediate" },
  { name: "Git & GitHub", level: "Intermediate" },
  { name: "HTML & CSS", level: "Intermediate" },
];

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [skills, setSkills] = useState(defaultSkills);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    try {
      const savedProfile =
        localStorage.getItem("learnbridgeProfile");

      const savedSkills =
        localStorage.getItem("learnbridgeSkills");

      const authData =
        localStorage.getItem("learnbridgeAuth");

      // Load saved profile
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({
          ...defaultProfile,
          ...parsedProfile,
        });
      }

      // Load saved skills
      if (savedSkills) {
        const parsedSkills = JSON.parse(savedSkills);

        if (Array.isArray(parsedSkills)) {
          setSkills(parsedSkills);
        }
      }

      // If there is no saved profile,
      // load basic details from authentication
      if (authData && !savedProfile) {
        const auth = JSON.parse(authData);

        if (auth?.user) {
          const user = auth.user;

          const fullName =
            user.name ||
            `${user.firstName || ""} ${
              user.lastName || ""
            }`.trim();

          const nameParts = fullName
            .trim()
            .split(" ")
            .filter(Boolean);

          setProfile((prev) => ({
            ...prev,

            firstName:
              user.firstName ||
              nameParts[0] ||
              prev.firstName,

            lastName:
              user.lastName ||
              nameParts.slice(1).join(" ") ||
              prev.lastName,

            email:
              user.email ||
              prev.email,
          }));
        }
      }
    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );
    }
  }, []);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = () => {
    try {
      // Save profile
      localStorage.setItem(
        "learnbridgeProfile",
        JSON.stringify(profile)
      );

      // Save skills
      localStorage.setItem(
        "learnbridgeSkills",
        JSON.stringify(skills)
      );

      // Update authenticated user
      const authData =
        localStorage.getItem("learnbridgeAuth");

      if (authData) {
        try {
          const auth = JSON.parse(authData);

          if (auth?.user) {
            auth.user = {
              ...auth.user,

              name:
                `${profile.firstName} ${profile.lastName}`.trim(),

              firstName: profile.firstName,

              lastName: profile.lastName,

              email: profile.email,
            };

            localStorage.setItem(
              "learnbridgeAuth",
              JSON.stringify(auth)
            );
          }
        } catch (error) {
          console.error(
            "Failed to update authentication profile:",
            error
          );
        }
      }

      // Notify Dashboard
      window.dispatchEvent(
        new Event("learnbridge-profile-updated")
      );

      setEditing(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );
    }
  };

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    `${profile.firstName} ${profile.lastName}`.trim() ||
    "Student";

  // =========================================================
  // INITIALS
  // =========================================================

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "S";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-10">

          {/* Back to Dashboard */}

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>

          {/* Page Title */}

          <div className="ml-5 border-l border-slate-200 pl-5">

            <p className="text-sm font-semibold text-blue-600">
              LearnBridge
            </p>

            <h1 className="text-2xl font-bold text-slate-900">
              My Profile
            </h1>

          </div>

          {/* Header Actions */}

          <div className="ml-auto flex items-center gap-3">

            {saved && (
              <span className="hidden items-center gap-1.5 text-sm font-semibold text-emerald-600 sm:flex">
                <CheckCircle2 size={17} />
                Saved
              </span>
            )}

            {!editing ? (
              <button
                type="button"
                onClick={() =>
                  setEditing(true)
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setEditing(false)
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={16} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Save size={16} />
                  Save
                </button>

              </div>
            )}

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-10">

        {/* ===================================================
            PROFILE HERO
        =================================================== */}

        <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#08111f] via-[#172554] to-[#1d4ed8] p-7 text-white shadow-lg">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            {/* Avatar */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl font-bold text-blue-700 shadow-xl">
              {initials}
            </div>

            {/* Profile Information */}

            <div className="flex-1">

              <p className="text-sm font-semibold text-blue-300">
                Student Profile
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {displayName}
              </h2>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">

                <span className="flex items-center gap-1.5">
                  <Mail size={15} />
                  {profile.email}
                </span>

                <span className="flex items-center gap-1.5">
                  <GraduationCap size={15} />
                  {profile.year}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {profile.location}
                </span>

              </div>

            </div>

            {/* Career Goal */}

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur md:min-w-65">

              <div className="flex items-center gap-2 text-blue-300">

                <Target size={17} />

                <span className="text-xs font-semibold uppercase tracking-wide">
                  Career Goal
                </span>

              </div>

              <p className="mt-2 font-bold">
                {profile.careerGoal}
              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            CONTENT GRID
        =================================================== */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div>

                <h2 className="font-bold">
                  Personal Information
                </h2>

                <p className="text-xs text-slate-400">
                  Keep your profile information updated.
                </p>

              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <ProfileInput
                label="First Name"
                value={profile.firstName}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "firstName",
                    value
                  )
                }
              />

              <ProfileInput
                label="Last Name"
                value={profile.lastName}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "lastName",
                    value
                  )
                }
              />

              <ProfileInput
                label="Email"
                value={profile.email}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "email",
                    value
                  )
                }
                icon={<Mail size={15} />}
              />

              <ProfileInput
                label="Phone"
                value={profile.phone}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "phone",
                    value
                  )
                }
                icon={<Phone size={15} />}
              />

              <ProfileInput
                label="College"
                value={profile.college}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "college",
                    value
                  )
                }
                icon={
                  <GraduationCap size={15} />
                }
              />

              <ProfileInput
                label="Branch"
                value={profile.branch}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "branch",
                    value
                  )
                }
              />

              <ProfileInput
                label="Year"
                value={profile.year}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "year",
                    value
                  )
                }
              />

              <ProfileInput
                label="Location"
                value={profile.location}
                editing={editing}
                onChange={(value) =>
                  handleChange(
                    "location",
                    value
                  )
                }
                icon={
                  <MapPin size={15} />
                }
              />

            </div>

            {/* About Me */}

            <div className="mt-5">

              <label className="mb-2 block text-xs font-semibold text-slate-500">
                About Me
              </label>

              {editing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    handleChange(
                      "bio",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {profile.bio}
                </div>
              )}

            </div>

          </section>

          {/* =================================================
              QUICK INFO
          ================================================= */}

          <section className="space-y-6">

            {/* Career Goal */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Briefcase size={20} />
                </div>

                <div>

                  <h2 className="font-bold">
                    Career Goal
                  </h2>

                  <p className="text-xs text-slate-400">
                    Your target career
                  </p>

                </div>

              </div>

              {editing ? (
                <select
                  value={profile.careerGoal}
                  onChange={(e) =>
                    handleChange(
                      "careerGoal",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >

                  <option>
                    Java Full Stack Developer
                  </option>

                  <option>
                    Frontend Developer
                  </option>

                  <option>
                    Backend Developer
                  </option>

                  <option>
                    Data & AI Engineer
                  </option>

                  <option>
                    Cloud & DevOps Engineer
                  </option>

                  <option>
                    Software Engineer
                  </option>

                </select>
              ) : (
                <div className="rounded-xl bg-indigo-50 p-4">

                  <p className="font-bold text-indigo-900">
                    {profile.careerGoal}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-indigo-600">
                    Your learning recommendations
                    are aligned with this goal.
                  </p>

                </div>
              )}

            </div>

            {/* Professional Links */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="mb-5 font-bold">
                Professional Links
              </h2>

              <div className="space-y-4">

                {/* GitHub */}

                <ProfileInput
                  label="GitHub"
                  value={profile.github}
                  editing={editing}
                  placeholder="github.com/username"
                  onChange={(value) =>
                    handleChange(
                      "github",
                      value
                    )
                  }
                  icon={
                    <span className="text-[10px] font-extrabold">
                      GH
                    </span>
                  }
                />

                {/* LinkedIn */}

                <ProfileInput
                  label="LinkedIn"
                  value={profile.linkedin}
                  editing={editing}
                  placeholder="linkedin.com/in/username"
                  onChange={(value) =>
                    handleChange(
                      "linkedin",
                      value
                    )
                  }
                  icon={
                    <span className="text-xs font-extrabold">
                      in
                    </span>
                  }
                />

              </div>

            </div>

          </section>

        </div>

        {/* ===================================================
            TECHNICAL SKILLS
        =================================================== */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Award size={20} />
              </div>

              <div>

                <h2 className="font-bold">
                  Technical Skills
                </h2>

                <p className="text-xs text-slate-400">
                  Skills used to personalize your learning path.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/skill-assessment"
                )
              }
              className="rounded-xl border border-blue-200 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Update with Assessment
            </button>

          </div>

          <div className="flex flex-wrap gap-3">

            {skills.map((skill) => (

              <div
                key={skill.name}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >

                <p className="text-sm font-semibold text-slate-800">
                  {skill.name}
                </p>

                <p
                  className={`mt-1 text-[11px] font-semibold ${
                    skill.level === "Advanced"
                      ? "text-emerald-600"
                      : skill.level ===
                        "Intermediate"
                      ? "text-blue-600"
                      : "text-amber-600"
                  }`}
                >
                  {skill.level}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ===================================================
            ACCOUNT SUMMARY
        =================================================== */}

        <section className="grid gap-5 md:grid-cols-3">

          <SummaryCard
            icon={
              <BookOpen size={21} />
            }
            title="Learning Paths"
            value="3 Active"
            onClick={() =>
              navigate(
                "/learning-paths"
              )
            }
          />

          <SummaryCard
            icon={
              <Award size={21} />
            }
            title="Achievements"
            value="8 Earned"
            onClick={() =>
              navigate(
                "/achievements"
              )
            }
          />

          <SummaryCard
            icon={
              <Target size={21} />
            }
            title="Progress"
            value="45%"
            onClick={() =>
              navigate("/progress")
            }
          />

        </section>

      </main>

    </div>
  );
}

// =============================================================
// PROFILE INPUT
// =============================================================

function ProfileInput({
  label,
  value,
  editing,
  onChange,
  icon,
  placeholder = "",
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold text-slate-500">
        {label}
      </label>

      {editing ? (
        <div className="relative">

          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}

          <input
            type="text"
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className={`w-full rounded-xl border border-slate-200 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
              icon
                ? "pl-9 pr-4"
                : "px-4"
            }`}
          />

        </div>
      ) : (
        <div className="flex min-h-11 items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">

          {icon && (
            <span className="text-slate-400">
              {icon}
            </span>
          )}

          <span>
            {value || "Not provided"}
          </span>

        </div>
      )}

    </div>
  );
}

// =============================================================
// SUMMARY CARD
// =============================================================

function SummaryCard({
  icon,
  title,
  value,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>

          <p className="text-xs text-slate-400">
            {title}
          </p>

          <p className="mt-1 font-bold text-slate-900">
            {value}
          </p>

        </div>

      </div>

      <span className="text-lg text-slate-300 transition group-hover:text-blue-500">
        →
      </span>

    </button>
  );
}

export default Profile;