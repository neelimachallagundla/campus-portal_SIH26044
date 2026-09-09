import {
  Building2,
  BriefcaseBusiness,
  FileText,
  Handshake,
  LogOut,
  MessageSquare,
  Search,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialChats = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Academician",
    lastMessage:
      "Can we schedule the industry collaboration meeting?",
    time: "10:32 AM",
    unread: 2,
    messages: [
      {
        from: "them",
        text: "Can we schedule the industry collaboration meeting?",
      },
      {
        from: "me",
        text: "Yes, we can schedule it this week.",
      },
    ],
  },
  {
    id: 2,
    name: "LearnBridge Placement Cell",
    role: "Institution",
    lastMessage:
      "The shortlisted students are ready for interviews.",
    time: "Yesterday",
    unread: 1,
    messages: [
      {
        from: "them",
        text: "The shortlisted students are ready for interviews.",
      },
    ],
  },
  {
    id: 3,
    name: "Rahul Kumar",
    role: "Student",
    lastMessage:
      "Thank you for reviewing my application.",
    time: "Mon",
    unread: 0,
    messages: [
      {
        from: "them",
        text: "Thank you for reviewing my application.",
      },
      {
        from: "me",
        text: "You're welcome. Best wishes!",
      },
    ],
  },
];

function getOrganizationName() {
  try {
    const profile = JSON.parse(
      localStorage.getItem("learnbridgeOrganizationProfile") || "{}"
    );
    return profile?.name || "TechNova Solutions";
  } catch {
    return "TechNova Solutions";
  }
}

function getInitials(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export default function OrganizationMessages() {
  const navigate = useNavigate();

  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const organizationName = getOrganizationName();

  const selectedChat = chats.find((chat) => chat.id === selectedId);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedId
          ? {
              ...chat,
              lastMessage: message,
              time: "Now",
              messages: [
                ...chat.messages,
                {
                  from: "me",
                  text: message,
                },
              ],
            }
          : chat
      )
    );

    setMessage("");
  };

  const handleLogout = () => {
    localStorage.removeItem("learnbridgeAuth");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-50">
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <Building2 className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h1 className="font-bold text-slate-900">LearnBridge</h1>
            <p className="text-xs text-slate-500">Organization Portal</p>
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-medium"
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

      <main className="md:ml-64 min-h-screen p-6 md:p-8">
        <div className="flex justify-between items-center mb-7">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Messages
            </h2>
            <p className="text-slate-500 mt-1">
              Communicate with students and academic partners.
            </p>
          </div>

          <button
            onClick={() => navigate("/organization/profile")}
            className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold"
          >
            {getInitials(organizationName)}
          </button>
        </div>

        <div className="bg-white border rounded-2xl overflow-hidden h-[calc(100vh-190px)] min-h-137.5 flex">
          {/* Chat list */}
          <div className="w-full md:w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="overflow-y-auto">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedId(chat.id)}
                  className={`w-full text-left p-4 border-b hover:bg-slate-50 ${
                    selectedId === chat.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {getInitials(chat.name)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {chat.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {chat.role}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-slate-400">
                      {chat.time}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-3 truncate">
                    {chat.lastMessage}
                  </p>

                  {chat.unread > 0 && (
                    <span className="inline-flex mt-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="hidden md:flex flex-1 flex-col">
            {selectedChat && (
              <>
                <div className="p-5 border-b flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    {getInitials(selectedChat.name)}
                  </div>

                  <div>
                    <h3 className="font-bold">
                      {selectedChat.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {selectedChat.role}
                    </p>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {selectedChat.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.from === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                          msg.from === "me"
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-slate-100 text-slate-800 rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={sendMessage}
                  className="p-4 border-t flex gap-3"
                >
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white"
                  >
                    <Send size={19} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}