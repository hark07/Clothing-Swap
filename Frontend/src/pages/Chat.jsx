import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
} from "lucide-react";
import API from "../api/axios";

const Chat = () => {
  const { swapId } = useParams();

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/chat/${swapId}`);

      setMessages(data.messages || []);
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  }, [swapId]);

  useEffect(() => {
    if (!user?._id || !swapId) return;

    socketRef.current = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000",
    );

    socketRef.current.emit("join_room", swapId);

    loadMessages();

    socketRef.current.on("receive_message", (newMessage) => {
      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg._id && msg._id === newMessage._id,
        );

        if (exists) return prev;

        return [...prev, newMessage];
      });
    });

    return () => {
      socketRef.current.emit("leave_room", swapId);
      socketRef.current.off("receive_message");
      socketRef.current.disconnect();
    };
  }, [swapId, user?._id, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: messages.length > 1 ? "smooth" : "auto",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (!socketRef.current) return;

    socketRef.current.emit("send_message", {
      roomId: swapId,
      swapId,
      senderId: user._id,
      message: message.trim(),
    });

    setMessage("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Login Required</h2>

          <p className="text-gray-600">Please login to access the chat.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-6">
          <div className="h-20 rounded-3xl bg-white"></div>

          <div className="h-[500px] rounded-3xl bg-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border">
          {/* Header */}

          <div className="bg-black text-white px-8 py-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-2xl font-bold">
                  S
                </div>

                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></span>
              </div>

              <div>
                <h2 className="text-2xl font-bold">Swap Chat</h2>

                <p className="text-gray-300 text-sm">
                  Secure conversation between both users
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hover:bg-white/10 p-3 rounded-full transition">
                <Phone size={20} />
              </button>

              <button className="hover:bg-white/10 p-3 rounded-full transition">
                <Video size={20} />
              </button>

              <button className="hover:bg-white/10 p-3 rounded-full transition">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}

          <div className="h-[600px] overflow-y-auto px-6 py-6 bg-slate-50 space-y-5">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Send className="text-emerald-600" size={40} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-800">
                  No Messages Yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Start the conversation by sending your first message.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-center">
                  <span className="bg-gray-200 text-gray-600 text-xs px-4 py-2 rounded-full">
                    Today
                  </span>
                </div>

                {messages.map((msg, index) => {
                  const isMine =
                    msg.sender?._id === user?._id || msg.sender === user?._id;

                  const senderName = msg.sender?.name || "User";

                  return (
                    <div
                      key={msg._id || index}
                      className={`flex ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isMine && (
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold mr-3 mt-auto shadow">
                          {senderName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] md:max-w-md rounded-3xl px-5 py-4 shadow-md transition-all duration-300 ${
                          isMine
                            ? "bg-black text-white rounded-br-md"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        {!isMine && (
                          <p className="text-xs font-semibold text-indigo-600 mb-2">
                            {senderName}
                          </p>
                        )}

                        <p className="leading-7 break-words">{msg.message}</p>

                        <div
                          className={`mt-3 text-[11px] ${
                            isMine ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                            : "Now"}
                        </div>
                      </div>

                      {isMine && (
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold ml-3 mt-auto shadow">
                          {user?.name?.charAt(0).toUpperCase() || "Y"}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div ref={messagesEndRef}></div>
              </>
            )}
          </div>

          {/* Chat Input */}

          <div className="border-t bg-white px-6 py-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
              >
                <Smile size={22} className="text-gray-600" />
              </button>

              <button
                type="button"
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
              >
                <Paperclip size={22} className="text-gray-600" />
              </button>

              <input
                type="text"
                value={message}
                disabled={loading}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 h-14 rounded-full border border-gray-300 px-6 outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              />

              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="h-14 w-14 rounded-full bg-black hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
