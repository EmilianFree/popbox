import { useEffect, useState, useRef } from "react";
import './App.css';


function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
}

function Messages({ user, onBack }) {
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("popboxMessages");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [zoomImage, setZoomImage] = useState(null); // 🔍 Zoom image state
  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("popboxMessages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setZoomImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage = {
          user: user.trim(),
          text: text.trim(),
          image: reader.result,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const updated = [...messages, newMessage];
        setMessages(updated);
        setText("");
        setImageFile(null);
      };
      reader.readAsDataURL(imageFile);
    } else {
      const newMessage = {
        user: user.trim(),
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      const updated = [...messages, newMessage];
      setMessages(updated);
      setText("");
    }
  };

  return (
    <>
      {/* Lightbox Zoom */}
      {zoomImage && (
        <div
            style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
            }}
            onClick={() => setZoomImage(null)}
        >
            <img
            src={zoomImage}
            alt="Imagine mărită"
            style={{
                maxWidth: "95%",
                maxHeight: "95%",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}
            onClick={(e) => e.stopPropagation()}
            />
        </div>
        )}

  
      {/* Conținut principal */}
      <div className="min-h-screen flex flex-col bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">💬 Mesaje PopBox</h2>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            ⬅ Înapoi
          </button>
        </div>
  
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto space-y-2 mb-4 border border-gray-300 rounded-lg p-4 bg-white"
        >
          {messages.map((msg, index) => {
            const isCurrentUser =
              msg.user.trim().toLowerCase() === user.trim().toLowerCase();
            const color = stringToColor(msg.user);
            const initials = msg.user.charAt(0).toUpperCase();
  
            return (
              <div
                key={index}
                className={`relative flex items-start gap-2 max-w-md ${
                  isCurrentUser ? "ml-auto justify-end" : "mr-auto justify-start"
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: color }}
                  title={msg.user}
                >
                  {initials}
                </div>
  
                <div
                  className={`p-3 rounded-lg ${
                    isCurrentUser ? "bg-blue-100" : "bg-gray-200"
                  } relative`}
                >
                  {/* Ștergere */}
                  {isCurrentUser && (
                    <button
                      onClick={() => {
                        const confirmDelete = confirm("Ești sigur că vrei să ștergi acest mesaj?");
                        if (confirmDelete) {
                          const updated = messages.filter((_, i) => i !== index);
                          setMessages(updated);
                        }
                      }}
                      className="absolute top-1 right-1 text-red-600 text-xs hover:text-red-800"
                      title="Șterge mesaj"
                    >
                      🗑
                    </button>
                  )}
  
                  <div className="text-sm font-semibold" style={{ color }}>
                    {msg.user}
                  </div>
  
                  {msg.text && <div className="text-base">{msg.text}</div>}
  
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Imagine trimisă"
                      className="chat-image cursor-pointer"
                      onClick={() => setZoomImage(msg.image)}
                    />
                  )}
  
                  <div className="text-xs text-right text-gray-500">{msg.time}</div>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Preview imagine selectată */}
        {imageFile && (
          <div className="mb-2">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="chat-image"
            />
          </div>
        )}
  
        {/* Formul de trimitere */}
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <label className="text-xl px-2 cursor-pointer" title="Trimite imagine">
            📎
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="hidden"
            />
          </label>
  
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Scrie un mesaj..."
          />
  
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
          >
            Trimite
          </button>
        </form>
      </div>
    </>
  );
  
  }
  export default Messages;