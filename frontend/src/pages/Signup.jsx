import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",

    // Common
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Student
    studentId: "",
    institution: "",
    department: "",
    degree: "",
    yearOfStudy: "",
    graduationYear: "",

    // Academician
    employeeId: "",
    designation: "",
    qualification: "",
    specialization: "",
    experience: "",
    bio: "",

    // Organization
    organizationName: "",
    organizationType: "",
    industry: "",
    website: "",
    location: "",
    companySize: "",
    founded: "",
    registrationId: "",
    contactPerson: "",
    contactDesignation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Role validation
    if (!form.role) {
      setError("Please select your role.");
      return;
    }

    // Password validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Create user object
    const user = {
      role: form.role,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    // Add role-specific information
    if (form.role === "student") {
      user.student = {
        studentId: form.studentId,
        institution: form.institution,
        department: form.department,
        degree: form.degree,
        yearOfStudy: form.yearOfStudy,
        graduationYear: form.graduationYear,
      };
    }

    if (form.role === "academician") {
      user.academician = {
        employeeId: form.employeeId,
        institution: form.institution,
        department: form.department,
        designation: form.designation,
        qualification: form.qualification,
        specialization: form.specialization,
        experience: form.experience,
        bio: form.bio,
      };
    }

    if (form.role === "organization") {
      user.organization = {
        organizationName: form.organizationName,
        organizationType: form.organizationType,
        industry: form.industry,
        website: form.website,
        location: form.location,
        companySize: form.companySize,
        founded: form.founded,
        registrationId: form.registrationId,
        contactPerson: form.contactPerson,
        contactDesignation: form.contactDesignation,
      };
    }

    // Save signup data for now
    localStorage.setItem(
      "learnbridgeUser",
      JSON.stringify(user)
    );

    // Also save role-specific profile
    if (form.role === "academician") {
      localStorage.setItem(
        "learnbridgeAcademicianProfile",
        JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          employeeId: form.employeeId,
          department: form.department,
          designation: form.designation,
          qualification: form.qualification,
          experience: form.experience,
          specialization: form.specialization,
          institution: form.institution,
          bio: form.bio,
        })
      );
    }

    if (form.role === "organization") {
      localStorage.setItem(
        "learnbridgeOrganizationProfile",
        JSON.stringify({
          name: form.organizationName,
          email: form.email,
          phone: form.phone,
          website: form.website,
          industry: form.industry,
          organizationType: form.organizationType,
          location: form.location,
          companySize: form.companySize,
          founded: form.founded,
          registrationId: form.registrationId,
          contactPerson: form.contactPerson,
          designation: form.contactDesignation,
        })
      );
    }

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600">
              LearnBridge
            </h1>
          </Link>

          <p className="mt-2 text-slate-500">
            Start your learning journey with us.
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

          <h2 className="text-2xl font-bold text-slate-900">
            Create an account
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Join LearnBridge and connect learning with opportunity.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                I am a
              </label>

              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="academician">Academician</option>
                <option value="organization">Organization</option>
              </select>
            </div>

            {/* Common Fields */}

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                {form.role === "organization"
                  ? "Contact person name"
                  : "Full name"}
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Phone number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* =========================
                STUDENT FIELDS
            ========================== */}

            {form.role === "student" && (
              <>
                {/* Student ID */}
                <div>
                  <label
                    htmlFor="studentId"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Student ID / Roll Number
                  </label>

                  <input
                    id="studentId"
                    type="text"
                    name="studentId"
                    value={form.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    College / Institution
                  </label>

                  <input
                    id="institution"
                    type="text"
                    name="institution"
                    value={form.institution}
                    onChange={handleChange}
                    placeholder="Enter your college"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Department
                  </label>

                  <input
                    id="department"
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Engineering"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Degree */}
                <div>
                  <label
                    htmlFor="degree"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Degree
                  </label>

                  <input
                    id="degree"
                    type="text"
                    name="degree"
                    value={form.degree}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Year */}
                <div>
                  <label
                    htmlFor="yearOfStudy"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Year of Study
                  </label>

                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={form.yearOfStudy}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                {/* Graduation Year */}
                <div>
                  <label
                    htmlFor="graduationYear"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Expected Graduation Year
                  </label>

                  <input
                    id="graduationYear"
                    type="number"
                    name="graduationYear"
                    value={form.graduationYear}
                    onChange={handleChange}
                    placeholder="e.g. 2027"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            {/* =========================
                ACADEMICIAN FIELDS
            ========================== */}

            {form.role === "academician" && (
              <>
                {/* Employee ID */}
                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Employee ID
                  </label>

                  <input
                    id="employeeId"
                    type="text"
                    name="employeeId"
                    value={form.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. FAC2024001"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Institution
                  </label>

                  <input
                    id="institution"
                    type="text"
                    name="institution"
                    value={form.institution}
                    onChange={handleChange}
                    placeholder="Enter your institution"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Department
                  </label>

                  <input
                    id="department"
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science & Engineering"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Designation
                  </label>

                  <input
                    id="designation"
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="e.g. Associate Professor"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label
                    htmlFor="qualification"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Qualification
                  </label>

                  <input
                    id="qualification"
                    type="text"
                    name="qualification"
                    value={form.qualification}
                    onChange={handleChange}
                    placeholder="e.g. Ph.D. in Computer Science"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Specialization
                  </label>

                  <input
                    id="specialization"
                    type="text"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Artificial Intelligence & Machine Learning"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Experience
                  </label>

                  <input
                    id="experience"
                    type="text"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g. 8 Years"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell us briefly about yourself"
                    rows={3}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            {/* =========================
                ORGANIZATION FIELDS
            ========================== */}

            {form.role === "organization" && (
              <>
                {/* Organization Name */}
                <div>
                  <label
                    htmlFor="organizationName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Organization Name
                  </label>

                  <input
                    id="organizationName"
                    type="text"
                    name="organizationName"
                    value={form.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Organization Type */}
                <div>
                  <label
                    htmlFor="organizationType"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Organization Type
                  </label>

                  <select
                    id="organizationType"
                    name="organizationType"
                    value={form.organizationType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select organization type</option>
                    <option value="Technology Company">
                      Technology Company
                    </option>
                    <option value="Startup">
                      Startup
                    </option>
                    <option value="MNC">
                      MNC
                    </option>
                    <option value="Government Organization">
                      Government Organization
                    </option>
                    <option value="NGO">
                      NGO
                    </option>
                    <option value="Research Organization">
                      Research Organization
                    </option>
                    <option value="Educational Institution">
                      Educational Institution
                    </option>
                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Industry */}
                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Industry
                  </label>

                  <input
                    id="industry"
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="e.g. Information Technology"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Website */}
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Website
                  </label>

                  <input
                    id="website"
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad, Telangana"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label
                    htmlFor="companySize"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Organization Size
                  </label>

                  <select
                    id="companySize"
                    name="companySize"
                    value={form.companySize}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select organization size</option>
                    <option value="1-10 Employees">
                      1-10 Employees
                    </option>
                    <option value="11-50 Employees">
                      11-50 Employees
                    </option>
                    <option value="51-200 Employees">
                      51-200 Employees
                    </option>
                    <option value="201-500 Employees">
                      201-500 Employees
                    </option>
                    <option value="500-1000 Employees">
                      500-1000 Employees
                    </option>
                    <option value="1000+ Employees">
                      1000+ Employees
                    </option>
                  </select>
                </div>

                {/* Founded */}
                <div>
                  <label
                    htmlFor="founded"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Founded Year
                  </label>

                  <input
                    id="founded"
                    type="number"
                    name="founded"
                    value={form.founded}
                    onChange={handleChange}
                    placeholder="e.g. 2015"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Registration ID */}
                <div>
                  <label
                    htmlFor="registrationId"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Registration ID
                  </label>

                  <input
                    id="registrationId"
                    type="text"
                    name="registrationId"
                    value={form.registrationId}
                    onChange={handleChange}
                    placeholder="Organization registration ID"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Contact Designation */}
                <div>
                  <label
                    htmlFor="contactDesignation"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Contact Person Designation
                  </label>

                  <input
                    id="contactDesignation"
                    type="text"
                    name="contactDesignation"
                    value={form.contactDesignation}
                    onChange={handleChange}
                    placeholder="e.g. HR & Talent Acquisition Manager"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            {/* =========================
                PASSWORD
            ========================== */}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Create account
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Back */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-slate-500 hover:text-blue-600"
          >
            ← Back to LearnBridge
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;