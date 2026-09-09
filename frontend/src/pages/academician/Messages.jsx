import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CheckCheck,
  ChevronRight,
  Clock3,
  MessageSquare,
  Search,
  Send,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const messagesData = [
  {
    id: 1,
    sender: "Dr. Priya Sharma",
    role: "AI Research Centre",
    subject: "AI Tools for Education Workshop",
    message:
      "Hello, the AI Tools for Education workshop is scheduled for September 22. Please confirm your participation before the registration deadline.",
    time: "10:30 AM",
    date: "Today",
    unread: true,
    category: "Workshops",
  },
  {
    id: 2,
    sender: "Rajesh Kumar",
    role: "Industry Partnerships",
    subject: "Industry Collaboration Proposal",
    message:
      "We would like to discuss a potential industry-academia collaboration focused on cloud computing and DevOps training for students.",
    time: "Yesterday",
    date: "Sep 8",
    unread: true,
    category: "Collaborations",
  },
  {
    id: 3,
    sender: "Anita Rao",
    role: "FDP Coordination Team",
    subject: "FDP Program Confirmation",
    message:
      "Your registration for the Faculty Development Program has been successfully confirmed. Further schedule details will be shared shortly.",
    time: "Sep 7",
    date: "Sep 7",
    unread: false,
    category: "FDP",
  },
  {
    id: 4,
    sender: "Placement Cell",
    role: "LearnBridge Placement Team",
    subject: "Student Placement Readiness Report",
    message:
      "The latest placement readiness report for your department is now available. Please review the students who require additional training.",
    time: "Sep 6",
    date: "Sep 6",
    unread: false,
    category: "Placement",
  },
  {
    id: 5,
    sender: "Dr. Arjun Reddy",
    role: "Research Department",
    subject: "Research Project Discussion",
    message:
      "Can we schedule a discussion regarding the proposed research project on AI-powered personalized learning systems?",
    time: "Sep 5",
    date: "Sep 5",
    unread: false,
    category: "Research",
  },
  {
    id: 6,
    sender: "Cloud Technology Partner",
    role: "Industry Partner",
    subject: "DevOps Workshop Invitation",
    message:
      "We are pleased to invite faculty members to participate in our upcoming DevOps and CI/CD hands-on workshop.",
    time: "Sep 4",
    date: "Sep 4",
    unread: false,
    category: "Workshops",
  },
];

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/academician/dashboard",
    icon: BriefcaseBusiness,
  },
  {
    label: "Students",
    path: "/academician/students",
    icon: Users,
  },
  {
    label: "Faculty Opportunities",
    path: "/academician/opportunities",
    icon: ChevronRight,
  },
  {
    label: "FDP Programs",
    path: "/academician/fdp-programs",
    icon: Clock3,
  },
  {
    label: "Research Projects",
    path: "/academician/research",
    icon: Wrench,
  },
  {
    label: "Collaborations",
    path: "/academician/collaborations",
    icon: Users,
  },
  {
    label: "Workshops",
    path: "/academician/workshops",
    icon: Wrench,
  },
  {
    label: "Messages",
    path: "/academician/messages",
    icon: MessageSquare,
  },
];

function Messages() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState(messagesData);
  const [reply, setReply] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesSearch =
        message.sender.toLowerCase().includes(search.toLowerCase()) ||
        message.subject.toLowerCase().includes(search.toLowerCase()) ||
        message.message.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && message.unread) ||
        message.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);

  const unreadCount = messages.filter((message) => message.unread).length;

  const openMessage = (message) => {
    setSelectedMessage(message);

    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id ? { ...item, unread: false } : item
      )
    );
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;

    setReply("");
    setSelectedMessage((prev) => ({
      ...prev,
      message: `Your reply: ${reply}`,
      time: "Just now",
      date: "Today",
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-40">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">LearnBridge</h1>
          <p className="text-sm text-slate-500 mt-1">Academician Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.path === "/academician/messages";

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <ArrowRight size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <span>Academician</span>
              <ChevronRight size={16} />
              <span className="text-slate-900">Messages</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Messages
                </h2>
                <p className="text-slate-500 mt-1">
                  Stay connected with institutions, industry partners, and
                  academic teams.
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl">
                <Bell size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {unreadCount} Unread
                </span>
              </div>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="lg:w-56 px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Unread</option>
                <option>Workshops</option>
                <option>Collaborations</option>
                <option>FDP</option>
                <option>Placement</option>
                <option>Research</option>
              </select>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare
                  size={42}
                  className="mx-auto text-slate-300 mb-4"
                />

                <h3 className="text-lg font-semibold text-slate-900">
                  No messages found
                </h3>

                <p className="text-slate-500 mt-1">
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              filteredMessages.map((message, index) => (
                <div
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`p-5 cursor-pointer transition hover:bg-slate-50 ${
                    index !== filteredMessages.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  } ${message.unread ? "bg-blue-50/40" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <UserRound size={20} className="text-blue-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-sm ${
                              message.unread
                                ? "font-bold text-slate-900"
                                : "font-semibold text-slate-800"
                            }`}
                          >
                            {message.sender}
                          </h3>

                          {message.unread && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <span className="text-xs text-slate-400">
                          {message.time}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        {message.role}
                      </p>

                      <h4 className="text-sm font-semibold text-slate-800 mt-3">
                        {message.subject}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {message.message}
                      </p>

                      <div className="mt-3">
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-600">
                          {message.category}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-slate-400 shrink-0 mt-2"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserRound size={20} className="text-blue-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedMessage.subject}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {selectedMessage.sender} · {selectedMessage.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Content */}
            <div className="p-6 overflow-y-auto max-h-[55vh]">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
                <Clock3 size={14} />
                {selectedMessage.date} · {selectedMessage.time}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-sm text-slate-700 leading-7">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-6">
                <span className="inline-flex px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">
                  {selectedMessage.category}
                </span>
              </div>
            </div>

            {/* Reply */}
            <div className="p-6 border-t border-slate-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendReply();
                    }
                  }}
                  placeholder="Write a reply..."
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={handleSendReply}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send size={17} />
                  Send
                </button>
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                <CheckCheck size={14} />
                Press Enter to send your reply
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;